import { SET_CURRENT_USER } from "./constants";

const initState = {
  currentUser: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
