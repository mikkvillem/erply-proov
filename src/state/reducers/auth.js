import { SIGNIN_USER, SIGNOUT_USER, SIGNIN_USER_ERROR } from "../actions/types";

const initialState = {
  loggedIn: false,
  signInError: false,
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SIGNIN_USER:
      return {
        loggedIn: true,
        signInError: false,
      };
    case SIGNOUT_USER:
      return {
        loggedIn: false,
        signInError: false,
      };
    case SIGNIN_USER_ERROR:
      return {
        loggedIn: false,
        signInError: true,
      };
    default:
      return state;
  }
};
