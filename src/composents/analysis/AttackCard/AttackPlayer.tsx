import React from "react";

import { TeamPlayers } from "../../../api-client/api";
import { useCard } from "../../../hooks/card/use-cardController";
import PlayerSelect from "../PlayerSelect";

interface AttackPlayerProps {
  onCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

const AttackPlayer: React.FC<AttackPlayerProps> = ({
  onCourtPlayer,
  nextStep
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  return (
    <PlayerSelect
      type={currentTeam}
      onCourtPlayer={onCourtPlayer}
      title="アタック"
      subTitle="プレイヤーを選択してください"
      onClick={onClick}
    />
  );
};

export default AttackPlayer;
