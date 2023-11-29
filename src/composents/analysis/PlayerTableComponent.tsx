import React from "react";

import { PlayerInfo } from "../../api-client/api";

type PlayerTableComponentProps = {
  type: "home" | "away";
  team_zone_name: string[][];
  getPlayer: (
    team: "home" | "away",
    zone: string
  ) =>
    | PlayerInfo
    | {
        name: string;
        player_number: string;
      };
};
export const PlayerTableComponent: React.FC<PlayerTableComponentProps> = ({
  type,
  team_zone_name,
  getPlayer,
}) => {
  return (
    <div>
      {Array.from({ length: 2 }).map((_, row) => (
        <tr key={row} className="flex flex-row m-4">
          {Array.from({ length: 3 }).map((_, col) => (
            <div
              className="h-full flex flex-col justify-center items-center relative m-2"
              key={`${row}-${col}`}
            >
              {type === "home" ? (
                <img
                src="/uniform.png"
                alt="uniform"
                style={{ width: "65px", height: "70px" }}
                key={`${row}-${col}`}
                />
              ) : (
                <img
                src="/away_uniform.png"
                alt="away_uniform"
                style={{ width: "65px", height: "70px" }}
                key={`${row}-${col}`}
                />
              )}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
                <div className="flex flex-row justify-center items-center">
                  <p className="text-2xl text-white bg-gray-500 border border-gray-500 rounded-full w-6 h-6 items-center justify-center flex">
                    {getPlayer(type, team_zone_name[row][col]).player_number}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </tr>
      ))}
    </div>
  );
};
