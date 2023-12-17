import React from "react";

import { MatchRequest, TeamPlayers } from "../../../api-client/api";
import { useAttackHistory } from "../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../hooks/card/useCardController";
import PlayerCardLayout from "../PlayCardLayout";

interface ServeTeamSelectProps {
  match?: MatchRequest;
  homeOnCourtPlayer?: TeamPlayers[];
  awayOnCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

export const ServeTeamSelect: React.FC<ServeTeamSelectProps> = ({
  match,
  homeOnCourtPlayer,
  awayOnCourtPlayer,
  nextStep,
}) => {
  const { setAttackTeamSelect, setTeamId } = useAttackHistory();
  const { setCurrentStep, setCurrentTeam, currentTeam } = useCard();

  const handleHomeTeamClick = (netTeam: "home" | "away") => {
    const netTeamId =
      netTeam === "home" ? match?.home_team.uuid : match?.away_team.uuid;
    setTeamId(netTeamId || "");
    setCurrentTeam(netTeam);
    setCurrentStep(nextStep);
    setAttackTeamSelect(netTeam);
  };

  const getServePlayer = (team: "home" | "away") => {
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
    <PlayerCardLayout title="サーブ" subTitle="チーム選択" type={currentTeam}>
      <button
        style={{ width: "100%", height: "100px" }}
        className="
        bg-blue-300
        text-gray-700
        hover:bg-gray-300
        font-bold py-2 px-4 rounded"
        onClick={() => handleHomeTeamClick("home")}
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
        onClick={() => handleHomeTeamClick("away")}
      >
        {match?.away_team.team_name}
        <br />
        {getServePlayer("away")?.PlayerInfo.name}
      </button>
    </PlayerCardLayout>
  );
};
