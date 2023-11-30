import React from "react";

import { MatchRequest, TeamPlayers } from "../../../api-client/api";
import PlayerCardLayout from "../PlayCardLayout";

interface ServeTeamSelectProps {
  match?: MatchRequest;
  homeOnCourtPlayer?: TeamPlayers[];
  awayOnCourtPlayer?: TeamPlayers[];
}

export const ServeTeamSelect: React.FC<ServeTeamSelectProps> = ({
  match,
  homeOnCourtPlayer,
  awayOnCourtPlayer,
}) => {
  const getServePlayer = (team: "home" | "away") => {
    // court_zoneが'Z5'の選手を返す
    if (team === "home") {
      return homeOnCourtPlayer
        ? Object.values(homeOnCourtPlayer).find(
            (player) => player.zone_code === "Z5"
          )
        : null;
    } else {
      return awayOnCourtPlayer
        ? Object.values(awayOnCourtPlayer).find(
            (player) => player.zone_code === "Z5"
          )
        : null;
    }
  };

  return (
    <PlayerCardLayout title="サーブ" subTitle="チーム選択">
      <button
        style={{ width: "100%", height: "100px" }}
        className="
        bg-blue-300
        text-gray-700
        hover:bg-gray-300
        font-bold py-2 px-4 rounded"
      >
        {match?.home_team.team_name}
        <br />
        {getServePlayer("home")?.PlayerInfo.name}
      </button>
      <button
        style={{ width: "100%", height: "100px" }}
        className="
        bg-red-300
        text-gray-700
        hover:bg-gray-300
        font-bold py-2 px-4 rounded"
      >
        {match?.away_team.team_name}
        <br />
        {getServePlayer("away")?.PlayerInfo.name}
      </button>
    </PlayerCardLayout>
  );
};
