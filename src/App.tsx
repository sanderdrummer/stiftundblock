import React from "react";
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
