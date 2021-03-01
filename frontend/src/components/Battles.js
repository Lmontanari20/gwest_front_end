import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  addBattles,
  aiDeck,
  aiAvailable,
  startGame,
  endGame,
  cardsAvailable,
} from "./../redux/gwestActions.js";

const Battles = (props) => {
  const startGame = () => {
    getAIDECK();
    if (props.inGame) {
      props.endGame();
      return;
    }
    props.startGame();
    getCardsAvailable();
    // render ai board,
    // render user board and user cards available with onclick function
  };

  const gameTurn = (card) => {
    // if(both ai and player have not passed and both have cards available length greater than 0)
    //    card attack is added to the current players turns total
    //    card is removed from card available and put on board
    //    set userTurn to be the opposite of what it is
    // else
    //    signify the winner and set state
    //    if round 1 update round state, round1win,  reset board, ai/userpass,
    //    if round 2 update round2win, check both winners see if theres a winner, if not reset board, ai/userpass
    //    if round 3 get winner, create battle fetch, redirect
  };

  const checkWin = () => {
    // check to see if there is a game winner
    props.endGame();
  };

  const setNextRound = () => {
    // update round state,
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

  const getAIDECK = () => {
    debugger;
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

  return (
    <Fragment>
      <div className="game-start" style={{ textAlign: "center" }}>
        <h2>Wild Wild Gwest Event</h2>
        <h5>Make sure you put cards in your deck!!</h5>
        <button onClick={startGame}>Play</button>
      </div>
      <div className="board" style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>user/ai stuff</div>
        <div style={{ flex: "1" }}>
          <div>ai gameboard</div>
          <div>user gameboard</div>
        </div>
        <div style={{ flex: "1" }}> discard/deck piles</div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.userID,
    deck: state.deck,
    cardsAvailable: state.cardsAvailable,
    battle: state.deck,
    aiDeck: state.aiDeck,
    aiCardsAvailable: state.aiCardsAvailable,
    inGame: state.inGame,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
