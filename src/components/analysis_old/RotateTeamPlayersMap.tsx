import React from "react";

import { PlayersMap } from "./PlayersMap";
import { TeamPlayers } from "../../api-client/api";

interface RotationButtonProps {
  type: "home" | "away";
  lotationClick: (team: "home" | "away") => void;
}

const RotationButton: React.FC<RotationButtonProps> = ({
  type,
  lotationClick,
}) => {
  return (
    <button
      style={{ width: "300px", height: "50px" }}
      className="
  bg-gray-200
  text-gray-700
  hover:bg-gray-300
  font-bold py-2 px-4 rounded"
      onClick={() => lotationClick(type)}
    >
      次のローテーション
    </button>
  );
};

interface RotateTeamPlayersMapProps {
  homeOnCourtPlayer: TeamPlayers[];
  awayOnCourtPlayer: TeamPlayers[];
  setHomeOnCourtPlayer: React.Dispatch<React.SetStateAction<TeamPlayers[]>>;
  setAwayOnCourtPlayer: React.Dispatch<React.SetStateAction<TeamPlayers[]>>;
}

export const RotateTeamPlayersMap: React.FC<RotateTeamPlayersMapProps> = ({
  homeOnCourtPlayer,
  awayOnCourtPlayer,
  setHomeOnCourtPlayer,
  setAwayOnCourtPlayer,
}) => {
  const rotateTeamPlayers = (players: TeamPlayers[]) => {
    const zoneCodes = ["Z1", "Z2", "Z3", "Z6", "Z5", "Z4"];
    const getNextZone = (currentZone: string) => {
      const currentIndex = zoneCodes.indexOf(currentZone);
      return currentIndex >= 0
        ? zoneCodes[(currentIndex + 1) % zoneCodes.length]
        : currentZone;
    };

    return players.map((player) => ({
      ...player,
      zone_code: getNextZone(player.zone_code || ""),
    }));
  };

  const teamLotationClick = (team: "home" | "away") => {
    const updatedPlayers = rotateTeamPlayers(
      team === "home" ? homeOnCourtPlayer : awayOnCourtPlayer
    );
    if (team === "home") {
      setHomeOnCourtPlayer(updatedPlayers);
    } else {
      setAwayOnCourtPlayer(updatedPlayers);
    }
  };
  return (
    <div className="flex flex-col">
      <RotationButton type="home" lotationClick={teamLotationClick} />
      <PlayersMap
        homeOnCourtPlayer={homeOnCourtPlayer}
        awayOnCourtPlayer={awayOnCourtPlayer}
      />
      <RotationButton type="away" lotationClick={teamLotationClick} />
    </div>
  );
};
