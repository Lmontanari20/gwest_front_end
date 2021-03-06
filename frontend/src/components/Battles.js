import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "./../index.css";
import {
  addBattles,
  aiDeck,
  aiAvailable,
  startGame,
  endGame,
  cardsAvailable,
  changeUserTurn,
  setAIPoints,
  setUserPoints,
  changeAIBoard,
  changeUserBoard,
  setUserPass,
  setAIPass,
  set1Score,
  set2Score,
  set3Score,
  set1Win,
  set2Win,
  set3Win,
  addBattle,
  setAddCard,
} from "./../redux/gwestActions.js";
import baba from "./../assets/cards/Baba_Looey_Card.png";
import gat from "./../assets/cards/Gattling_Gun_Card.png";
import man from "./../assets/cards/No_Name_Card.png";
import ringo from "./../assets/cards/Ringo_Kid_Card.png";
import pete from "./../assets/cards/Pistol_Pete_Card.png";
import bill from "./../assets/cards/Bufflo_Bill_Card.png";
import billy from "./../assets/cards/Billy_The_Kid_Card.png";
import butch from "./../assets/cards/Butch_Cassidy_Card.png";
import quick from "./../assets/cards/quick_Draw_McGraw.png";
import bonnie from "./../assets/cards/Bonnie_Clyde_Card.png";
import delores from "./../assets/cards/Dolores_Abernathy_Card.png";
import jane from "./../assets/cards/Calamity_Jane_Card.png";
import pony from "./../assets/cards/Pony_Card.png";
import stallion from "./../assets/cards/Stallion_Card.png";
import donkey from "./../assets/cards/Donkey_Card.png";
import bow from "./../assets/cards/Bow_Arrow_Card.png";
import rifle from "./../assets/cards/Rifle_Card.png";
import revolver from "./../assets/cards/Revolver_Card.png";
import dual from "./../assets/cards/Dual_Revolvers.png";
import speedy from "./../assets/cards/Speedy.png";

