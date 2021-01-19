import * as types from "../actionTypes";
import axios from "axios";
import setAuthTokenHeader from "../../utils/setAuthTokenHeader";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history, redirectPath) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/auth/register", userData)
    .then((res) => {
      console.log("**** created user ****", res.data);
      history.push({
        pathname: `/${redirectPath}`,
      });
    })
    .catch((err) =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/auth/login", userData)
    .then((res) => {
      // get the token from response
      const jwtToken = res.data.token;

      // set token to ls
      localStorage.setItem("jwtToken", jwtToken);

      // set token to Authorization header to be used in subsequent requests
      setAuthTokenHeader(jwtToken);

      // decode the jwt token to get user data
      const decodedToken = jwt_decode(jwtToken);

      // set the current user
      dispatch({
        type: types.SET_CURRENT_USER,
        payload: decodedToken,
      });

      // redirect to "/dashboard"
      history.push({
        pathname: "/",
      });
    })
    .catch((err) =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const logOut = () => (dispatch) => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");

  // remove auth header for subsequent requests
  setAuthTokenHeader(false);

  // set current user to {} and isAuthenticated to false
  dispatch({
    type: types.SET_CURRENT_USER,
    payload: {},
  });
};
