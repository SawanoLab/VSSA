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

export const getSeasons = async (user_id: string) => {
  const response = await axios.get<ISeason[]>(
    `http://localhost:10444/seasons/?user_id=${user_id}`
  );
  console.log("response", response.data);
  
  return response.data;
};

interface PostSeason {
  season_name: string;
  game_format: string;
  code: string;
  start_day: string;
  end_day: string;
  user_id: string;
}

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
