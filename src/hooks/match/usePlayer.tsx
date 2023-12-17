import React  from "react";

import { PlayerGet } from "../../api-client/api";
import { playerClient } from "../../lib/api/main";
import { useAuth } from "../use-auth";

export interface PlayerContextType {
  players: PlayerGet[];
  addPlayer: (player: PlayerGet) => void;
  setPlayers: (players: PlayerGet[]) => void;
  setPlayersData: (players: PlayerGet[]) => void;
  getTeamPlayers: (players: PlayerGet[], team_id: string) => PlayerGet[];
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
  const [players, setPlayers] = React.useState<PlayerGet[]>([]);

  const addPlayer = (player: PlayerGet) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }

  const setPlayersData = (players: PlayerGet[]) => {
    setPlayers(players);
  }

  const getTeamPlayers = (players: PlayerGet[], team_id: string) => {
    return players.filter((player) => player.team_id === team_id);
  }

  const formatPlayerData = (data: PlayerGet[]) => {
    return data.map(({uuid, name, player_number, code, postion, weight = 0, height = 0, user_id, team_id, season_id}: PlayerGet) => ({uuid, name, player_number, code, postion, weight, height, user_id, team_id, season_id})
  )};

  const fetchPlayers = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await playerClient.getPlayersPlayersGet(username);
      const data = response.data;
      setPlayersData(formatPlayerData(data));
    } catch (error) {
      console.error("選手データの取得中にエラーが発生しました:", error);
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
