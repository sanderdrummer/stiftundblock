import React from "react";

import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip
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
      <Box mt={3}>
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
          key={player}
          label={player}
          placeholder="Punkte"
          required
          fullWidth
          margin="normal"
          type="number"
          name={player}
        />
      ))}
      <Button variant="contained" type="submit">
        nächste runde
      </Button>
    </form>
  );
};

const Game: React.FC<{
  state: State;
  addScore: (scores: number[]) => void;
}> = ({ state, addScore }) => {
  const stats = getGameStats(state);
  return (
    <>
      <Card>
        <CardHeader
          title={`Runde ${stats.cardAmount} von ${stats.rounds}`}
          subheader={`${stats.cardAmount} Karten werden verteilt Es gibt ${stats.dealer}`}
        ></CardHeader>
        <CardContent>
          <RoundForm onSubmit={addScore} players={state.players} />
          <Box m={5}>
            <Typography>Siegertreppchen</Typography>
            <Box mt={2} display="flex" justifyContent="space-between">
              {stats.leaderBoard.map((player, index) => (
                <Chip
                  color="primary"
                  label={
                    <>
                      {player.name} {player.score}
                    </>
                  }
                  avatar={<Avatar>{index + 1}</Avatar>}
                />
              ))}
            </Box>
          </Box>
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
        onSubmit(playerNames);
      }}
    >
      {maybePlayers.map((_, index) => (
        <TextField
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
