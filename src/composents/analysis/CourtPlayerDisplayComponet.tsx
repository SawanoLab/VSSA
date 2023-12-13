import React from "react";

import { PlayerTableComponent } from "./PlayerTableComponent";
import { TeamPlayers } from "../../api-client/api";

interface CourtPlayerDisplayComponetProps {
  home_team_zone_name: string[][];
  away_team_zone_name: string[][];
  homeTeamOnCourt: TeamPlayers[];
  awayTeamOnCourt: TeamPlayers[];
}
export const CourtPlayerDisplayComponet: React.FC<
  CourtPlayerDisplayComponetProps
> = ({
  home_team_zone_name,
  away_team_zone_name,
  homeTeamOnCourt,
  awayTeamOnCourt,
}) => {
  return (
    <table className={`table-auto absolute top-11`}>
      <tbody>
        <PlayerTableComponent
          type="home"
          team_zone_name={home_team_zone_name}
          team_on_court={homeTeamOnCourt}
        />
        <PlayerTableComponent
          type="away"
          team_zone_name={away_team_zone_name}
          team_on_court={awayTeamOnCourt}
        />
      </tbody>
    </table>
  );
};
