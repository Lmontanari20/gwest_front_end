const initialState = {
  username: null,
  userID: null,
  battles: null,
  battle: null,
  cards: null,
  deck: null,
};

export const gwestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        userID: action.payload.id,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        username: null,
        userID: null,
      };
    case "ALLBATTLES":
      return {
        ...state,
        battles: action.payload,
      };
    case "ADDCARDS":
      let deckCards = action.payload.filter((card) => card.indeck);
      let cards = action.payload.filter((card) => !card.indeck);
      return {
        ...state,
        cards: cards,
        deck: deckCards,
      };
    default:
      return state;
  }
};
