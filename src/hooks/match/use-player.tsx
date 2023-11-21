import React  from "react";

import { playerClient } from "../../lib/api/main";
import { PlayerInfo } from "../../types/player";
import { useAuth } from "../use-auth";

export interface PlayerContextType {
  players: PlayerInfo[];
  addPlayer: (player: PlayerInfo) => void;
  setPlayers: (players: PlayerInfo[]) => void;
  setPlayersData: (players: PlayerInfo[]) => void;
  getTeamPlayers: (players: PlayerInfo[], team_id: string) => PlayerInfo[];
  fetchPlayers: () => void;
  playerLoading: boolean;
}

const initialContextState: PlayerContextType = {
  players: [],
  addPlayer: () => [],
  setPlayers: () => [],
  setPlayersData: () => [],
  getTeamPlayers: () => [],
  fetchPlayers: () => [],
  playerLoading: true,
};

export const PlayerContext =
React.createContext<PlayerContextType>(initialContextState);

export const usePlayer = () => React.useContext(PlayerContext);

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { username } = useAuth();
  const [playerLoading, setLoading] = React.useState(true);
  const [players, setPlayers] = React.useState<PlayerInfo[]>([]);

  const addPlayer = (player: PlayerInfo) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }

  const setPlayersData = (players: PlayerInfo[]) => {
    setPlayers(players);
  }

  const getTeamPlayers = (players: PlayerInfo[], team_id: string) => {
    return players.filter((player) => player.team_id === team_id);
  }

  const formatPlayerData = (data: PlayerInfo[]) => {
    return data.map(({uuid, name, player_number, code, postion, weight = 0, height = 0, user_id, team_id, season_id}: PlayerInfo) => ({uuid, name, player_number, code, postion, weight, height, user_id, team_id, season_id})
  )};

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await playerClient.getPlayersPlayersGet(username);
      const data = response.data;
      setPlayersData(formatPlayerData(data));
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <PlayerContext.Provider value={{
      players,
      addPlayer,
      setPlayers,
      setPlayersData,
      getTeamPlayers,
      fetchPlayers,
      playerLoading,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
