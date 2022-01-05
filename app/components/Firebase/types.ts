export enum GAME_STATUS {
  UNAUTHENTICATED = 'unauthenticated', // before login
  LOGGED_IN = 'logged in', // in lobby, before decided to start or join a game
  WAITING = 'waiting', // started a new game, waiting for a challenge
  CHALLENGING = 'challenging', // selected a game to join, waiting for challenge to be accepted
  CHALLENGE_DENIED = 'challenge denied',
  MATCHED = 'matched', // challenge accepted,
  PLAYING = 'playing', // game started
  EXITED = 'exited',
}

export type IPlayer = {
  displayName?: string | null;
  id?: string | null;
  number?: number | null;
};

export type IGameData = {
  uid: string | undefined;
  currentPlayer?: string;
  displayName?: number;
  status?: GAME_STATUS;
  round?: string;
  host?: IPlayer;
  challenger?: IPlayer;
  score?: {player1: number | null; player2: number | null};
  timestamp?: number;
  turnStartTimestamp?: number;
  turnTime?: number;
};

export interface IGame {
  [id: string]: IGameData;
}
