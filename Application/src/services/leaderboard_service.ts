import { apiKey, apiURL } from "../utils/api";
import axios, { AxiosResponse } from "axios";

export class LeaderboardService {
  async getTopLeaderboard(
    category: string,
    jwt: string,
    limitMin:number,
    limitMax : number,
  ): Promise<AxiosResponse> {
    try {
      const response = axios.get(`${apiURL}/leaderboard/${category}`, {
        params : {
            limitMin :limitMin.toString(),
            limitMax : limitMax.toString(),
        },
        headers: { Authorization: apiKey + ":" + jwt },
      });
      return response;
    } catch (error: any) {
      throw new Error(
        `Error while trying to get top 5 stats : ${error.message}`
      );
    }
  }
}
