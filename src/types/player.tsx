import { TeamPlayers } from "../api-client/api";

export type OnCourt = boolean;


export interface Players {
  [uuid: string]: TeamPlayers;
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
