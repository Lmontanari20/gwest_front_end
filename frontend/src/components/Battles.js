import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addBattles } from "./../redux/gwestActions.js";

const Battles = (props) => {
  const startGame = () => {
    // set ai deck/cards available
    // set ingame to true if false, else do nothing (return)
    // render ai board,
    // render user board and user cards available with onclick function
  };

  const gameTurn = (card) => {
    // if(both ai and player have not passed and both have cards available length greater than 0)
    // card attack is added to the current players turns total
    // card is removed from card available and put on board
    // set userTurn to be the opposite of what it is
    // else
    // signify the winner and set state
    // if round 1 update round state, round1win,  reset board, ai/userpass,
    // if round 2 update round2win, check both winners see if theres a winner, if not reset board, ai/userpass
    // if round 3 get winner, create battle fetch, redirect
  };

  const checkWin = () => {};

  const setNextRound = () => {
    // update round state,
  };
  return (
    <Fragment>
      <div className="game-start" style={{ textAlign: "center" }}>
        <h2>Wild Wild Gwest Event</h2>
        <h5>Make sure you put cards in your deck!!</h5>
        <button onClick={startGame}>Play</button>
      </div>
      <div classaName="board" style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>user/ai stuff</div>
        <div style={{ flex: "1" }}> actual game board</div>
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
    battle: state.deck,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBattles: (battles) => dispatch(addBattles(battles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
