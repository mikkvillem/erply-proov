import { SIGNIN_USER, SIGNOUT_USER, SIGNIN_USER_ERROR } from "./types";

export const signInUser = () => async (dispatch) => {
  try {
    dispatch({ type: SIGNIN_USER });
  } catch (error) {
    dispatch({
      type: SIGNIN_USER_ERROR,
    });
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("user");
    dispatch({ type: SIGNOUT_USER });
  } catch (error) {
    return;
  }
};
