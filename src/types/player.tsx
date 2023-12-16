import { PlayerGet } from "../api-client/api";

export type OnCourt = boolean;

export interface Player {
  PlayerInfo: PlayerGet;
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
  setter_position: SetterPositionName;
}

export enum SetterPositionName {
  Z1 = "Z1",
  Z2 = "Z2",
  Z3 = "Z3",
  Z4 = "Z4",
  Z5 = "Z5",
  Z6 = "Z6",
  NULL = "NULL",
}

export interface Match {
  home_team: Team;
  away_team: Team;
}

export enum positonName {
  setter = "セッター",
  outsideHitter = "アウトサイドヒッター",
  middleBlocker = "ミドルブロッカー",
  oppositeHitter = "オッポジット",
  libero = "リベロ",
}

export interface PositonNameEnum {
  [key: string]: string;
}
