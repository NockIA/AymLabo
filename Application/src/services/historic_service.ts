import { HistoricProps } from "../models/historic";
import { apiKey, apiURL } from "../utils/api";
import axios from "axios";

export class HistoricService {
  // ------------------------------------------ //
  // -----------getHistoricGridShot------------ //
  // ------------------------------------------ //
  async getHistoricGridShot(
    jwt: string,
    limit: number
  ): Promise<HistoricProps> {
    try {
      const response = await axios.get(`${apiURL}/myGameGrid`, {
        headers: { Authorization: apiKey + ":" + jwt },
        params: {
          numberOfLine: limit.toString(),
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error while trying to get historic of gridshot : ${error.message}`
      );
    }
  }

  // ------------------------------------------ //
  // -----------getHistoricTracking------------ //
  // ------------------------------------------ //
  async getHistoricTracking(
    jwt: string,
    limit: number
  ): Promise<HistoricProps> {
    try {
      const response = await axios.get(`${apiURL}/myGameTracking`, {
        headers: { Authorization: apiKey + ":" + jwt },
        params: {
          numberOfLine: limit.toString(),
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error while trying to get historic of gridshot : ${error.message}`
      );
    }
  }
}
