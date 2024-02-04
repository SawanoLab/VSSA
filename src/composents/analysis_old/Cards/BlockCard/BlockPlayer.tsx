import React from "react";

import { TeamPlayers } from "../../../../api-client/api";
import { useCard } from "../../../../hooks/card/useCardController";
import PlayerSelect from "../PlayerSelect/PlayerSelect";

interface BlockPlayerProps {
  onCourtPlayer?: TeamPlayers[];
  nextStep: string;
}

const BlockPlayer: React.FC<BlockPlayerProps> = ({
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

export default BlockPlayer;
