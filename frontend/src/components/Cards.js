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
    return cards.map((card) => {
      return (
        <Card key={`${card.id}`} onClick={() => handleClick(card.id)}>
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Subtitle>Class: {card.cardClass}</Card.Subtitle>
            <Card.Text>Attack: {card.attack}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const mapDeck = () => {
    if (!deck || deck.status === 404) {
      return;
    }
    return deck.map((card) => {
      return (
        <Card key={`${card.id}`} onClick={() => handleClick(card.id)}>
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Subtitle>Class: {card.cardClass}</Card.Subtitle>
            <Card.Text>Attack: {card.attack}</Card.Text>
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
      <div className="your-cards" style={{ color: "black", flex: "1" }}>
        {mapCards()}
      </div>
      <div className="card-profile" style={{ color: "red", flex: "1" }}>
        b
      </div>
      <div className="your-deck" style={{ color: "green", flex: "1" }}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCards: (cards) => dispatch(addCards(cards)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
