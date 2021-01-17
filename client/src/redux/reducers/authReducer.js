/* eslint-disable import/no-anonymous-default-export */
import * as types from "../actionTypes";

const initalState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initalState, action) => {
  switch (action.type) {
    case types.TEST_AUTH_DISPATCH:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
