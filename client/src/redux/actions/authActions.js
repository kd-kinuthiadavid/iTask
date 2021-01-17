import * as types from "../actionTypes";
import axios from "axios";

export const registerUser = (userData, history) => (dispach) => {
  axios
    .post("http://localhost:5000/api/auth/register", userData)
    .then((res) => {
      console.log("**** created user ****", res.data);
      history.push({
        pathname: "/login",
      });
    })
    .catch((err) =>
      dispach({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};
