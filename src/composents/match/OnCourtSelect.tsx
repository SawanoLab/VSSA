import React, { ChangeEvent, useState } from "react";

import PlayerInfoDisplay from "./PlayerInfoDisplay";
import { useMatch } from "../../hooks/match/matchProvider";
import { SetterPositionName } from "../../types/player";


interface OnCourtSelectProps {
  type: "home" | "away";
  uniformImage: string;
  courtZoneName?: SetterPositionName;
  isSetter: boolean;
}

const OnCourtSelect: React.FC<OnCourtSelectProps> = ({ type, uniformImage, courtZoneName, isSetter }) => {
  const { togglePlayerOnCourt, getPlayers, setPlayerZoneCode } = useMatch();
  const [ selectedPlayer, setSelectedPlayer ] = useState<string>('');
  const players = getPlayers(type);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log("selectedValue", selectedValue);
    setSelectedPlayer(selectedValue);
    courtZoneName && setPlayerZoneCode(type, selectedValue, courtZoneName);
    if (selectedValue !== "") {
      togglePlayerOnCourt(type, selectedValue);
    }
  };

  return (
    <td style={{ width: "150px", height: "90px" }}>
      <div className="h-full flex flex-col justify-center items-center relative">
        <img src={uniformImage} alt="uniform" style={{ width: "70px", height: "70px" }} />
        <PlayerInfoDisplay
          selectedPlayer={selectedPlayer}
          players={players.map((player) => player.PlayerInfo)}
          isSetter={isSetter}
        />
        <select
          onChange={handleSelect}
          value={selectedPlayer}
          className="mt-2 text-sm"
        >
          <option value="">選手を選択</option>
          {players.map((player) => (
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
