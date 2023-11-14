import { getPlayers } from "../../lib/api/api";
import { useAuth } from "../use-auth";
import React, {useEffect} from "react";
import { PlayerInfo } from "../../types/player";

export interface PlayerContextType {
  players: PlayerInfo[];
  addPlayer: (player: PlayerInfo) => void;
  setPlayers: (players: PlayerInfo[]) => void;
  setPlayersData: (players: PlayerInfo[]) => void;
  getTeamPlayers: (players: PlayerInfo[], team_id: string) => PlayerInfo[];
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
  const [players, setPlayers] = React.useState<PlayerInfo[]>([]);

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

  const addPlayer = (player: PlayerInfo) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }

  const setPlayersData = (players: PlayerInfo[]) => {
    setPlayers(players);
  }

  const getTeamPlayers = (players: PlayerInfo[], team_id: string) => {
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
