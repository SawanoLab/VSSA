import React from "react";

import { PlayerGet } from "../../api-client/api";

interface PlayerInfoDisplayProps {
  selectedPlayer: string;
  players: PlayerGet[];
  isSetter: boolean;
}

const PlayerInfoDisplay: React.FC<PlayerInfoDisplayProps> = ({ selectedPlayer, players, isSetter}) => {
  const selectedPlayerInfo = players.find((player) => player.uuid === selectedPlayer);

  return (
    <div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
        <div className="flex flex-row justify-center items-center">
          {selectedPlayer !== "" && (
            <p className="text-2xl text-white bg-gray-500 border border-gray-500 rounded-full w-6 h-6 items-center justify-center flex">
              {selectedPlayerInfo?.player_number}
            </p>
            )}
        </div>
      </div>

      <div className="absolute top-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
        {isSetter && (
          <p className="text-2xl text-white bg-green-500 border border-gray-500 rounded-full w-6 h-6 items-center justify-center flex">
            S
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerInfoDisplay;
