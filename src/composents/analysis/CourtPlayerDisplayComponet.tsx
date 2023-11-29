import React from "react";

import { PlayerTableComponent } from "./PlayerTableComponent";
import { PlayerInfo } from "../../api-client/api";

interface CourtPlayerDisplayComponetProps {
  home_team_zone_name: string[][];
  away_team_zone_name: string[][];
  getPlayer: (
    team: "home" | "away",
    zone: string
  ) =>
    | PlayerInfo
    | {
        name: string;
        player_number: string;
      };
}
export const CourtPlayerDisplayComponet: React.FC<
  CourtPlayerDisplayComponetProps
> = ({ home_team_zone_name, away_team_zone_name, getPlayer }) => {
  return (
    <table className={`table-auto absolute top-11`}>
      <tbody>
        <PlayerTableComponent
          type="home"
          getPlayer={getPlayer}
          team_zone_name={home_team_zone_name}
        />
        <PlayerTableComponent
          type="away"
          getPlayer={getPlayer}
          team_zone_name={away_team_zone_name}
        />
      </tbody>
    </table>
  );
};
