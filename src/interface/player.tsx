export interface PlayerInfo {
  uuid: string;
  name: string;
  player_number: number;
  code: string;
  postion: string;
  weight: number;
  height: number;
  user_id: string;
  team_id: string;
  season_id: string;
}

export type OnCourt = boolean;

export interface Player {
  PlayerInfo: PlayerInfo;
  onCourt: OnCourt;
  zone_code: string | null;
  setter: boolean;
  libero: boolean;
}

export interface Players {
  [uuid: string]: Player;
}

export interface Team {
  team_name: string;
  players: Players;
}

export interface Match {
  home_team: Team;
  away_team: Team;
}
