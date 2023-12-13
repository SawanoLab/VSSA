import React from "react";

import { TeamPlayers } from "../../../api-client/api";
import {
  home_team_zone_name_column,
  away_team_zone_name_column,
} from "../../../types/team_zone_name_column";
import PlayCardLayout from "../PlayCardLayout";

interface PlayerSelectProps {
  type: "home" | "away";
  onCourtPlayer?: TeamPlayers[];
  title: string;
  subTitle: string;
  onClick?: (
    player_name: string,
    player_id: string
  ) => void;
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({
  type,
  onCourtPlayer,
  title,
  subTitle,
  onClick,
}) => {
  const findPlayer = (zoneCode: string) =>
    onCourtPlayer?.find((p) => p.zone_code === zoneCode);


  const handlePlayerClick = (x: number, y: number) => {
    const zoneCode = type === "home" ? home_team_zone_name_column[x][y] : away_team_zone_name_column[x][y];
    const player = findPlayer(zoneCode);
    if (player && onClick) {
      onClick(player.PlayerInfo.name, player.PlayerInfo.uuid);
    }
  };
  
  return (
    <PlayCardLayout title={title} subTitle={subTitle} type={type}>
      <div className="relative w-max h-50">
        {type === "home" ? (
          <img
            src="/volleyball-court3.jpg"
            alt="court"
            style={{ width: "280px" }}
          />
        ) : (
          <img
            src="/volleyball-court4.jpg"
            alt="court"
            style={{ width: "280px" }}
          />
        )}
        <div
          className="absolute left-0 w-full
        flex flex-row justify-center items-center"
          style={{ top: type === "home" ? 30 : 75 }}
        >
          <div>
            {Array.from(Array(2).keys()).map((x) => (
              <div key={`row-${x}`} className="flex justify-center">
                {Array.from(Array(3).keys()).map((y) => (
                  <div
                    onClick={() => handlePlayerClick(x, y)}
                    key={`button-${x}-${y}`}
                    className="m-1"
                    style={{
                      position: "relative",
                      width: "70px",
                      height: "90px",
                    }}
                  >
                    <img
                      src={
                        type === "home" ? "/uniform.png" : "/away_uniform.png"
                      }
                      alt="away_uniform"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {type === "home"
                        ? findPlayer(home_team_zone_name_column[x][y])
                            ?.PlayerInfo.player_number
                        : findPlayer(away_team_zone_name_column[x][y])
                            ?.PlayerInfo.player_number}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PlayCardLayout>
  );
};

export default PlayerSelect;
