export const initialState = {
  lives: 3
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIVES":
      return { ...state, lives: action.payload };
    default:
      return state;
  }
};
