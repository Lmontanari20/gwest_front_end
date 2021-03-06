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
        if (battles !== 0) {
          props.addBattles(battles.reverse());
        }
      });
  }, []);

  const mapBattlesToCards = () => {
    let battles = props.battles;
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

  const getWins = () => {
    if (!props.battles) {
      return 0;
    }
    let wins = props.battles.filter((battle) => battle.win);
    return wins.length;
  };

  const getLosses = () => {
    if (!props.battles) {
      return 0;
    }
    let losses = props.battles.filter((battle) => !battle.win);
    return losses.length;
  };

  const getLevel = () => {
    let wins = props.battles.filter((battle) => battle.win);
    return parseInt(wins.length / 3);
  };

  const getRank = () => {
    let rank = "";
    if (getLevel() <= 2) {
      rank = "Pea Shooter";
    } else if (getLevel() <= 4) {
      rank = "Outlaw";
    } else if (getLevel() <= 6) {
      rank = "Bank Robber";
    } else if (getLevel() <= 8) {
      rank = "Sherriff Terrorizer";
    } else {
      rank = "Gwest's Most Wanted";
    }
    return rank;
  };

  return (
    <Fragment>
      <div className="record-label">
        <h2 className="recordH2">{props.username}</h2>
        <h5>
          Level: {getLevel()} <br />
          Rank: {getRank()}
        </h5>
        <h5>
          Wins: {getWins()} <br />
          Losses: {getLosses()}
        </h5>
        {props.battles.length == 0 && (
          <h5>You do not have a record yet! Set your deck and go play!</h5>
        )}
      </div>
      <br></br>
      {props.battles.length != 0 && (
        <div className="recordDiv">{mapBattlesToCards()}</div>
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
