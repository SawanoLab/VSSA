import axios, { AxiosError, AxiosResponse } from "axios";

import handleApiError from "./handleApiError";
import { SeasonData } from "../../types/season";

interface PostSeason {
  season_name: string;
  game_format: string;
  code: string;
  start_day: string;
  end_day: string;
  user_id: string;
}

interface ApiResponse<T> {
  data?: T;
  loading: boolean;
}

export const getSeasons = async (user_id: string): Promise<ApiResponse<SeasonData[]>> => {
  try {
    const response: AxiosResponse<SeasonData[]> = await axios.get(
      `http://localhost:10444/seasons/?user_id=${user_id}`
    );
    return { data: response.data, loading: false };
  } catch (error) {
    handleApiError("シーズンデータの取得中にエラーが発生しました", error as AxiosError);
    return { loading: false };
  }
};

export const postSeason = async (data: PostSeason): Promise<PostSeason> => {
  try {
    const response: AxiosResponse<PostSeason> = await axios.post(
      `http://localhost:10444/seasons/`,
      data,
      { headers: { 'Content-Type': 'application/json' }}
    );
    return response.data;
  } catch (error) {
    handleApiError("シーズンデータの投稿中にエラーが発生しました", error as AxiosError);
    throw error;
  }
};
