import React from "react";
import * as firebase from "firebase";
import {
  AppBar,
  Container,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import { Layout } from "./Pages";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyBuPLRmYKHALdmBh2eLo_R4bTX0TPFxDdk",
  authDomain: "stift-und-block.firebaseapp.com",
  databaseURL: "https://stift-und-block.firebaseio.com",
  projectId: "stift-und-block",
  storageBucket: "stift-und-block.appspot.com",
  messagingSenderId: "822446116090",
  appId: "1:822446116090:web:437507b535935bec210d43",
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar position="static">STIFT UND BLOCK</AppBar>
        <Container>
          <Layout />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
