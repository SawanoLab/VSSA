import React  from "react";

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
  addPlayer: () => [],
  setPlayers: () => [],
  setPlayersData: () => [],
  getTeamPlayers: () => []
};

export const PlayerContext =
React.createContext<PlayerContextType>(initialContextState);

export const usePlayer = () => React.useContext(PlayerContext);

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
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
