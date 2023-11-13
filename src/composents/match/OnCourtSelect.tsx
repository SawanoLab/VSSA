import React, { ChangeEvent, useState } from "react";
import { useMatch } from "../../hooks/match/matchProvider";
import PlayerInfoDisplay from "./PlayerInfoDisplay";


interface OnCourtSelectProps {
  type: "home" | "away";
  uniformImage: string;
}

const OnCourtSelect: React.FC<OnCourtSelectProps> = ({ type, uniformImage }) => {
  const { togglePlayerOnCourt, getPlayers } = useMatch();
  const homePlayers = getPlayers(type);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // 前回の選手をコートから外す
    if (selectedPlayer !== "") {
      togglePlayerOnCourt(type, selectedPlayer);
    }
    setSelectedPlayer(selectedValue);
    if (selectedValue !== "") {
      togglePlayerOnCourt(type, selectedValue);
    }
  };

  return (
    <td style={{ width: "150px", height: "90px" }}>
      <div className="h-full flex flex-col justify-center items-center relative">
        <img
          src={uniformImage}
          alt="uniform"
          style={{ width: "55px", height: "55px" }}
        />
        <PlayerInfoDisplay selectedPlayer={selectedPlayer} players={
          homePlayers.map((player) => player.PlayerInfo)
        } />
        <select
          onChange={handleSelect}
          value={selectedPlayer}
        >
          <option value="">Select a player</option>
          {homePlayers.map((player) => (
            <option
              key={player.PlayerInfo.uuid}
              value={player.PlayerInfo.uuid}
              disabled={player.onCourt}
            >
              {player.PlayerInfo.name}
            </option>
          ))}
        </select>
      </div>
    </td>
  );
};

export default OnCourtSelect;
