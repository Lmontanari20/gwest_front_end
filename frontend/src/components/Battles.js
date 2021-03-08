import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "./../index.css";
import { Card } from "react-bootstrap";
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

const Battles = (props) => {
  useEffect(() => {
    if (props.userPass && !props.aiPass) {
      aiTurn();
      // setTimeout(() => aiTurn(), 2000);
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
    // render ai board,
    // render user board and user cards available with onclick function
  };

  const aiTurn = () => {
    checkRoundEnd();
    if (props.aiCardsAvailable.length === 0) {
      props.setAIPass(true);
      checkRoundEnd();
      return;
    }
    if (props.userPass && props.userPoints < props.aiPoints) {
      // make ai pass
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
      // if (props.userPass) {
      //   aiTurn();
      // }
    }
  };

  const startTurn = (e, card) => {
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
      (uCard) => uCard.card.id !== card.card.id
    );
    props.cardsAvailable(newAvailable);
    //set user points
    props.setUserPoints(props.userPoints + card.card.attack);
    // setTimeout(() => aiTurn(), 2000);
    aiTurn();
  };

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
    } else if (
      props.round2Win === props.round3Win &&
      props.round2Win !== null
    ) {
      // alert winner and go to records page post battle
      props.round2Win === props.username ? (win = true) : (win = false);
      postBattle(win);
    }
    if (props.addCard) {
      addNewCard();
      props.setAddCard(false);
    }
  };

  const addNewCard = () => {
    fetch(`http://localhost:3000/card/${props.userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
      },
    });
  };

  const postBattle = (win) => {
    debugger;
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

  const mapUserGame = (area) => {
    return props.userBoard[area].map((card) => {
      return (
        <Card className="battle-card" key={`${card.card.id}`}>
          <Card.Body>
            <Card.Text>
              {card.card.name} Class: {card.card.cardClass} Attack:{" "}
              {card.card.attack}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const mapAIGame = (area) => {
    return props.aiBoard[area].map((card) => {
      return (
        <Card className="battle-card" key={`${card.id}`}>
          <Card.Body>
            <Card.Text>
              {card.name} Class: {card.cardClass} Attack: {card.attack}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const mapCardsAvailable = () => {
    return props.userCardsAvailable.map((card) => {
      return (
        <Card
          className="battle-card"
          key={`${card.card.id}`}
          onClick={(e) => startTurn(e, card)}
        >
          <Card.Body>
            <Card.Text>
              {card.card.name} Class: {card.card.cardClass} Attack:{" "}
              {card.card.attack}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

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

  const userPass = () => {
    props.setUserPass(true);
    checkWin();
  };
  return (
    <div>
      <div className="game-start">
        <h2>Wild Wild Gwest Event</h2>
        <h5>Make sure you put cards in your deck!!</h5>
        <button onClick={startGame}>Play</button>
      </div>
      {props.inGame && (
        <div className="board">
          <div className="left-board">
            <div className="ai-stat-board">
              <p>
                Sherriff: {props.battle.ai_name ? props.battle.ai_name : ""}
              </p>
              <p>
                Wins:{" "}
                {props.round1Win === "ai" || props.round2Win === "ai" ? 1 : 0}
              </p>
              <p>Cards left: {props.aiCardsAvailable.length}</p>
            </div>
            {/* <div>
              <p>weather cards</p>
            </div> */}
            <button className="pass-button" onClick={userPass}>
              Pass
            </button>
            <div className="user-stat-board">
              <h4>{props.username}</h4>
              <p>
                Wins:{" "}
                {props.round1Win === props.username ||
                props.round2Win === props.username
                  ? 1
                  : 0}
              </p>
              <p>Cards left: {props.userCardsAvailable.length}</p>
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
                <div className="ai-melee" style={{ display: "flex" }}>
                  {mapAIGame("melee")}
                </div>
                Range
                <div className="ai-range" style={{ display: "flex" }}>
                  {mapAIGame("ranged")}
                </div>
                Siege
                <div className="ai-siege" style={{ display: "flex" }}>
                  {mapAIGame("siege")}
                </div>
              </div>
            </div>
            <div>
              <br></br>
              <h3>
                {props.username} Game Board : {props.userPoints}
              </h3>
              <div>
                Melee
                <div className="user-melee" style={{ display: "flex" }}>
                  {mapUserGame("melee")}
                </div>
                Range
                <div className="user-range" style={{ display: "flex" }}>
                  {mapUserGame("ranged")}
                </div>
                Siege
                <div className="user-siege" style={{ display: "flex" }}>
                  {mapUserGame("siege")}
                </div>
                Cards Available
                <div style={{ border: "5px solid black", display: "flex" }}>
                  {mapCardsAvailable()}
                </div>
              </div>
            </div>
          </div>

          {/* <div style={{ flex: "1" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: "1",
                  border: "3px solid black",
                  width: "100px",
                  marginLeft: "200px",
                }}
              >
                discard
              </div>
              <div
                style={{
                  flex: "1",
                  border: "3px solid black",
                  width: "100px",
                  marginRight: "200px",
                }}
              >
                deck
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "500px" }}>
              <div
                style={{
                  flex: "1",
                  border: "3px solid black",
                  width: "100px",
                  marginLeft: "200px",
                }}
              >
                discard
              </div>
              <div
                style={{
                  flex: "1",
                  border: "3px solid black",
                  width: "100px",
                  marginRight: "200px",
                }}
              >
                deck
              </div>
            </div>
          </div> */}
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
