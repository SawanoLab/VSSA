import React from "react";

import { TeamPlayers } from "../../../api-client/api";
import { useCard } from "../../../hooks/card/use-cardController";
import PlayerSelect from "../PlayerSelect/PlayerSelect";

interface ReceptionPlayerProps {
  onCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

const ReceptionPlayer: React.FC<ReceptionPlayerProps> = ({
  onCourtPlayer,
  nextStep,
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  return (
    <PlayerSelect
      type={currentTeam}
      onCourtPlayer={onCourtPlayer}
      title="レセプション"
      subTitle="プレイヤーを選択してください"
      onClick={onClick}
    />
  );
};

export default ReceptionPlayer;
