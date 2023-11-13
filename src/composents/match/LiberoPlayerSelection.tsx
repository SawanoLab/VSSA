import React, { ChangeEvent, useState } from "react";
import { useMatch } from "../../hooks/match/matchProvider";


interface LiberoPlayerSelectionProps {
  type: "home" | "away";
}

const LiberoPlayerSelection: React.FC<LiberoPlayerSelectionProps> = ({ type }) => {
  const { togglePlayerOnCourt, togglePlayerLibero, getPlayers } = useMatch();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const players = getPlayers(type);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // 前回の選手をコートから外す
    if (selectedPlayer !== "") {
      togglePlayerOnCourt(type, selectedPlayer);
      togglePlayerLibero(type, selectedPlayer);
    }
    setSelectedPlayer(selectedValue);
    if (selectedValue !== "") {
      togglePlayerOnCourt(type, selectedValue);
      togglePlayerLibero(type, selectedValue);
    }
  };

  return (
    <div>
      <select
        onChange={handleSelect}
      >
        <option value="" className="text-gray-500 text-sm">
          リベロを選択
        </option>
        {players.map((player) => (
          <option
            className="text-gray-500 text-sm"
            key={player.PlayerInfo.uuid}
            value={player.PlayerInfo.uuid}
            disabled={player.onCourt}
            >
            {player.PlayerInfo.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LiberoPlayerSelection;
