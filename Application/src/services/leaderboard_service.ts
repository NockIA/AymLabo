import { LeaderboardProps } from "../models/leaderboard";
import { apiKey, apiURL } from "../utils/api";
import axios from "axios";

export class LeaderboardService {
  async getLimitsLeaderboard(
    category: string,
    jwt: string
  ): Promise<LeaderboardProps> {
    try {
      const response = await axios.get(`${apiURL}/leaderboard/${category}`, {
        headers: { Authorization: apiKey + ":" + jwt },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error while trying to get limits of leaderboard : ${error.message}`
      );
    }
  }

  async getLeaderboardWithLimits(
    category: string,
    jwt: string,
    min: number,
    max: number
  ): Promise<LeaderboardProps> {

    try {
      const response = await axios.get(
        `${apiURL}/leaderBoardWithLimit/${category}`,
        {
          headers: { Authorization: apiKey + ":" + jwt },
          params: {
            limitMin: min.toString(),
            limitMax: max.toString(),
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error while trying to get leaderboard with limits stats : ${error.message}`
      );
    }
  }
}
