import { useReducer } from "react";

export type Players = string[];
export type Score = number[];

export type State = {
  players: Players;
  rounds: Score[];
};

export type WizardActions =
  | { type: "SetPlayers"; payload: string[] }
  | { type: "NextRound"; scores: number[] }
  | { type: "Reset"; state: State };

export const wizardReducer = (state: State, action: WizardActions) => {
  switch (action.type) {
    case "NextRound":
      return {
        ...state,
        rounds: [...state.rounds, action.scores]
      };
    case "SetPlayers":
      return {
        ...state,
        players: action.payload
      };
    case "Reset":
      return { ...action.state };
    default:
      return state;
  }
};

export const useWizardState = () => {
  return useReducer(wizardReducer, {
    players: [],
    rounds: []
  });
};

const getAmountOfRounds = (playerCount = 3) => {
  return 60 / playerCount;
};

export const getScore = (index: number, scores: Score[]) => {
  return scores.reduce((playerScore, score) => {
    return playerScore + score[index];
  }, 0);
};
export const getPlayers = (state: State) => state.players;
export const getPlayerNames = (state: Players) => Object.keys(state);
export const getPlayerCount = (state: Players) => getPlayerNames(state).length;
export const getGameStats = (state: State) => {
  const players = getPlayers(state);
  const playerCount = getPlayerCount(players);
  const rounds = getAmountOfRounds(playerCount);
  const cardAmount = state.rounds.length + 1;
  const mapPlayerFunction = (player: any, index: number) => ({
    name: player,
    score: getScore(index, state.rounds)
  });
  const leaderBoard = players
    .map(mapPlayerFunction)
    .sort((a, b) => b.score - a.score);
  const dealerIndex = (cardAmount - 1) % playerCount;
  const dealer = players[dealerIndex];

  return {
    rounds,
    cardAmount,
    leaderBoard,
    dealer
  };
};
