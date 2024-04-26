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
  killPerSeconde: number;
}
