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
