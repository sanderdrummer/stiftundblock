import React from "react";
import * as firebase from "firebase";
import {
  TextField,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

type GameLobbyState = {
  type: "quixx" | "bingo" | "wizard";
  players: string[];
};

export const GameLobby: React.FC<any> = ({ children, type }) => {
  return (
    <div>
      <Players type={type} />
      {children}
    </div>
  );
};
const usePlayers = (type = "") => {
  const database = firebase.database().ref();
  const playerRef = database.child(`${type}/players`);
  const [players, setPlayers] = React.useState<string[]>([]);
  const clearPlayers = () => {
    playerRef.set({});
  };
  const addPlayer = (player: string) => {
    const nextPlayers = [...players, player];
    setPlayers(nextPlayers);
    playerRef.child(player).set(player);
  };

  React.useEffect(() => {
    playerRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const players: any = Object.keys(snapshot.val());
        setPlayers(players);
      } else {
        setPlayers([]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { players, addPlayer, clearPlayers };
};

const Players = ({ type }) => {
  const { players, addPlayer, clearPlayers } = usePlayers(type);
  const [name, setName] = React.useState("");
  return (
    <div>
      <Card>
        <CardHeader title="es spielen"></CardHeader>
        <CardContent>
          {players.map((player) => (
            <div>{player}</div>
          ))}
        </CardContent>
      </Card>
      <Box mb={2} mt={2} display="flex" alignContent="center">
        <TextField
          fullWidth
          variant="filled"
          label="Spieler Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => {
            addPlayer(name);
          }}
        >
          mitspielen
        </Button>
      </Box>
      <Box m={3}>
        <Button onClick={clearPlayers}>neue Spieler</Button>
      </Box>
    </div>
  );
};
