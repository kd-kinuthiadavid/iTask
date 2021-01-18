/* eslint-disable import/no-anonymous-default-export */
import * as types from "../actionTypes";

const initalState = {};

export default (state = initalState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
