import * as types from "../actionTypes";

export const registerUser = (userData) => {
  return {
    type: types.TEST_AUTH_DISPATCH,
    payload: userData,
  };
};
