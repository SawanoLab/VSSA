import React from "react";
import { PlayerInfo } from "../../types/player";

interface PlayerInfoDisplayProps {
  selectedPlayer: string;
  players: PlayerInfo[];
  isSetter: boolean;
}

const PlayerInfoDisplay: React.FC<PlayerInfoDisplayProps> = ({ selectedPlayer, players, isSetter}) => {
  const selectedPlayerInfo = players.find((player) => player.uuid === selectedPlayer);

  return (
    <div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
        <div className="flex flex-row justify-center items-center">
          {selectedPlayer !== "" && (
            <p className="text-2xl text-gray-500 m-2 bg-white">
              {selectedPlayerInfo?.player_number}
            </p>
            )}
        {isSetter && (
          <p className="text-2xl text-white bg-green-500 border border-gray-500 rounded-full w-6 h-6 items-center justify-center flex">
            S
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoDisplay;
