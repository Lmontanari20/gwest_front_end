const initialState = {
  username: null,
  userID: null,
  battles: null,
  battle: null,
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
    default:
      return state;
  }
};
