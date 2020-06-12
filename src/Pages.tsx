import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to="quixx">QUIXX</Link>
      <Link to="wizard">Wizard</Link>
      <Link to="bingo">Bingo</Link>
      <Link to="quixx">QUIXX</Link>
    </div>
  );
};
export const Layout = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};