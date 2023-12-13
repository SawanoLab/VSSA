import React from "react";

import { TeamPlayers } from "../../../api-client/api";
import { useAttackHistory } from "../../../hooks/analysis/attack/use-attackHistory";
import { useCard } from "../../../hooks/card/use-cardController";
import PlayerSelect from "../PlayerSelect/PlayerSelect";

interface AttackPlayerProps {
  onCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

const AttackPlayer: React.FC<AttackPlayerProps> = ({
  onCourtPlayer,
  nextStep,
}) => {
  const { setAttackPlayer, setPlayerId } = useAttackHistory();
  const { currentTeam, setCurrentStep } = useCard();

  const onClick = (playerName: string, playerId: string) => {
    setCurrentStep(nextStep);
    setAttackPlayer(playerName);
    setPlayerId(playerId);
  }
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
