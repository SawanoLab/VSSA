import axios from "axios";

interface ISeason {
  uuid: string;
  start_day: string;
  end_day: string;
  season_name: string;
  game_format: string;
  code: string;
  user_id: string;
}
interface PostSeason {
  season_name: string;
  game_format: string;
  code: string;
  start_day: string;
  end_day: string;
  user_id: string;
}

export const getSeasons = async (user_id: string) => {
  const response = await axios.get<ISeason[]>(
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

type Team = {
  uuid: string;
  team_name: string;
};

export const getTeams = async (user_id: string) => {
  try {
    const response = await axios.get<Team[]>(
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

interface Player {
  uuid: string;
  name: string;
  player_number: number;
  code: string;
  position: string;
  weight: number;
  height: number;
  user_id: string;
  team_id: string;
  season_id: string;
}

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
    const response = await axios.get<Player[]>(
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
