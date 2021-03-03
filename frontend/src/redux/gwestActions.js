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

export const changeUserTurn = () => {
  return {
    type: "USERTURN",
    payload: null,
  };
};

export const changeAIBoard = (board) => {
  return {
    type: "CHANGEAIBOARD",
    payload: board,
  };
};

export const changeUserBoard = (board) => {
  return {
    type: "CHANGEUSERBOARD",
    payload: board,
  };
};

export const setAIPoints = (points) => {
  return {
    type: "AIPOINTS",
    payload: points,
  };
};

export const setUserPoints = (points) => {
  return {
    type: "USERPOINTS",
    payload: points,
  };
};

export const setAIPass = (pass) => {
  return {
    type: "AIPASS",
    payload: pass,
  };
};

export const setUserPass = (pass) => {
  return {
    type: "USERPASS",
    payload: pass,
  };
};

export const set1Win = (winner) => {
  return {
    type: "ROUND1WINNER",
    payload: winner,
  };
};

export const set2Win = (winner) => {
  return {
    type: "ROUND2WINNER",
    payload: winner,
  };
};

export const set3Win = (winner) => {
  return {
    type: "ROUND3WINNER",
    payload: winner,
  };
};

export const set1Score = (score) => {
  return {
    type: "ROUND1SCORE",
    payload: score,
  };
};

export const set2Score = (score) => {
  return {
    type: "ROUND2SCORE",
    payload: score,
  };
};

export const set3Score = (score) => {
  return {
    type: "ROUND3SCORE",
    payload: score,
  };
};

export const addBattle = (battle) => {
  return {
    type: "ADDBATTLE",
    payload: battle,
  };
};

export const nextRound = (round) => {
  return {
    type: "NEXTROUND",
    payload: round,
  };
};
