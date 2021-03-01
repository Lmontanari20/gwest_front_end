export const login = (username, id) => {
  return {
    type: "LOGIN",
    payload: {
      username: username,
      id: id,
    },
  };
};

export const logout = (username) => {
  return {
    type: "LOGOUT",
    payload: username,
  };
};

export const addBattles = (battles) => {
  return {
    type: "ALLBATTLES",
    payload: battles,
  };
};

export const addCards = (cards) => {
  return {
    type: "ADDCARDS",
    payload: cards,
  };
};

export const aiDeck = (cards) => {
  return {
    type: "AIDECK",
    payload: cards,
  };
};

export const aiAvailable = (cards) => {
  return {
    type: "AIAVAILABLE",
    payload: cards,
  };
};

export const startGame = () => {
  return {
    type: "STARTGAME",
    payload: null,
  };
};

export const endGame = () => {
  return {
    type: "ENDGAME",
    payload: null,
  };
};

export const cardsAvailable = (cards) => {
  return {
    type: "CARDSAVAILABLE",
    payload: cards,
  };
};
