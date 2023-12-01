import React from "react";

import { TeamPlayers } from "../../../api-client/api";
import PlayerSelect from "../PlayerSelect";

interface ReceptionPlayerProps {
  type: "home" | "away";
  onCourtPlayer?: TeamPlayers[];
}

const ReceptionPlayer: React.FC<ReceptionPlayerProps> = ({
  type,
  onCourtPlayer,
}) => {
  return (
    <PlayerSelect
      type={type}
      onCourtPlayer={onCourtPlayer}
      title="レセプション"
      subTitle="プレイヤーを選択してください"
    />
  );
};

export default ReceptionPlayer;
