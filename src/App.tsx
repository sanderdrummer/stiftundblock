import React from "react";
import { WizardPage } from "./wizard/wizard-game";
import {
  AppBar,
  Typography,
  Container,
  useMediaQuery,
  createMuiTheme,
  ThemeProvider,
  CssBaseline
} from "@material-ui/core";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar position="static">
          <Typography variant="h6">STIFT UND BLOCK</Typography>
        </AppBar>
        <Container>
          <WizardPage />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
