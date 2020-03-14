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
  TableBody,
  Avatar
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
          addWants={wants => dispatch({ type: "SetWants", wants })}
          state={state}
        />
      )}
      {state.players.length > 0 && (
        <Box mt={6}>
          <Button
            onClick={() =>
              dispatch({
                type: "Reset",
                state: { players: [], rounds: [], wants: [] }
              })
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
  wants: number[];
  round: number;
}> = ({ players, onSubmit, wants, round }) => {
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        const haves: number[] = players.map(player =>
          Number(e.currentTarget[player].value)
        );
        const validateRounds = haves.reduce((acc, have) => acc + have, 0);
        if (validateRounds !== round) {
          alert(
            "Oh oh die Anzahl aller Stiche passt nicht zur aktuellen Kartenanzahl :("
          );
          return;
        }
        const scores = haves.map((have, index) => {
          const want = wants[index];
          const result = want - have;
          if (result === 0) {
            return 20 + have * 10;
          } else {
            return Math.abs(10 * result) * -1;
          }
        });
        onSubmit(scores);
        e.currentTarget.reset();
        window.scrollTo(0, 0);
      }}
    >
      <Typography>Rundenwertung:</Typography>
      {players.map((player, index) => (
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          key={player}
        >
          <Avatar style={{ marginRight: "1rem" }}>{wants[index]}</Avatar>
          <TextField
            variant="outlined"
            label={`Stiche von ${player}`}
            placeholder="tatsächliche Stiche"
            required
            fullWidth
            margin="normal"
            type="tel"
            name={player}
            inputProps={{ pattern: "[0-9]*" }}
          />
        </Box>
      ))}
      <Button variant="contained" type="submit">
        punkte speichern
      </Button>
    </form>
  );
};

const WantForm: React.FC<{
  onSubmit: (wants: number[]) => void;
  players: Players;
}> = ({ players, onSubmit }) => {
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        const wants: number[] = players.map(player =>
          Number(e.currentTarget[player].value)
        );
        onSubmit(wants);
        e.currentTarget.reset();
        window.scrollTo(0, 0);
      }}
    >
      <Typography>Stiche Ansagen:</Typography>
      {players.map(player => (
        <TextField
          variant="outlined"
          key={player}
          label={`Ansage von ${player}`}
          placeholder="x stiche"
          required
          fullWidth
          margin="normal"
          type="tel"
          name={player}
          inputProps={{ pattern: "[0-9]*" }}
        />
      ))}
      <Button variant="contained" type="submit">
        Ansage speichern
      </Button>
    </form>
  );
};

const Game: React.FC<{
  state: State;
  addScore: (scores: number[]) => void;
  addWants: (wants: number[]) => void;
}> = ({ state, addScore, addWants }) => {
  const stats = getGameStats(state);
  const roundCopy = `Runde ${stats.cardAmount} von ${stats.rounds}`;
  const getSubHeaderText = () => {
    if (stats.cardAmount === 1) {
      return `${stats.cardAmount} Karte wird verteilt - Es gibt ${stats.dealer}`;
    } else {
      return `${stats.cardAmount} Karten werden verteilt - Es gibt ${stats.dealer}`;
    }
  };
  const wants = state.wants[stats.cardAmount - 1];
  return (
    <>
      <Card>
        <CardHeader
          title={roundCopy}
          subheader={getSubHeaderText()}
        ></CardHeader>
        <CardContent>
          {wants ? (
            <RoundForm
              round={stats.cardAmount}
              wants={wants}
              onSubmit={addScore}
              players={state.players}
            />
          ) : (
            <WantForm onSubmit={addWants} players={state.players} />
          )}
          <Divider style={{ margin: "2rem 0" }} />
          <Typography>Wertung</Typography>
          <Typography>{roundCopy}</Typography>

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
