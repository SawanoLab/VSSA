import React  from "react";

import { PlayerResponse } from "../../api-client/api";
import { playerClient } from "../../lib/api/main";
import { useAuth } from "../use-auth";

export interface PlayerContextType {
  players: PlayerResponse[];
  addPlayer: (player: PlayerResponse) => void;
  setPlayers: (players: PlayerResponse[]) => void;
  setPlayersData: (players: PlayerResponse[]) => void;
  getTeamPlayers: (players: PlayerResponse[], team_id: string) => PlayerResponse[];
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
  const [players, setPlayers] = React.useState<PlayerResponse[]>([]);

  const addPlayer = (player: PlayerResponse) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }

  const setPlayersData = (players: PlayerResponse[]) => {
    setPlayers(players);
  }

  const getTeamPlayers = (players: PlayerResponse[], team_id: string) => {
    return players.filter((player) => player.team_id === team_id);
  }

  const formatPlayerData = (data: PlayerResponse[]) => {
    return data.map(({uuid, name, player_number, code, postion, weight = 0, height = 0, user_id, team_id, season_id}: PlayerResponse) => ({uuid, name, player_number, code, postion, weight, height, user_id, team_id, season_id})
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
