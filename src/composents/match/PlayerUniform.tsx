import React, { ChangeEvent } from 'react';
import { PlayerData } from "../../interface/player";

interface PlayerUniformProps {
  players: PlayerData[];
  selectedPlayers: string[];
  handleSelect: (e: ChangeEvent<HTMLSelectElement>, row: number, col: number) => void;
  playerBackNumber: number;
  uniformImage: string;
  row: number;
  col: number;
}

const PlayerUniform: React.FC<PlayerUniformProps> = ({ players, selectedPlayers, handleSelect, playerBackNumber, uniformImage, row, col }) => (
  <td style={{ width: "150px", height: "90px" }}>
    <div className="h-full flex flex-col justify-center items-center relative">
      <img
        src={uniformImage}
        alt="uniform"
        style={{ width: "55px", height: "55px" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
        {playerBackNumber}
      </div>
      <select onChange={(e) => handleSelect(e, row, col)}>
        <option value="">Select a player</option>
        {players.map((player) => (
          <option
            key={player.uuid}
            value={player.uuid}
            disabled={selectedPlayers.includes(player.uuid)}
          >
            {player.name}
          </option>
        ))}
      </select>
    </div>
  </td>
);

export default PlayerUniform;
