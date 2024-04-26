import { apiKey, apiURL } from "../utils/api";
import axios from "axios";

export class FriendService {
  async requestFriend(username: string, jwt: string): Promise<string> {
    try {
      const response = await axios.post(
        `${apiURL}/requestFriend`,
        { username: username.trim() },
        { headers: { Authorization: apiKey + ":" + jwt } }
      );
      if (response) {
        return "Friend request sended !";
      }
      return "Coundn't send the request";
    } catch (error: any) {
      return "Coundn't send the request";
    }
  }

  async getFriendsAndRequests(jwt: string) {
    try {
      const response = await axios.get(`${apiURL}/myFriend`, {
        headers: { Authorization: apiKey + ":" + jwt },
      });
      return response;
    } catch (error: any) {
      throw new Error(`Error while trying to get friends : ${error.message}`);
    }
  }

  async acceptFriendRequest(requestId: string, jwt: string) {
    try {
      const response = await axios.post(
        `${apiURL}/acceptFriendRequest`,
        { requestId: requestId.toString() },
        {
          headers: { Authorization: `${apiKey}:${jwt}` },
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(`Error while trying to accept friend : ${error.message}`);
    }
  }

  async refuseFriendRequest(requestId: string, jwt: string) {
    try {
      const response = await axios.post(
        `${apiURL}/refuseFriendRequest`,
        { requestId: requestId.toString() },
        {
          headers: { Authorization: `${apiKey}:${jwt}` },
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(`Error while trying to refuse friend : ${error.message}`);
    }
  }
}
