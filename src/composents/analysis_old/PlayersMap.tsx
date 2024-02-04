import React from "react";

import { PlayerTableComponent } from "./PlayerTableComponent";
import { TeamPlayers } from "../../api-client/api";
import {
  home_team_zone_name_column,
  away_team_zone_name_column,
} from "../../types/team_zone_name_column";

interface PlayersMapProps {
  homeOnCourtPlayer: TeamPlayers[];
  awayOnCourtPlayer: TeamPlayers[];
}
export const PlayersMap: React.FC<PlayersMapProps> = ({
  homeOnCourtPlayer,
  awayOnCourtPlayer,
}) => {
  return (
    <div className="relative">
      <table className={`table-auto absolute top-3 left-3`}>
        <tbody>
          <PlayerTableComponent
            type="home"
            team_zone_name={home_team_zone_name_column}
            team_on_court={homeOnCourtPlayer}
          />
          <PlayerTableComponent
            type="away"
            team_zone_name={away_team_zone_name_column}
            team_on_court={awayOnCourtPlayer}
          />
        </tbody>
      </table>
      <img
        src="/volleyball-court2.png"
        alt="court"
        style={{ width: "300px", height: "450px" }}
      />
    </div>
  );
};
