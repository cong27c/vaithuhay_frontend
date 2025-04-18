import authServices from "~/Services/authServices";
import { GET_CURRENT_USER, SET_CURRENT_USER } from "./constants";

export const getCurrentUser = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_CURRENT_USER,
    });
    try {
      const res = await authServices.getCurrentUser();
      dispatch(setCurrentUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});
