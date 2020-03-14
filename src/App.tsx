import React from "react";
import { WizardPage } from "./wizard/wizard-game";
import { AppBar, Typography, Container } from "@material-ui/core";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Typography variant="h6">STIFT UND BLOCK</Typography>
      </AppBar>
      <Container>
        <WizardPage />
      </Container>
    </div>
  );
}

export default App;
