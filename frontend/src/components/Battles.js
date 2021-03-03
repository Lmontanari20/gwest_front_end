import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
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
} from "./../redux/gwestActions.js";

const Battles = (props) => {
  useEffect(() => {
    if (props.userPass) {
      setTimeout(() => aiTurn(), 2000);
    }
  });

  const startGame = () => {
    if (props.inGame) {
      return;
    }
    getCardsAvailable();
    getAIDECK();

    props.changeUserTurn();
    props.startGame();
    // render ai board,
    // render user board and user cards available with onclick function
  };

  const aiTurn = (pass = false) => {
    if (props.aiCardsAvailable.length === 0) {
      props.setAIPass(true);
      checkRoundEnd();
      return;
    }
    if (props.userPass && props.userPoints < props.aiPoints) {
      // make ai pass
      props.setAIPass(true);
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
      props.changeUserTurn();
    }
    checkRoundEnd();
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
    props.changeUserTurn();
    setTimeout(() => aiTurn(), 2000);
  };

  const checkRoundEnd = () => {
    debugger;
    if (
      (props.userPass && props.aiPass) ||
      (props.aiCardsAvailable.length === 0 &&
        props.userCardsAvailable.length === 0) ||
      (props.userPass && props.aiCardsAvailable.length === 0) ||
      (props.aiPass && props.userCardsAvailable.length === 0)
    ) {
      setNextRound();
      checkWin();
    }
  };

  const checkWin = () => {
    // check to see if there is a game winner
    if (
      props.round1Win === props.round2Win ||
      props.round1Win === props.round3Win
    ) {
      // alert winner and go to records page
      console.log(props.round1Win);
    } else if (props.round2Win === props.round3Win) {
      // alert winner and go to records page
    } else {
      // alert draw and go to records page
    }
  };

  const setNextRound = () => {
    let winner = "";
    if (props.aiPoints > props.userPoints) {
      winner = "ai";
    } else if (props.aiPoints === props.userPoints) {
      winner = "draw";
    } else {
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
      checkWin();
    } else {
      // set round3 win to winner
      props.set3Win(winner);
      props.set3Score(`${props.userPoints}-${props.aiPoints}`);
      checkWin();
    }
    props.changeUserBoard({ melee: [], ranged: [], siege: [] });
    props.changeAIBoard({ melee: [], ranged: [], siege: [] });
    props.setAIPoints(0);
    props.setUserPoints(0);
    debugger;
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
        <Card
          style={{ width: "35%", margin: "auto", flex: "1" }}
          key={`${card.card.id}`}
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

  const mapAIGame = (area) => {
    return props.aiBoard[area].map((card) => {
      return (
        <Card
          style={{ width: "35%", margin: "auto", flex: "1" }}
          key={`${card.id}`}
        >
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
          style={{ width: "35%", margin: "auto", flex: "1" }}
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
    fetch("http://localhost:3000/card/ai/deck")
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
  };
  return (
    <Fragment>
      <div className="game-start" style={{ textAlign: "center" }}>
        <h2>Wild Wild Gwest Event</h2>
        <h5>Make sure you put cards in your deck!!</h5>
        <button onClick={startGame}>Play</button>
      </div>
      {props.inGame && (
        <div className="board" style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <div style={{ border: "3px solid black", width: "50%" }}>
              <p>Opponent name</p>
              <p>Opponent difficulty</p>
              <p>Cards left: {props.aiCardsAvailable.length}</p>
            </div>
            <div
              style={{
                border: "3px solid black",
                marginTop: "200px",
                marginBottom: "200px",
                width: "50%",
              }}
            >
              <p>weather cards</p>
            </div>
            <button onClick={userPass}>Pass</button>
            <div style={{ border: "3px solid black", width: "50%" }}>
              <h4>{props.username}</h4>
              <p>Cards left: {props.userCardsAvailable.length}</p>
            </div>
          </div>
          <div style={{ flex: "1" }}>
            <h3>Sherriff Game Board</h3>
            <div>
              Melee
              <div style={{ border: "5px solid black" }}>
                {mapAIGame("melee")}
              </div>
              Range
              <div style={{ border: "5px solid black" }}>
                {mapAIGame("ranged")}
              </div>
              Siege
              <div style={{ border: "5px solid black" }}>
                {mapAIGame("siege")}
              </div>
            </div>
            <div>
              <br></br>
              <h3>User Game Board</h3>
              <div>
                Melee
                <div style={{ border: "5px solid black" }}>
                  {mapUserGame("melee")}
                </div>
                Range
                <div style={{ border: "5px solid black" }}>
                  {mapUserGame("ranged")}
                </div>
                Siege
                <div style={{ border: "5px solid black" }}>
                  {mapUserGame("siege")}
                </div>
                <div style={{ border: "5px solid black", display: "flex" }}>
                  {mapCardsAvailable()}
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: "1" }}>
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
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.userID,
    deck: state.deck,
    userCardsAvailable: state.userCardsAvailable,
    battle: state.deck,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
