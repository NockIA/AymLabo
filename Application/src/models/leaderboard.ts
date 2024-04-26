export interface PlayerLearderboardProps {
  isSelectedPlayer: boolean;
  uuid: string;
  pseudo: string;
  ranking: number;
  avatar: string;
  totalScore: number;
  numberGameWin: number;
  numberGameLoose: number;
  avgAccuracy: number;
  numberOfSoloGamePlay: number;
  kps: number;
}

export interface LeaderboardProps {
  data: Array<PlayerLearderboardProps>;
  limitMin: number;
  limitMax: number;
  top5: Array<PlayerLearderboardProps>;
}

export interface LeaderboardLimits {
  limitMin: number;
  limitMax: number;
}

