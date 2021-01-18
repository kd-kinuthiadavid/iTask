/* eslint-disable import/no-anonymous-default-export */
import isEmpty from "lodash/isEmpty";
import * as types from "../actionTypes";

const initalState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initalState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
