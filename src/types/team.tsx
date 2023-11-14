export interface TeamsData {
  uuid: string;
  name: string;
  code: string;
  director: string;
  doctor: string;
  coach: string;
  trainer: string;
  season_id: string;
  user_id: string;
}


export enum typeOfTeam {
  home = "home",
  away = "away",
}
