import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addCards } from "./../redux/gwestActions.js";

const Cards = ({ username, userID, cards, deck, addCards }) => {
  useEffect(() => {
    fetch(`http://localhost:3000/card/${userID}`)
      .then((res) => res.json())
      .then((cardsResp) => addCards(cardsResp));
  }, []);

  const mapCards = () => {
    if (!cards || cards.status === 404) {
      return;
    }
    return cards.map((uCard) => {
      return (
        <Card
          style={{ width: "75%", margin: "auto" }}
          key={`${uCard.card.id}`}
          onClick={() => handleClick(uCard.card.id)}
        >
          <Card.Body>
            <Card.Title>{uCard.card.name}</Card.Title>
            <Card.Subtitle>Class: {uCard.card.cardClass}</Card.Subtitle>
            <Card.Text>Attack: {uCard.card.attack}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const mapDeck = () => {
    if (!deck || deck.status === 404) {
      return;
    }
    return deck.map((uCard) => {
      return (
        <Card
          style={{ width: "75%", margin: "auto" }}
          key={`${uCard.card.id}`}
          onClick={() => handleClick(uCard.card.id)}
        >
          <Card.Body>
            <Card.Title>{uCard.card.name}</Card.Title>
            <Card.Subtitle>Class: {uCard.card.cardClass}</Card.Subtitle>
            <Card.Text>Attack: {uCard.card.attack}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const handleClick = (id) => {
    fetch(`http://localhost:3000/card/${userID}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
    })
      .then((res) => res.json())
      .then((cards) => addCards(cards));
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="your-cards" style={{ flex: "1", textAlign: "center" }}>
        <h2>All Cards</h2>
        {mapCards()}
      </div>
      <div className="card-profile" style={{ flex: "1", textAlign: "center" }}>
        <h4>Username: {username}</h4>
      </div>
      <div className="your-deck" style={{ flex: "1", textAlign: "center" }}>
        <h2>Cards in Deck</h2>
        {mapDeck()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.userID,
    cards: state.cards,
    deck: state.deck,
    battles: state.battles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCards: (cards) => dispatch(addCards(cards)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
