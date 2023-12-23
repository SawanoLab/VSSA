import React from "react";

import { MatchResponse, TeamPlayers } from "../../../api-client/api";
import { useAttackHistory } from "../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../hooks/card/useCardController";
import PlayerCardLayout from "../PlayCardLayout";

interface AttackTeamSelectProps {
  match?: MatchResponse;
  homeOnCourtPlayer?: TeamPlayers[];
  awayOnCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

export const AttackTeamSelect: React.FC<AttackTeamSelectProps> = ({
  match,
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
