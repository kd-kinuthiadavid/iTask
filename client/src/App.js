import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Navbar from "./General/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
