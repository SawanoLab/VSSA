import axios, { AxiosError, AxiosResponse } from "axios";

import handleApiError from "./handleApiError";
import { PlayerInfo } from "../../types/player";

export interface PostPlayer {
  name: string;
  player_number: number;
  code: string;
  postion: string;
  height: number | undefined;
  weight: number | undefined;
  user_id: string;
  team_id: string;
  season_id: string;
}

interface ApiResponse<T> {
  data?: T;
  loading: boolean;
}

export const getPlayers = async (user_id: string): Promise<ApiResponse<PlayerInfo[]>> => {
  try {
    const response: AxiosResponse<PlayerInfo[]> = await axios.get(
      `http://localhost:10444/players/?user_id=${user_id}`
    );
    return { data: response.data, loading: false };
  } catch (error) {
    handleApiError("データの取得中にエラーが発生しました", error as AxiosError);
    return { loading: false };
  }
}

export const postPlayer = async (data: PostPlayer): Promise<ApiResponse<PostPlayer>> => {
  try {
    const response: AxiosResponse<PostPlayer> = await axios.post(
      `http://localhost:10444/players/`,
      data,
      { headers: { 'Content-Type': 'application/json' }}
    );
    return {
      data: response.data,
      loading: false
    };
  } catch (error) {
    handleApiError("データの投稿中にエラーが発生しました", error as AxiosError);
    return { loading: false };
  }
}


export const deletePlayer = async (playerId: string, userID: string): Promise<ApiResponse<PlayerInfo>> => {
  try {
    const response: AxiosResponse<PlayerInfo> = await axios.delete(
      `http://localhost:10444/players/?player_id=${playerId}&&user_id=${userID}`
    );
    return { data: response.data, loading: false };
  } catch (error) {
    handleApiError("データの削除中にエラーが発生しました", error as AxiosError);
    return { loading: false };
  }
}


export const putPlayer = async (playerID: string, userID: string, data: PlayerInfo): Promise<ApiResponse<PlayerInfo>> => {
  try {
    const response: AxiosResponse<PlayerInfo> = await axios.put(
      `http://localhost:10444/players/?player_id=${playerID}&user_id=${userID}`,
      data,
      { headers: { 'Content-Type': 'application/json' }}
    );
    return { data: response.data, loading: false };
  } catch (error) {
    handleApiError("データの更新中にエラーが発生しました", error as AxiosError);
    return { loading: false };
  }
}
