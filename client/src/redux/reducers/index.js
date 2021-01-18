import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducers from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducers,
});
