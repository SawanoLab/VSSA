import React from "react";

import { TeamPlayers } from "../../../../api-client/api";
import PlayerSelect from "../PlayerSelect/PlayerSelect";

interface SetPlayerProps {
  type: "home" | "away";
  onCourtPlayer?: TeamPlayers[];
}

const SetPlayer: React.FC<SetPlayerProps> = ({ type, onCourtPlayer }) => {
  return (
    <PlayerSelect
      type={type}
      onCourtPlayer={onCourtPlayer}
    />
  );
};

export default SetPlayer;
