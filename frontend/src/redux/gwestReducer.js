const initialState = {
  username: null,
  userID: null,
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
      return {
        ...state,
        username: null,
        userID: null,
      };
    default:
      return state;
  }
};
