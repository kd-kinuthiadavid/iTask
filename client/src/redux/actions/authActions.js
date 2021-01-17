import * as types from "../actionTypes";
import axios from "axios";

export const registerUser = (userData) => (dispach) => {
  axios
    .post("http://localhost:5000/api/auth/register", userData)
    .then((res) => console.log("**** created user ****", res.data))
    .catch((err) =>
      dispach({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};
