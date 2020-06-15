import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GameLobby } from "./lobby/lobby";
import { BingoBlock } from "./bingo";
import {
  List,
  ListItem,
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@material-ui/core";

export const Home = () => {
  return (
    <Card>
      <CardHeader title="was wollt ihr spielen" />
      <CardContent>
        <List>
          <ListItem to="/quixx" button component={Link}>
            QUIXX
          </ListItem>
          <ListItem to="wizard" button component={Link}>
            WIZARD
          </ListItem>
          <ListItem to="/bingo" button component={Link}>
            BINGO
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
export const Layout = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button to="/" component={Link}>
            STIFT UND BLOCK
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={4} />
      <Switch>
        <Route path="/bingo">
          <GameLobby type="bingo">
            <BingoBlock />
          </GameLobby>
        </Route>{" "}
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
};
