const initialState = {
  username: null,
  userID: null,
  battles: null,
  battle: null,
  cards: null,
  deck: null,
  cardsAvailable: null,
  aiDeck: null,
  aiCardsAvailable: null,
  inGame: false,
  roundCount: 0,
  round1Win: null,
  round2Win: null,
  round3Win: null,
  userTurn: false,
  aiBoard: {
    melee: null,
    range: null,
    siege: null,
  },
  userBoard: {
    melee: null,
    range: null,
    siege: null,
  },
  aiPass: false,
  userPass: false,
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
      debugger;
      let deckCards = action.payload.filter((uCard) => uCard.indeck);
      let cards = action.payload.filter((uCard) => !uCard.indeck);
      return {
        ...state,
        cards: cards,
        deck: deckCards,
      };
    case "STARTGAME":
      return {
        ...state,
        inGame: true,
      };
    case "ENDGAME":
      return {
        ...state,
        inGame: false,
      };
    case "NEXTROUND":
      return {
        ...state,
        roundCount: state.roundCount++,
      };
    case "ROUND1WINNER":
      return {
        ...state,
        round1Win: action.payload,
      };
    case "ROUND2WINNER":
      return {
        ...state,
        round2Win: action.payload,
      };
    case "ROUND3WINNER":
      return {
        ...state,
        round3Win: action.payload,
      };
    case "USERTURN":
      return {
        ...state,
        userTurn: !state.userTurn,
      };
    case "AIBOARDMOVE":
      return {
        ...state,
        aiBoard: {
          [action.payload.class]: [
            ...state.aiBoard[action.payload.class],
            action.payload.card,
          ],
        },
      };
    case "AIDECK":
      return {
        ...state,
        aiDeck: action.payload,
      };
    case "AIAVAILABLE":
      return {
        ...state,
        aiCardsAvailable: action.payload,
      };
    case "CARDSAVAILABLE":
      return {
        ...state,
        cardsAvailable: action.payload,
      };
    default:
      return state;
  }
};
