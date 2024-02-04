import React from "react";

import { TeamPlayers } from "../../../../api-client/api";
import { useCard } from "../../../../hooks/card/useCardController";
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
      onClick={onClick}
    />
  );
};

export default ReceptionPlayer;
