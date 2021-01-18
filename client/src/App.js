import { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Navbar from "./General/Navbar";
import Dashboard from "./Dashboard";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import * as types from "./redux/actionTypes";

function App() {
  useEffect(() => {
    // check if user is logged in
    if (localStorage.getItem("jwtToken")) {
      // set auth header
      setAuthTokenHeader(localStorage.getItem("jwtToken"));
      // get user info
      const decodedJwtToken = jwt_decode(localStorage.getItem("jwtToken"));

      // set current user
      store.dispatch({
        type: types.SET_CURRENT_USER,
        payload: decodedJwtToken,
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
