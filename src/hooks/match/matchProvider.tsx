import React, { createContext, useContext, useState, ReactNode } from "react";

import {
  PlayerInfo,
  Match,
  Players,
  Player,
  SetterPositionName,
} from "../../types/player";

type MatchContextType = {
  match: Match;
  setTeamPlayer: (
    teamType: "home" | "away",
    teamName: string,
    players: PlayerInfo[]
  ) => void;
  setSetterPosition: (
    teamType: "home" | "away",
    setterPosition: SetterPositionName
  ) => void;
  setPlayerZoneCode: (
    teamType: "home" | "away",
    playerUUID: string,
    zoneCode: string
  ) => void;
  getSetterPosition: (teamType: "home" | "away") => SetterPositionName;
  togglePlayerOnCourt: (teamType: "home" | "away", playerUUID: string) => void;
  togglePlayerLibero: (teamType: "home" | "away", playerUUID: string) => void;
  getOnCourtPlayers: (teamType: "home" | "away") => Player[];
  getOffCourtPlayers: (teamType: "home" | "away") => Player[];
  getPlayer: (teamType: "home" | "away", playerUUID: string) => Player;
  getPlayers: (teamType: "home" | "away") => Player[];
  resetTeamInfo: (teamType: "home" | "away") => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
};

type MatchProviderProps = {
  children: ReactNode;
};

const initialTeam = {
  uuid: "",
  team_name: "",
  players: {} as Players,
  setter_position: SetterPositionName.Z1,
};

const initialMatch: Match = {
  home_team: { ...initialTeam },
  away_team: { ...initialTeam },
};

const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  const [match, setMatch] = useState<Match>(initialMatch);

  const setTeamPlayer = (
    teamType: "home" | "away",
    teamName: string,
    players: PlayerInfo[]
  ) => {
    setMatch((prevMatch) => ({
      ...prevMatch,
      [`${teamType}_team`]: {
        team_name: teamName,
        players: players.reduce((acc, player) => {
          acc[player.uuid] = {
            PlayerInfo: player,
            onCourt: false,
            zone_code: "",
            setter: false,
            libero: false,
          };
          return acc;
        }, {} as Players),
        setter_position: SetterPositionName.Z3,
      },
    }));
  };

  const togglePlayerOnCourt = (
    teamType: "home" | "away",
    playerUUID: string
  ) => {
    setMatch((prevMatch) => {
      const updatedTeam = {
        ...prevMatch[`${teamType}_team`],
        players: {
          ...prevMatch[`${teamType}_team`].players,
          [playerUUID]: {
            ...prevMatch[`${teamType}_team`].players[playerUUID],
            onCourt: !prevMatch[`${teamType}_team`].players[playerUUID].onCourt,
          },
        },
      };
      return {
        ...prevMatch,
        [`${teamType}_team`]: updatedTeam,
      };
    });
  };

  const togglePlayerLibero = (
    teamType: "home" | "away",
    playerUUID: string
  ) => {
    setMatch((prevMatch) => {
      const updatedTeam = {
        ...prevMatch[`${teamType}_team`],
        players: {
          ...prevMatch[`${teamType}_team`].players,
          [playerUUID]: {
            ...prevMatch[`${teamType}_team`].players[playerUUID],
            libero: !prevMatch[`${teamType}_team`].players[playerUUID].libero,
          },
        },
      };
      return {
        ...prevMatch,
        [`${teamType}_team`]: updatedTeam,
      };
    });
  };

  const setSetterPosition = (
    teamType: "home" | "away",
    setterPosition: SetterPositionName
  ) => {
    setMatch((prevMatch) => ({
      ...prevMatch,
      [`${teamType}_team`]: {
        ...prevMatch[`${teamType}_team`],
        setter_position: setterPosition,
      },
    }));
  };

  const setPlayerZoneCode = (
    teamType: "home" | "away",
    playerUUID: string,
    zoneCode: string
  ) => {
    setMatch((prevMatch) => ({
      ...prevMatch,
      [`${teamType}_team`]: {
        ...prevMatch[`${teamType}_team`],
        players: {
          ...prevMatch[`${teamType}_team`].players,
          [playerUUID]: {
            ...prevMatch[`${teamType}_team`].players[playerUUID],
            zone_code: zoneCode,
          },
        },
      },
    }));
  }

  const getSetterPosition = (teamType: "home" | "away") =>
    match[`${teamType}_team`].setter_position;

  const getPlayersByCourtStatus = (teamType: 'home' | 'away', onCourt: boolean) =>
    Object.values(match[`${teamType}_team`].players).filter(player => player.onCourt === onCourt);

  const getOnCourtPlayers = (teamType: "home" | "away") =>
    getPlayersByCourtStatus(teamType, true);
  const getOffCourtPlayers = (teamType: "home" | "away") =>
    getPlayersByCourtStatus(teamType, false);
  const getPlayer = (teamType: "home" | "away", playerUUID: string) =>
    match[`${teamType}_team`].players[playerUUID];
  const getPlayers = (teamType: "home" | "away") =>
    Object.values(match[`${teamType}_team`].players);

    const resetTeamInfo = (teamType: "home" | "away") => {
      setMatch((prevMatch) => {
        const updatedMatch = {
          ...prevMatch,
          [`${teamType}_team`]: {
            ...initialTeam,
          },
        };
        console.log(teamType, updatedMatch[`${teamType}_team`]);
        return updatedMatch;
      });
    };

    
  const contextValue: MatchContextType = {
    match,
    getOnCourtPlayers,
    getOffCourtPlayers,
    getPlayer,
    getPlayers,
    setTeamPlayer,
    setSetterPosition,
    setPlayerZoneCode,
    getSetterPosition,
    togglePlayerOnCourt,
    togglePlayerLibero,
    resetTeamInfo,
  };

  return (
    <MatchContext.Provider value={contextValue}>
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;
