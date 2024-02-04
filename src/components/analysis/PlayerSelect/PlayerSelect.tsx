import { TeamPlayers } from "api-client";
import React from "react";

import { ShowCourtImage } from "./ShowCourtImage";
import { ShowPlayers } from "./ShowPlayers";

interface PlayerSelectProps {
  type: "home" | "away";
  onCourtPlayer?: TeamPlayers[];
  onClick?: (player_name: string, player_id: string) => void;
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({
  type,
  onCourtPlayer,
  onClick,
}) => {
  const court_width = 200;
  const player_width = court_width * 0.7;
  const player_height = player_width * 1;
  return (
    <div className="relative w-max">
      <ShowCourtImage type={type} width={court_width} />
      <div
        className="absolute left-0 w-full flex flex-row justify-center items-center"
        style={{ top: type === "home" ? 30 : 75 }}
      >
        <ShowPlayers
          type={type}
          width={player_width}
          height={player_height}
          onCourtPlayer={onCourtPlayer}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default PlayerSelect;
