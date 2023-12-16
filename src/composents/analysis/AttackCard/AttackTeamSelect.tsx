import React from "react";

import { MatchRequest, TeamPlayers } from "../../../api-client/api";
import { useAttackHistory } from "../../../hooks/analysis/attack/use-attackHistory";
import { useCard } from "../../../hooks/card/use-cardController";
import PlayerCardLayout from "../PlayCardLayout";


interface AttackTeamSelectProps {
  match?: MatchRequest;
  homeOnCourtPlayer?: TeamPlayers[];
  awayOnCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

export const AttackTeamSelect: React.FC<AttackTeamSelectProps> = ({
  match,
  nextStep
}) => {
  const { setAttackTeamSelect, setTeamId } = useAttackHistory();
  const { setCurrentStep, setCurrentTeam, currentTeam } = useCard();


  const handleHomeTeamClick = (netTeam: "home" | "away") => {
    const netTeamId = netTeam === "home" ? match?.home_team.uuid : match?.away_team.uuid;
    setTeamId(netTeamId || "");
    setCurrentTeam(netTeam);
    setCurrentStep(nextStep);
    setAttackTeamSelect(netTeam);
  }

  return (
    <PlayerCardLayout title="アタック" subTitle="チーム選択" type={currentTeam}>
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
      </button>
    </PlayerCardLayout>
  );
};
