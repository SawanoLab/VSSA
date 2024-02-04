import { TeamPlayers } from "api-client";
import React, { FunctionComponent } from "react";
import {
  away_team_zone_name_column,
  home_team_zone_name_column,
} from "types/team_zone_name_column";

interface ShowPlayerPropss {
  type: "home" | "away";
  width?: number;
  height?: number;
  onCourtPlayer?: TeamPlayers[];
  onClick?: (player_name: string, player_id: string) => void;
}
export const ShowPlayers: FunctionComponent<ShowPlayerPropss> = ({
  type,
  width = 280,
  height = 180,
  onCourtPlayer,
  onClick,
}) => {
  const [selectedPlayer, setSelectedPlayer] = React.useState<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });
  const row_num = 2;
  const column_num = 3;

  const button_width = width / column_num;
  const button_height = height / row_num;

  const handlePlayerClick = (x: number, y: number) => {
    setClickedPlayer(x, y);
    setSelectedPlayer({ x, y });
  };

  const setClickedPlayer = (x: number, y: number) => {
    const zoneCode =
      type === "home"
        ? home_team_zone_name_column[x][y]
        : away_team_zone_name_column[x][y];
    const player = findPlayer(zoneCode);
    if (player && onClick) {
      onClick(player.PlayerInfo.name, player.PlayerInfo.uuid);
    }
  };

  const findPlayer = (zoneCode: string) =>
    onCourtPlayer?.find((p) => p.zone_code === zoneCode);

  const isPlayerSelected = (x: number, y: number) =>
    selectedPlayer.x === x && selectedPlayer.y === y;

  const showUniform = (type: "home" | "away") => {
    const uniform = type === "home" ? "/uniform.png" : "/away_uniform.png";
    return uniform;
  };

  return (
    <div>
      {Array.from(Array(row_num).keys()).map((x) => (
        <div key={`row-${x}`} className="flex justify-center">
          {Array.from(Array(column_num).keys()).map((y) => (
            <div
              onClick={() => {
                handlePlayerClick(x, y);
              }}
              key={`button-${x}-${y}`}
              style={{
                width: button_width + "px",
                height: button_height + "px",
              }}
              className={`m-1 relative ${
                isPlayerSelected(x, y) ? "bg-blue-500" : ""
              }`}
            >
              <img
                src={showUniform(type)}
                alt="uniform"
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
                  ? findPlayer(home_team_zone_name_column[x][y])?.PlayerInfo
                      .player_number
                  : findPlayer(away_team_zone_name_column[x][y])?.PlayerInfo
                      .player_number}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
