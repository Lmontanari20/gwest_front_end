import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "./../index.css";
import { addBattles } from "./../redux/gwestActions.js";
import { Card } from "react-bootstrap";

const Record = (props) => {
  useEffect(() => {
    fetch(`http://localhost:3000/battle/${props.userID}`, {
      headers: { "Authorization": `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((battles) => {
        props.addBattles(battles.reverse());
      });
  }, []);

  const mapBattlesToCards = () => {
    let battles = props.battles;
    debugger;
    if (battles.length == 0) {
      return;
    }
    battles = props.battles;
    return battles.map((battle) => {
      return (
        // <div className="cardDiv">
        <Card className="recordCard" key={`${battle.id}`}>
          <Card.Body className="recordCard2">
            <Card.Title>Sheriff: {battle.ai_name}</Card.Title>
            <Card.Subtitle>
              Outcome: {battle.win ? "YOU WON!!" : "YOU LOST..."}
            </Card.Subtitle>
            <Card.Text>
              Round 1 Score: {battle.round1} | Round 2 Score: {battle.round2}
              {" | "}
              {battle.round3 && `Round 3 Score: ${battle.round3}`}
            </Card.Text>
          </Card.Body>
        </Card>
        // </div>
      );
    });
  };

  return (
    <Fragment>
      <h2 className="recordH2">Record</h2>
      <br></br>
      {props.battles.length != 0 ? (
        <div className="recordDiv">{mapBattlesToCards()}</div>
      ) : (
        <h4>You do not have a record yet! Set your deck and go play!</h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.userID,
    battles: state.battles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBattles: (battles) => dispatch(addBattles(battles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
