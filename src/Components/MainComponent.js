import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import SignUp from "./SignupComponent";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Redirect to="/signup" />
        </Switch>
      </div>
    );
  }
}

export default Main;
