import React from "react";

import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

import {
  useWizardState,
  getPlayerCount,
  getGameStats,
  State,
  Players
} from "./state";

const KEY = "WIZARD";

export const WizardPage = () => {
  const [state, dispatch] = useWizardState();
  const playerCount = getPlayerCount(state.players);

  React.useEffect(() => {
    const json = window.localStorage.getItem(KEY);
    try {
      const state = JSON.parse(json || "");
      dispatch({ type: "Reset", state });
    } catch {}
  }, [dispatch]);

  React.useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Box mt={3} mb={3}>
        <Typography>WIZARD</Typography>
      </Box>
      {playerCount === 0 ? (
        <PlayersForm
          onSubmit={names => dispatch({ type: "SetPlayers", payload: names })}
        />
      ) : (
        <Game
          addScore={scores => dispatch({ type: "NextRound", scores })}
          state={state}
        />
      )}
      {state.players.length > 0 && (
        <Box mt={6}>
          <Button
            onClick={() =>
              dispatch({ type: "Reset", state: { players: [], rounds: [] } })
            }
            variant="contained"
            color="primary"
          >
            neues spiel
          </Button>
        </Box>
      )}
    </>
  );
};

const RoundForm: React.FC<{
  onSubmit: (scores: number[]) => void;
  players: Players;
}> = ({ players, onSubmit }) => {
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        const scores: number[] = players.map(player =>
          Number(e.currentTarget[player].value)
        );
        onSubmit(scores);
        e.currentTarget.reset();
      }}
    >
      <Typography>Punkte:</Typography>
      {players.map(player => (
        <TextField
          variant="outlined"
          key={player}
          label={`Punkte von ${player}`}
          placeholder="Punkte"
          required
          fullWidth
          margin="normal"
          type="tel"
          name={player}
          inputProps={{ pattern: "-?[0-9]*" }}
        />
      ))}
      <Button variant="contained" type="submit">
        punkte speichern
      </Button>
    </form>
  );
};

const Game: React.FC<{
  state: State;
  addScore: (scores: number[]) => void;
}> = ({ state, addScore }) => {
  const stats = getGameStats(state);
  const getSubHeaderText = () => {
    if (stats.cardAmount === 1) {
      return `${stats.cardAmount} Karte wird verteilt - Es gibt ${stats.dealer}`;
    } else {
      return `${stats.cardAmount} Karten werden verteilt - Es gibt ${stats.dealer}`;
    }
  };
  return (
    <>
      <Card>
        <CardHeader
          title={`Runde ${stats.cardAmount} von ${stats.rounds}`}
          subheader={getSubHeaderText()}
        ></CardHeader>
        <CardContent>
          <RoundForm onSubmit={addScore} players={state.players} />
          <Divider style={{ margin: "2rem 0" }} />
          <Typography>Wertung</Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Platz</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Punkte</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.leaderBoard.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

const PlayersForm: React.FC<{
  onSubmit: (names: string[]) => void;
  count?: number;
}> = ({ onSubmit, count = 6 }) => {
  const maybePlayers = Array(count).fill("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const playerNames = maybePlayers
          .map(
            //@ts-ignore
            (_, index) => e.target[`playerName${index + 1}`].value
          )
          .filter(name => name.length);
        //@ts-ignore
        const duplicates = [...new Set(playerNames)];
        if (duplicates.length !== playerNames.length) {
          alert("Jeder spieler sollte einen eindeutigen namen haben ;)");
        } else {
          onSubmit(playerNames);
        }
      }}
    >
      {maybePlayers.map((_, index) => (
        <TextField
          variant="outlined"
          required={index < 3}
          key={index}
          autoComplete="off"
          label={`Spieler ${index + 1}`}
          name={`playerName${index + 1}`}
          placeholder="Name"
          margin="normal"
          type="text"
          fullWidth
        />
      ))}
      <Button variant="contained" color="primary" type="submit">
        spiel starten
      </Button>
    </form>
  );
};
