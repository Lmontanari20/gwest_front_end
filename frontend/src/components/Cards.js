import React, { useEffect } from "react";
import "./../index.css";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addCards } from "./../redux/gwestActions.js";

const Cards = ({ username, userID, cards, deck, addCards, battles }) => {
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
          key={`${uCard.id}`}
          onClick={() => handleClick(uCard.id, false)}
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
          key={`${uCard.id}`}
          onClick={() => handleClick(uCard.id, true)}
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
      .then((cards) => {
        addCards(cards);
      });
  };

  const getLevel = () => {
    let wins = battles.filter((battle) => battle.win);
    return parseInt(wins.length / 3);
  };

  const getRank = () => {
    let rank = "Munshkin";
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
    <div style={{ display: "flex" }}>
      <div className="your-cards">
        <div className="your-card-header">
          <h2>All Cards ({cards.length})</h2>
        </div>
        {mapCards()}
      </div>
      <div className="card-profile">
        <div className="card-profile-header">
          <h4>Username: {username}</h4>
          <h5>Level: {getLevel()}</h5>
          <h5>Rank: {getRank()}</h5>
        </div>
      </div>
      <div className="your-deck">
        <div className="your-deck-header">
          <h2>Cards in Deck ({deck.length})</h2>
        </div>
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
