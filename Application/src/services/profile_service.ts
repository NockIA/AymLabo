import { StatProfileProps } from "../models/stat";
import { ValidationErrors } from "../models/auth";
import { ProfileProps } from "../models/profile";
import { apiKey, apiURL } from "../utils/api";
import axios, { AxiosResponse } from "axios";

export class ProfileService {
  // ----------------------------------------- //
  // ---------getProfileCurrentUser----------- //
  // ----------------------------------------- //
  async getProfileCurrentUser(jwt: string): Promise<ProfileProps> {
    try {
      const response = await axios.get(`${apiURL}/myProfile`, {
        headers: { Authorization: apiKey + ":" + jwt },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error while trying to get profile : ${error.message}`);
    }
  }

  async getProfileStats(jwt: string): Promise<Array<StatProfileProps>> {
    try {
      const response = await axios.get(`${apiURL}/myStats`, {
        headers: { Authorization: apiKey + ":" + jwt },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error while trying to get profile stats : ${error.message}`
      );
    }
  }

  async submitProfileEdit(
    profileDatas: ProfileProps,
    jwt: string
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.put(`${apiURL}/profile`, profileDatas, {
        headers: {
          Authorization: apiKey + ":" + jwt,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(
        `Error while trying to update profile : ${error.message}`
      );
    }
  }

  validateProfile(profileDatas: ProfileProps): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!profileDatas.avatar) {
      errors.avatar = "User must have an avatar";
    }
    if (!profileDatas.email) {
      errors.email = "Email adress is required";
    }
    if (!profileDatas.pseudo) {
      errors.username = "Username is required";
    }
    return errors;
  }
}
