// import handleApiError from "./handleApiError";
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
    const response = await fetch(`http://localhost:10444/players/?user_id=${user_id}`);
    const data = await response.json();
    return { data, loading: false };
  } catch (error) {
    console.log(error);
    return { loading: false };
  }
}

export const postPlayer = async (data: PostPlayer): Promise<ApiResponse<PostPlayer>> => {
  try {
    const response = await fetch(`http://localhost:10444/players/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { data: responseData, loading: false };
  } catch (error) {
    console.log(error);
    return { loading: false };
  }
}

export const deletePlayer = async (playerId: string, userID: string): Promise<ApiResponse<PlayerInfo>> => {
  try {
    const response = await fetch(`http://localhost:10444/players/?player_id=${playerId}&&user_id=${userID}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return { data, loading: false };
  } catch (error) {
    console.log(error);
    return { loading: false };
  }
}

export const putPlayer = async (playerID: string, userID: string, data: PlayerInfo): Promise<ApiResponse<PlayerInfo>> => {
  try {
    const response = await fetch(`http://localhost:10444/players/?player_id=${playerID}&user_id=${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { data: responseData, loading: false };
  } catch (error) {
    console.log(error);
    return { loading: false };
  }
}
