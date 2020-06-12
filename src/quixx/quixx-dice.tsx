import React from "react";
import { Box, Button, Card, CardHeader, CardContent } from "@material-ui/core";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const RollDice = () => {
  const colors = ["grey", "grey", "darkorange", "red", "blue", "green"];
  const [dice, setDice] = React.useState([]);

  const roll = () => {
    setDice(colors.map((color) => randomIntFromInterval(1, 6)));
  };
  return (
    <Card>
      <CardHeader
        title="Würfeltisch"
        action={<Button onClick={roll}>würfeln</Button>}
      />
      <Box
        justifyContent="center"
        justifyItems="center"
        flexWrap="wrap"
        mb={5}
        mt={5}
        display="flex"
      >
        {colors.map((color, index) => (
          <Box
            p={2}
            fontSize={18}
            mr={1}
            mt={1}
            borderRadius={12}
            display="flex"
            alignItems="center"
            justifyItems="center"
            style={{ background: color }}
          >
            {dice[index]}
          </Box>
        ))}
      </Box>
    </Card>
  );
};
