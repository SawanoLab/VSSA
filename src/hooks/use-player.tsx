import { getPlayers } from "../lib/api/api";
import { useAuth } from "../hooks/use-auth";
import React, {useEffect} from "react";
import { PlayerData } from "../interface/player";

export interface PlayerContextType {
  players: PlayerData[];
  addPlayer: (player: PlayerData) => void;
  setPlayers: (players: PlayerData[]) => void;
  setPlayersData: (players: PlayerData[]) => void;
  getTeamPlayers: (players: PlayerData[], team_id: string) => PlayerData[];
}

const initialContextState: PlayerContextType = {
  players: [],
  addPlayer: () => {},
  setPlayers: () => {},
  setPlayersData: () => {},
  getTeamPlayers: () => []
};


export const PlayerContext =
React.createContext<PlayerContextType>(initialContextState);

export const usePlayer = () => React.useContext(PlayerContext);

const getInitialPlayerData = async (username: string) => {
  try {
    const data = await getPlayers(username);    
    return data;
  } catch (error) {
    // エラーハンドリングを行うか、適切な処理を行ってください
    console.error("Error fetching player data", error);
    return [];
  }
}

export default function PlayerProvider({ children }: any) {
  const { username } = useAuth();
  const [players, setPlayers] = React.useState<PlayerData[]>([]);

  useEffect(() => {
    if (!username) {
      return;
    }
    const fetchData = async () => {
      try {
        const playerData = await getInitialPlayerData(username);
        setPlayers(playerData);
      } catch (error) {
        alert("Error fetching player data");
      }
    };
    fetchData();
  }, [username]);

  const addPlayer = (player: PlayerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }

  const setPlayersData = (players: PlayerData[]) => {
    setPlayers(players);
  }

  const getTeamPlayers = (players: PlayerData[], team_id: string) => {
    return players.filter((player) => player.team_id === team_id);
  }

  return (
    <PlayerContext.Provider value={{
      players,
      addPlayer,
      setPlayers,
      setPlayersData,
      getTeamPlayers
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
