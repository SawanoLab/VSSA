import React, { ChangeEvent, useState } from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import PlayerInfoDisplay from "./PlayerInfoDisplay";
import { useMatch } from "../../hooks/match/useMatch";

interface OnCourtSelectProps {
  type: "home" | "away";
  uniformImage: string;
  courtZoneName?: string;
  isSetter: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const OnCourtSelect: React.FC<OnCourtSelectProps> = ({
  type,
  uniformImage,
  courtZoneName,
  isSetter,
  register,
  errors,
}) => {
  const {
    togglePlayerOnCourt,
    getPlayers,
    setPlayerZoneCode,
  } = useMatch();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const players = getPlayers(type);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (selectedPlayer !== "") togglePlayerOnCourt(type, selectedPlayer);
    const selectedValue = e.target.value;
    setSelectedPlayer(selectedValue);
    courtZoneName && setPlayerZoneCode(type, selectedValue, courtZoneName);
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
          style={{ width: "70px", height: "80px" }}
        />
        <PlayerInfoDisplay
          selectedPlayer={selectedPlayer}
          players={players.map((player) => player.PlayerInfo)}
          isSetter={isSetter}
        />
        <select
          {...register(`${type}-${selectedPlayer}`, { required: true })}
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
        {errors[`${type}-${selectedPlayer}`] && (
          <p className="text-xs text-red-500">選手を選択してください。</p>
        )}
      </div>
    </td>
  );
};

export default OnCourtSelect;
