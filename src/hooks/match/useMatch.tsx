import { matchClient } from "lib/api/main";
import React, { createContext, useContext, useState, ReactNode } from "react";

import { MatchResponse, TeamPlayers, TeamRequest } from "../../api-client/api";
import { PlayerResponse, MatchPostRequest } from "../../api-client/api";
import { Players, SetterPositionName } from "../../types/player";

type MatchContextType = {
  matchs: MatchResponse[];
  match: MatchResponse;
  matchLoading: boolean;
  matchError: string | null;
  setMatchs: (matchs: MatchResponse[]) => void;
  setMatch: (match: MatchResponse) => void;
  setMatchError: (error: string | null) => void;
  setTeamPlayer: (
    teamType: "home" | "away",
    teamName: string,
    players: PlayerResponse[]
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
  getOnCourtPlayers: (teamType: "home" | "away") => TeamPlayers[];
  getOffCourtPlayers: (teamType: "home" | "away") => TeamPlayers[];
  getPlayer: (teamType: "home" | "away", playerUUID: string) => TeamPlayers;
  getPlayers: (teamType: "home" | "away") => TeamPlayers[];
  getAllPlayers: () => TeamPlayers[];
  resetTeamInfo: (teamType: "home" | "away") => void;
  postMatch: (matchPostRequest: MatchPostRequest) => void;
  fetchMatch: (matchId: string) => Promise<MatchResponse | undefined>;
  fetchMatchs: () => Promise<MatchResponse[] | undefined>;
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

const initialTeam: TeamRequest = {
  uuid: "",
  team_name: "",
  players: {},
  setter_postion: SetterPositionName.Z1,
};

const initialMatch: MatchResponse = {
  uuid: "",
  home_team: { ...initialTeam },
  away_team: { ...initialTeam },
  season_name: "",
  youtube_url: "",
};

const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  const [matchs, setMatchs] = useState<MatchResponse[]>([]);
  const [match, setMatch] = useState<MatchResponse>(initialMatch);
  const [matchLoading, setLoading] = useState(true);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [homeSetterPosition, setHomeSetterPosition] =
    useState<SetterPositionName>(SetterPositionName.Z1);
  const [awaySetterPosition, setAwaySetterPosition] =
    useState<SetterPositionName>(SetterPositionName.Z1);

  const setSetterPosition = (
    teamType: "home" | "away",
    setterPosition: SetterPositionName
  ) => {
    if (teamType === "home") {
      setHomeSetterPosition(setterPosition);
    } else {
      setAwaySetterPosition(setterPosition);
    }
  };

  const setTeamPlayer = (
    teamType: "home" | "away",
    teamName: string,
    players: PlayerResponse[]
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
            // setter: false,
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

  // const setSetterPosition = (
  //   teamType: "home" | "away",
  //   setterPosition: SetterPositionName
  // ) => {
  //   setMatch((prevMatch) => ({
  //     ...prevMatch,
  //     [`${teamType}_team`]: {
  //       ...prevMatch[`${teamType}_team`],
  //       setter_position: setterPosition,
  //     },
  //   }));
  // };

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
  };

  // const getSetterPosition = (teamType: "home" | "away") =>
  //  match[`${teamType}_team`].setter_postion;
  const getSetterPosition = (teamType: "home" | "away") => {
    if (teamType === "home") {
      return homeSetterPosition;
    } else {
      return awaySetterPosition;
    }
  };
  const getPlayersByCourtStatus = (
    teamType: "home" | "away",
    onCourt: boolean
  ) =>
    Object.values(match[`${teamType}_team`].players).filter(
      (player) => player.onCourt === onCourt
    );

  const getOnCourtPlayers = (teamType: "home" | "away") =>
    getPlayersByCourtStatus(teamType, true);
  const getOffCourtPlayers = (teamType: "home" | "away") =>
    getPlayersByCourtStatus(teamType, false);
  const getPlayer = (teamType: "home" | "away", playerUUID: string) =>
    match[`${teamType}_team`].players[playerUUID];
  const getPlayers = (teamType: "home" | "away") =>
    Object.values(match[`${teamType}_team`].players);
  const getAllPlayers = () => getPlayers("home").concat(getPlayers("away"));

  const resetTeamInfo = (teamType: "home" | "away") => {
    setMatch((prevMatch) => {
      const updatedMatch = {
        ...prevMatch,
        [`${teamType}_team`]: {
          ...initialTeam,
        },
      };
      return updatedMatch;
    });
  };

  const postMatch = async (matchPostRequest: MatchPostRequest) => {
    setLoading(true);
    try {
      await matchClient.createMatchApiV1MatchesPost(matchPostRequest);
    } catch (error) {
      setMatchError("試合データの登録にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const fetchMatch = async (matchId: string) => {
    if (!matchId) {
      return undefined;
    }
    setLoading(true);
    try {
      const response =
        await matchClient.getMatchApiV1MatchesMatchIdGet(matchId);
      setMatch(response.data);
      if (!response.data || response.data === undefined) {
        setMatchError("試合データが存在しません");
        return undefined;
      }
      return response.data;
    } catch (error) {
      setMatchError("試合データの取得にエラーが発生しました");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchs = async () => {
    setLoading(true);
    try {
      const response = await matchClient.getMatchesApiV1MatchesGet();
      setMatchs(response.data);
      if (!response.data || response.data === undefined) {
        setMatchError("試合データが存在しません");
        return undefined;
      }
      return response.data;
    } catch (error) {
      setMatchError("試合データの取得にエラーが発生しました");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: MatchContextType = {
    matchs,
    match,
    matchLoading,
    matchError,
    setMatchs,
    setMatch,
    setMatchError,
    getOnCourtPlayers,
    getOffCourtPlayers,
    getPlayer: getPlayer,
    getPlayers: getPlayers,
    setTeamPlayer,
    setSetterPosition,
    setPlayerZoneCode,
    getSetterPosition,
    getAllPlayers,
    togglePlayerOnCourt,
    togglePlayerLibero,
    resetTeamInfo,
    postMatch,
    fetchMatch,
    fetchMatchs,
  };

  return (
    <MatchContext.Provider value={contextValue}>
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;
