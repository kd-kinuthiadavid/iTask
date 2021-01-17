import { Button } from "reactstrap";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./General/Navbar/index";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Button outline color="primary">
            primary
          </Button>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
