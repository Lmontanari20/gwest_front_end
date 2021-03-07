import React, { useEffect } from "react";
import "./../index.css";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addCards } from "./../redux/gwestActions.js";

const Cards = ({ username, userID, cards, deck, addCards }) => {
  useEffect(() => {
    fetch(`http://localhost:3000/card/${userID}`, {
      headers: { "Authorization": `Bearer ${localStorage.token}` },
    })
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
          className="card-card"
          key={`${uCard.card.id}`}
          onClick={() => handleClick(uCard.card.id, false)}
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
          className="card-card"
          key={`${uCard.card.id}`}
          onClick={() => handleClick(uCard.card.id, true)}
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

  const handleClick = (id, deckCard) => {
    debugger;
    if (deckCard && deck.length <= 10) {
      return alert("You need atleast 10 cards in your deck at all times.");
    }
    fetch(`http://localhost:3000/card/${userID}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((cards) => addCards(cards));
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="your-cards">
        <h2>All Cards ({cards.length})</h2>
        {mapCards()}
      </div>
      <div className="card-profile">
        <h4>Username: {username}</h4>
      </div>
      <div className="your-deck">
        <h2>Cards in Deck ({deck.length})</h2>
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
