import React from "react";
import { Box, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { initialFields, defaultGameDeck } from "./game-data";
import { LockOpen, Lock } from "@material-ui/icons";
import { RollDice } from "./quixx-dice";

const fieldsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "syncState":
      return {
        ...action.state,
      };
    case "toggleField":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          checked: !state[action.key].checked,
        },
      };
    default:
      return state;
  }
};

const CheckMark: React.FC<any> = ({ checked, children }) => {
  return (
    <Box
      display="flex"
      mr={1}
      alignItems="center"
      justifyContent="center"
      style={{
        minWidth: "4rem",
        minHeight: "4rem",
        borderRadius: "100%",
        background: checked ? "rgba(50, 50, 50, 0.5)" : "transparent",
      }}
    >
      {children}
    </Box>
  );
};

const GameCell: React.FC<any> = ({ cell, ...props }) => {
  return (
    <Box
      {...props}
      fontSize={24}
      textAlign="center"
      style={{
        background: cell.color,
      }}
    >
      <CheckMark checked={cell.checked}>
        {cell.value.includes("lock") ? (
          cell.checked ? (
            <Lock />
          ) : (
            <LockOpen />
          )
        ) : (
          cell.value
        )}
      </CheckMark>
    </Box>
  );
};
const isValid = (key, fields) => {
  const field = fields[key];
  if (field.checked) {
    return true;
  }

  const coloredKeys = Object.keys(fields).filter((filterKey) => {
    return filterKey.includes(key.split("-")[0]) && fields[filterKey].checked;
  });
  if (key.includes("lock")) {
    return coloredKeys.length > 4;
  }
  return coloredKeys.every((everyKey) => {
    const checkField = fields[everyKey];
    if (key.includes("red") || key.includes("yellow")) {
      return Number(field.value) > Number(checkField.value);
    } else {
      return Number(field.value) < Number(checkField.value);
    }
  });
};
const GameRow = ({ row, fields, dispatchFields }) => {
  return (
    <Box mb={2} mr={1} display="flex" overflow="auto">
      {row.map((key) => (
        <GameCell
          onClick={() => {
            if (isValid(key, fields)) {
              dispatchFields({ type: "toggleField", key });
            }
          }}
          cell={fields[key]}
          key={key}
        />
      ))}
    </Box>
  );
};

const getPoints = (points = 0) => {
  switch (points) {
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 6;
    case 4:
      return 10;
    case 5:
      return 15;
    case 6:
      return 21;
    case 7:
      return 28;
    case 8:
      return 36;
    case 9:
      return 45;
    case 10:
      return 55;
    case 11:
      return 66;
    case 12:
      return 78;
    default:
      return 0;
  }
};

const getFinalPoints = (points) => {
  return Object.keys(points).reduce((sum, key) => {
    return key === "fail"
      ? sum - points.fail * 5
      : getPoints(points[key]) + sum;
  }, 0);
};

const Points = ({ fields }) => {
  const initialPoints = {
    red: 0,
    darkorange: 0,
    green: 0,
    blue: 0,
    fail: 0,
  };
  const [points, setPoints] = React.useState(initialPoints);
  React.useEffect(() => {
    const newPoints = Object.keys(fields).reduce((points, key) => {
      const field = fields[key];
      if (field.checked) {
        return { ...points, [field.color]: points[field.color] + 1 };
      }
      return points;
    }, initialPoints);
    setPoints(newPoints);
  }, [fields, initialPoints]);
  return (
    <div>
      Ergebnis:
      <Box overflow="auto" mt={2} display="flex">
        {Object.keys(points)
          .filter((key) => key !== "fail")
          .map((key) => (
            <Box
              p={2}
              key={key}
              fontSize={24}
              ml={3}
              borderRadius={4}
              display="flex"
              alignItems="center"
              justifyItems="center"
              style={{ background: key }}
            >
              {getPoints(points[key])}
            </Box>
          ))}
        <Box
          p={2}
          fontSize={24}
          mr={3}
          borderRadius={4}
          display="flex"
          alignItems="center"
          justifyItems="center"
        >
          {points["fail"] * -5}
        </Box>
        <Box
          p={2}
          fontSize={24}
          ml={3}
          borderRadius={4}
          display="flex"
          alignItems="center"
          justifyItems="center"
        >
          {getFinalPoints(points)}
        </Box>
      </Box>
    </div>
  );
};

const MissFields = ({ onClick, fields }) => {
  const keys = ["fail-1", "fail-2", "fail-3", "fail-4"];
  return (
    <Box>
      Fehlwürfe:
      <Box display="flex">
        {keys.map((key) => (
          <Box bgcolor="text.secondary" key={key} onClick={() => onClick(key)}>
            <CheckMark checked={fields[key].checked} children={"-5"} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const QuixxBlock = () => {
  const QUIXX_KEY = "QUIXXX_STATE_1";
  const [fields, dispatchFields] = React.useReducer(
    fieldsReducer,
    initialFields
  );

  React.useEffect(() => {
    const stateJson = localStorage.getItem(QUIXX_KEY);
    const state = JSON.parse(stateJson);
    if (state) {
      //@ts-ignore
      dispatchFields({ type: "syncState", state });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(QUIXX_KEY, JSON.stringify(fields));
  }, [fields]);

  return (
    <>
      <Box m={6} />
      <Card>
        <CardHeader title="QUIXX Block" />
        <CardContent>
          {defaultGameDeck.map((row, index) => (
            <GameRow
              key={index}
              row={row}
              fields={fields}
              dispatchFields={dispatchFields}
            />
          ))}
          <MissFields
            fields={fields}
            // @ts-ignore
            onClick={(key) => dispatchFields({ type: "toggleField", key })}
          />
          <Box></Box>
        </CardContent>
      </Card>
      <Box m={3} />
      <RollDice />
      <Box m={3} />
      <Card>
        <CardHeader title="Wertung" />
        <CardContent>
          <Points fields={fields} />
        </CardContent>
      </Card>
      <Box mt={6} mb={6}>
        <Button
          onClick={() => {
            //@ts-ignore
            dispatchFields({ type: "syncState", state: initialFields });
          }}
        >
          Neues Spiel
        </Button>
      </Box>
    </>
  );
};
