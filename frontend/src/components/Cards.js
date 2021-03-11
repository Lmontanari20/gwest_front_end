import React, { useEffect } from "react";
import "./../index.css";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addCards } from "./../redux/gwestActions.js";
import baba from "./../assets/cards/Baba_Looey_Card.png";
import gat from "./../assets/cards/Gattling_Gun_Card.png";
import man from "./../assets/cards/No_Name_Card.png";
import ringo from "./../assets/cards/Ringo_Kid_Card.png";
import pete from "./../assets/cards/Pistol_Pete_Card.png";
import bill from "./../assets/cards/Bufflo_Bill_Card.png";
import billy from "./../assets/cards/Billy_The_Kid_Card.png";
import butch from "./../assets/cards/Butch_Cassidy_Card.png";
import quick from "./../assets/cards/quick_Draw_McGraw.png";
import bonnie from "./../assets/cards/Bonnie_Clyde_Card.png";
import delores from "./../assets/cards/Dolores_Abernathy_Card.png";
import jane from "./../assets/cards/Calamity_Jane_Card.png";
import pony from "./../assets/cards/Pony_Card.png";
import stallion from "./../assets/cards/Stallion_Card.png";
import donkey from "./../assets/cards/Donkey_Card.png";
import bow from "./../assets/cards/Bow_Arrow_Card.png";
import rifle from "./../assets/cards/Rifle_Card.png";
import revolver from "./../assets/cards/Revolver_Card.png";
import dual from "./../assets/cards/Dual_Revolvers.png";
import speedy from "./../assets/cards/Speedy.png";
// import {} from "./../assets/cards";

const Cards = ({ username, userID, cards, deck, addCards, battles }) => {
  useEffect(() => {
    fetch(`http://localhost:3000/card/${userID}`, {
      headers: { "Authorization": `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((cardsResp) => addCards(cardsResp));
  }, []);

  const getPhoto = (name) => {
    switch (name) {
      case "Gattling Gun":
        return gat;
      case "Man With No Name":
        return man;
      case "Ringo Kid":
        return ringo;
      case "Pistol Pete":
        return pete;
      case "Buffalo Bill":
        return bill;
      case "Billy The Kid":
        return billy;
      case "Butch Cassidy":
        return butch;
      case "Quick Draw McGraw":
        return quick;
      case "Bonnie & Clyde":
        return bonnie;
      case "Dolores Abernathy":
        return delores;
      case "Calamity Jane":
        return jane;
      case "Pony":
        return pony;
      case "Stallion":
        return stallion;
      case "Donkey":
        return donkey;
      case "Bow & Arrow":
        return bow;
      case "Rifle":
        return rifle;
      case "Revolver":
        return revolver;
      case "Dual Revolvers":
        return dual;
      case "Baba Looey":
        return baba;
      case "Speedy Gonzales":
        return speedy;
      default:
        return;
    }
  };

  const mapCards = () => {
    if (!cards || cards.status === 404) {
      return;
    }
    return cards.map((uCard) => {
      let photo = getPhoto(uCard.card.name);
      return (
        <img
          className="card-images"
          onClick={() => handleClick(uCard.id, false)}
          src={photo}
        ></img>
        // <Card
        //   className="card-card"
        //   key={`${uCard.id}`}
        //   onClick={() => handleClick(uCard.id, false)}
        // >
        //   <Card.Body>
        //     <Card.Title>{uCard.card.name}</Card.Title>
        //     <Card.Subtitle>Class: {uCard.card.cardClass}</Card.Subtitle>
        //     <Card.Text>Attack: {uCard.card.attack}</Card.Text>
        //   </Card.Body>
        // </Card>
      );
    });
  };

  const mapDeck = () => {
    if (!deck || deck.status === 404) {
      return;
    }
    return deck.map((uCard) => {
      let photo = getPhoto(uCard.card.name);
      return (
        <img
          className="card-images"
          onClick={() => handleClick(uCard.id, true)}
          src={photo}
        ></img>
        // <Card
        //   className="card-card"
        //   key={`${uCard.id}`}
        //   onClick={() => handleClick(uCard.id, true)}
        // >
        //   <Card.Body>
        //     <Card.Title>{uCard.card.name}</Card.Title>
        //     <Card.Subtitle>Class: {uCard.card.cardClass}</Card.Subtitle>
        //     <Card.Text>Attack: {uCard.card.attack}</Card.Text>
        //   </Card.Body>
        // </Card>
      );
    });
  };

  const handleClick = (id, deckCard) => {
    debugger;
    if (deckCard && deck.length <= 12) {
      return alert("You need atleast 12 cards in your deck at all times.");
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
