import React from "react";

import { TeamPlayers } from "../../../api-client/api";
import PlayerSelect from "../PlayerSelect";

interface AttackPlayerProps {
  type: "home" | "away";
  onCourtPlayer?: TeamPlayers[];
}

const AttackPlayer: React.FC<AttackPlayerProps> = ({
  type,
  onCourtPlayer,
}) => {
  return (
    <PlayerSelect
      type={type}
      onCourtPlayer={onCourtPlayer}
      title="アタック"
      subTitle="プレイヤーを選択してください"
    />
  );
};

export default AttackPlayer;
