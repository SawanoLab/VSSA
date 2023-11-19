import axios, { AxiosError, AxiosResponse } from "axios";

import handleApiError from "./handleApiError";
import { TeamsData } from "../../types/team";

type PostTeam = {
  name: string;
  code: string;
  director: string;
  coach: string;
  trainer: string;
  doctor: string;
  season_id: string;
  user_id: string;
};

interface ApiResponse<T> {
  data?: T;
  loading: boolean;
}

export const getTeams = async (
  user_id: string
): Promise<ApiResponse<TeamsData[]>> => {
  try {
    const response: AxiosResponse<TeamsData[]> = await axios.get(
      `${process.env.ENTORYPOINT_URL}/teams/?user_id=${user_id}`
    );
    return { data: response.data, loading: false };
  } catch (error) {
    handleApiError(
      "チームデータの取得中にエラーが発生しました",
      error as AxiosError
    );
    throw error;
  }
};

export const postTeam = async (data: PostTeam): Promise<PostTeam> => {
  try {
    const response: AxiosResponse<PostTeam> = await axios.post(
      `${process.env.ENTORYPOINT_URL}/teams/`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    handleApiError(
      "チームデータの投稿中にエラーが発生しました",
      error as AxiosError
    );
    throw error;
  }
};