const Battles = (props) => {
  useEffect(() => {
    if (props.userPass && !props.aiPass) {
      aiTurn();
    }
    if (props.userPass && props.aiPass) {
      checkRoundEnd();
    }
    if (
      props.round2Score != null ||
      (props.round3Score != null && props.inGame && props.round1Score !== null)
    ) {
      checkWin();
    }
  });

  const getPhoto = (name) => {
    switch (name) {
      case "Gattling Gun":
        return gat;
      case "Man With No Name":
        return man;
      case "Ringo Kid":
        return ringo;
      case "Pistol Pete":
        return pete;
      case "Buffalo Bill":
        return bill;
      case "Billy The Kid":
        return billy;
      case "Butch Cassidy":
        return butch;
      case "Quick Draw McGraw":
        return quick;
      case "Bonnie & Clyde":
        return bonnie;
      case "Dolores Abernathy":
        return delores;
      case "Calamity Jane":
        return jane;
      case "Pony":
        return pony;
      case "Stallion":
        return stallion;
      case "Donkey":
        return donkey;
      case "Bow & Arrow":
        return bow;
      case "Rifle":
        return rifle;
      case "Revolver":
        return revolver;
      case "Dual Revolvers":
        return dual;
      case "Baba Looey":
        return baba;
      case "Speedy Gonzales":
        return speedy;
      default:
        return;
    }
  };

  // called when clicked play, sets up game and fetches a new battle
  const startGame = () => {
    if (props.inGame) {
      return;
    }
    if (props.deck.length < 10) {
      return alert("Set your deck before you start a game!!");
    }
    getCardsAvailable();
    getAIDECK();
    props.setAddCard(true);

    props.startGame();
    fetch(`http://localhost:3000/battle/new/${props.userID}`, {
      headers: { "Authorization": `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((battle) => {
        props.addBattle(battle);
      });
  };

  // function that makes the ai have a turn
  const aiTurn = () => {
    checkRoundEnd();
    if (props.aiPass) {
      checkRoundEnd();
      return;
    }
    if (props.aiCardsAvailable.length === 0) {
      props.setAIPass(true);
      checkRoundEnd();
      return;
    }
    if (props.userPass && props.userPoints < props.aiPoints) {
      // make ai pass
      props.setAIPass(true);
      checkRoundEnd();
    } else if (props.aiPoints - props.userPoints > 5) {
      props.setAIPass(true);
      checkRoundEnd();
    } else if (
      props.aiCardsAvailable.length === 1 &&
      props.round1Win === "ai" &&
      props.round2Win === null
    ) {
      props.setAIPass(true);
      checkRoundEnd();
    } else {
      // grab random card and display on board, delete from available
      let card =
        props.aiCardsAvailable[
          Math.floor(Math.random() * props.aiCardsAvailable.length)
        ];
      // add card to game board
      let newBoard = props.aiBoard;
      let index = card.cardClass;
      newBoard[index].push(card);
      props.changeAIBoard(newBoard);
      // change cards available
      let newAvailable = props.aiCardsAvailable.filter(
        (uCard) => uCard.id !== card.id
      );
      props.aiAvailable(newAvailable);
      // set points and change turn to users turn
      props.setAIPoints(props.aiPoints + card.attack);
    }
  };

  // called when ever the user selects a card to play
  const startTurn = (e, card) => {
    debugger;
    if (!props.userTurn) {
      return;
    }
    // add card to game board
    let newBoard = props.userBoard;
    let index = card.card.cardClass;
    newBoard[index].push(card);
    props.changeUserBoard(newBoard);
    // remove card from available
    let newAvailable = props.userCardsAvailable.filter(
      (uCard) => uCard.id !== card.id
    );
    props.cardsAvailable(newAvailable);
    //set user points
    props.setUserPoints(props.userPoints + card.card.attack);
    aiTurn();
  };

  // checks to see if the round has ended
  const checkRoundEnd = () => {
    if (
      (props.userPass && props.aiPass) ||
      (props.aiCardsAvailable.length === 0 &&
        props.userCardsAvailable.length === 0) ||
      (props.userPass && props.aiCardsAvailable.length === 0) ||
      (props.aiPass && props.userCardsAvailable.length === 0)
    ) {
      setNextRound();
    }
  };

  // checks to see if there is a winner in the game
  const checkWin = () => {
    // check to see if there is a game winner
    let win;
    if (
      (props.round1Win === props.round2Win ||
        props.round1Win === props.round3Win) &&
      props.round1Win !== null &&
      props.round2Win !== null
    ) {
      // alert winner and go to records page post battle
      props.round1Win === props.username ? (win = true) : (win = false);
      props.endGame();
      postBattle(win);
      if (props.addCard) {
        addNewCard();
        props.setAddCard(false);
      }
    } else if (
      props.round2Win === props.round3Win &&
      props.round2Win !== null
    ) {
      // alert winner and go to records page post battle
      props.round2Win === props.username ? (win = true) : (win = false);
      postBattle(win);
      if (props.addCard) {
        addNewCard();
        props.setAddCard(false);
      }
    }
  };

  // post fetch to add a new card to the users deck
  const addNewCard = () => {
    fetch(`http://localhost:3000/card/${props.userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
      },
    });
  };

  // patch fetch to update the battle with all of the attributes when the game is over
  const postBattle = (win) => {
    if (props.round1Score === null) {
      props.history.push("/record");
      return;
    }
    fetch(`http://localhost:3000/battle/${props.battle.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        id: props.battle.id,
        win: win,
        round1: props.round1Score,
        round2: props.round2Score,
        round3: props.round3Score,
      }),
    }).then(() => {
      resetGame();
      props.history.push("/record");
    });
  };

  // resets all the game states after the game is finished
  const resetGame = () => {
    props.setAIPoints(0);
    props.endGame();
    props.setUserPoints(0);
    props.changeAIBoard({ "melee": [], "ranged": [], "siege": [] });
    props.changeUserBoard({ "melee": [], "ranged": [], "siege": [] });
    props.setUserPass(false);
    props.setAIPass(false);
    props.set1Score(null);
    props.set2Score(null);
    props.set3Score(null);
    props.set1Win(null);
    props.set2Win(null);
    props.set3Win(null);
  };

  // sets the next round when a round is finished
  const setNextRound = () => {
    let winner = "";
    if (props.aiPoints >= props.userPoints) {
      winner = "ai";
    } else if (props.aiPoints < props.userPoints) {
      winner = props.username;
    }
    if (!props.round1Win) {
      //set round1Win to winner
      props.set1Win(winner);
      props.set1Score(`${props.userPoints}-${props.aiPoints}`);
    } else if (!props.round2Win) {
      // set round2Win to winner
      props.set2Win(winner);
      props.set2Score(`${props.userPoints}-${props.aiPoints}`);
    } else {
      // set round3 win to winner
      props.set3Win(winner);
      props.set3Score(`${props.userPoints}-${props.aiPoints}`);
    }
    props.changeUserBoard({ melee: [], ranged: [], siege: [] });
    props.changeAIBoard({ melee: [], ranged: [], siege: [] });
    props.setAIPoints(0);
    props.setUserPoints(0);
    props.setUserPass(false);
    props.setAIPass(false);
  };

  // gets the cards available for the user
  const getCardsAvailable = () => {
    let available = [];
    while (available.length < 10) {
      let card = props.deck[Math.floor(Math.random() * props.deck.length)];
      if (!available.includes(card)) {
        available.push(card);
      }
    }
    props.cardsAvailable(available);
  };

  // maps the cards for the user board when it is played
  const mapUserGame = (area) => {
    return props.userBoard[area].map((card) => {
      let photo = getPhoto(card.card.name);
      return <img className="card-images" src={photo} key={`$card.id`}></img>;
    });
  };

  // maps through the ai cards played and displays them on the ai board
  const mapAIGame = (area) => {
    return props.aiBoard[area].map((card) => {
      let photo = getPhoto(card.name);
      return <img className="card-images" src={photo} key={`$card.id`}></img>;
    });
  };

  // maps the cards that are available for the user to play with
  const mapCardsAvailable = () => {
    return props.userCardsAvailable.map((card) => {
      let photo = getPhoto(card.card.name);
      return (
        <img
          className="card-images"
          onClick={(e) => startTurn(e, card)}
          src={photo}
          key={`$card.id`}
        ></img>
      );
    });
  };

  // gets the ai deck that it can play with
  const getAIDECK = () => {
    fetch("http://localhost:3000/card/ai/deck", {
      headers: { "Authorization": `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((cards) => {
        props.aiDeck(cards);
        getAICARDS(cards);
      });
  };

  // sets the ai cards that are available to use
  const getAICARDS = (cards) => {
    // random cards array length 10
    let available = [];
    while (available.length < 10) {
      let card = cards[Math.floor(Math.random() * cards.length)];
      if (!available.includes(card)) {
        available.push(card);
      }
    }
    props.aiAvailable(available);
  };

  // when a user clicks the pass button this is called to set the userPass
  const userPass = () => {
    props.setUserPass(true);
    checkWin();
  };
  return (
    <div>
      {!props.inGame && (
        <div className="game-start">
          <h2>Wild Wild Gwest Event</h2>
          <h5>Make sure you put cards in your deck!!</h5>
          <button onClick={startGame}>Play</button>
        </div>
      )}
      {props.inGame && (
        <div className="board">
          <div className="left-board">
            <div className="ai-stat-board">
              <h4>
                Sherriff: {props.battle.ai_name ? props.battle.ai_name : ""}
              </h4>
              <p>Points: {props.aiPoints}</p>
              <p>Cards left: {props.aiCardsAvailable.length}</p>
              <p>
                Wins:{" "}
                {props.round1Win === "ai" || props.round2Win === "ai" ? 1 : 0}
              </p>
            </div>
            {/* <div>
              <p>weather cards</p>
            </div> */}
            <button className="pass-button" onClick={userPass}>
              Pass
            </button>
            <div className="user-stat-board" style={{ display: "fixed" }}>
              <h4>{props.username}</h4>
              <p>Points: {props.userPoints}</p>
              <p>Cards left: {props.userCardsAvailable.length}</p>
              <p>
                <br />
                Wins:{" "}
                {props.round1Win === props.username ||
                props.round2Win === props.username
                  ? 1
                  : 0}
              </p>
            </div>
          </div>
          <div className="game-board">
            <div>
              <h3>
                Sherriff, {props.battle.ai_name ? props.battle.ai_name : ""}{" "}
                Game Board : {props.aiPoints}
              </h3>
              <div>
                Melee
                <div className="ai-melee" star>
                  {mapAIGame("melee")}
                </div>
                Range
                <div className="ai-range">{mapAIGame("ranged")}</div>
                Siege
                <div className="ai-siege">{mapAIGame("siege")}</div>
              </div>
            </div>
            <div>
              <br></br>
              <h3>
                {props.username} Game Board : {props.userPoints}
              </h3>
              <div>
                Melee
                <div className="user-melee">{mapUserGame("melee")}</div>
                Range
                <div className="user-range">{mapUserGame("ranged")}</div>
                Siege
                <div className="user-siege">{mapUserGame("siege")}</div>
                Cards Available
                <div
                  style={{
                    border: "3px solid rgba(70,42,1,1)",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {mapCardsAvailable()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.userID,
    deck: state.deck,
    userCardsAvailable: state.userCardsAvailable,
    battle: state.battle,
    aiDeck: state.aiDeck,
    aiCardsAvailable: state.aiCardsAvailable,
    inGame: state.inGame,
    userTurn: state.userTurn,
    aiBoard: state.aiBoard,
    userBoard: state.userBoard,
    aiPoints: state.aiPoints,
    userPoints: state.userPoints,
    aiPass: state.aiPass,
    userPass: state.userPass,
    round1Win: state.round1Win,
    round2Win: state.round2Win,
    round3Win: state.round3Win,
    round1Score: state.round1Score,
    round2Score: state.round2Score,
    round3Score: state.round3Score,
    addCard: state.addCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBattles: (battles) => dispatch(addBattles(battles)),
    aiDeck: (cards) => dispatch(aiDeck(cards)),
    aiAvailable: (cards) => dispatch(aiAvailable(cards)),
    startGame: () => dispatch(startGame()),
    endGame: () => dispatch(endGame()),
    cardsAvailable: (cards) => dispatch(cardsAvailable(cards)),
    changeUserTurn: () => dispatch(changeUserTurn()),
    changeAIBoard: (board) => dispatch(changeAIBoard(board)),
    changeUserBoard: (board) => dispatch(changeUserBoard(board)),
    setAIPoints: (points) => dispatch(setAIPoints(points)),
    setUserPoints: (points) => dispatch(setUserPoints(points)),
    setUserPass: (pass) => dispatch(setUserPass(pass)),
    setAIPass: (pass) => dispatch(setAIPass(pass)),
    set1Win: (winner) => dispatch(set1Win(winner)),
    set2Win: (winner) => dispatch(set2Win(winner)),
    set3Win: (winner) => dispatch(set3Win(winner)),
    set1Score: (score) => dispatch(set1Score(score)),
    set2Score: (score) => dispatch(set2Score(score)),
    set3Score: (score) => dispatch(set3Score(score)),
    addBattle: (battle) => dispatch(addBattle(battle)),
    setAddCard: (add) => dispatch(setAddCard(add)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
