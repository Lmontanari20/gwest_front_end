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
        props.addBattles(battles);
      });
  }, []);

  const mapBattlesToCards = () => {
    let battles = props.battles;
    debugger;
    if (!battles) {
      return;
    }
    return battles.map((battle) => {
      return (
        <Card className="recordCard" key={`${battle.id}`}>
          <Card.Body className="recordCard">
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
      );
    });
  };

  return (
    <Fragment>
      <h2>Record</h2>
      <br></br>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {mapBattlesToCards()}
      </div>
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
