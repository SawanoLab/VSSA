// PlayerSelection.tsx
import React, { ChangeEvent } from "react";
import { PlayerData } from "../../interface/player";

interface PlayerSelectionProps {
  teamPlayers: PlayerData[];
  selectedPlayers: string[];
  handleSelect: (
    e: ChangeEvent<HTMLSelectElement>,
    row: number,
    col: number
  ) => void;
  row: number;
  col: number;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  teamPlayers,
  selectedPlayers,
  handleSelect,
  row,
  col,
}) => (
  <div>
    <select
      onChange={(e) => handleSelect(e, row, col)}
      className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
    >
      <option value="" className="text-gray-500 text-sm">
        リベロを選択
      </option>
      {teamPlayers.map((player) => (
        <option
          className="text-gray-500 text-sm"
          key={player.uuid}
          value={player.uuid}
          disabled={selectedPlayers.includes(player.uuid)}
        >
          {player.name}
        </option>
      ))}
    </select>
  </div>
);

export default PlayerSelection;
