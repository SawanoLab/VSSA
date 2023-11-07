import axios from "axios";
import { PlayerData } from "../../interface/player";
import { SeasonData } from "../../interface/season";
import { TeamsData } from "../../interface/team";

interface PostSeason {
  season_name: string;
  game_format: string;
  code: string;
  start_day: string;
  end_day: string;
  user_id: string;
}

export const getSeasons = async (user_id: string) => {
  const response = await axios.get<SeasonData[]>(
    `http://localhost:10444/seasons/?user_id=${user_id}`
  );
  return response.data;
};

export const postSeason = async (data: PostSeason) => {  
  try {
    const response = await axios.post<PostSeason>(
      `http://localhost:10444/seasons/`,
      data,
      { headers: { 'Content-Type': 'application/json' }}
    );
    return response.data;
  } catch (error) {
    // ここでエラーの詳細をログ出力したり、必要に応じてハンドリングします
    console.error(error);
    throw error;
  }
};


export const getTeams = async (user_id: string) => {
  try {
    const response = await axios.get<TeamsData[]>(
      `http://localhost:10444/teams/?user_id=${user_id}`
    );
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}

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

export const postTeam = async (data: PostTeam) => {
  try {
    const response = await axios.post<PostTeam>(
      `http://localhost:10444/teams/`,
      data,
      { headers: { 'Content-Type': 'application/json' }}
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


interface PostPlayer {
  name: string;
  player_number: number;
  code: string;
  position: string;
  team: string;
  height: number | undefined;
  weight: number | undefined;
  season_id: string;
  user_id: string;
}

export const getPlayers = async (user_id: string) => {
  try {
    const response = await axios.get<PlayerData[]>(
      `http://localhost:10444/players/?user_id=${user_id}`
    );
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}

export const postPlayer = async (data: PostPlayer) => {
  try {
    const response = await axios.post<PostPlayer>(
      `http://localhost:10444/players/`,
      data,
      { headers: { 'Content-Type': 'application/json' }}
    );
    return response.data;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}
