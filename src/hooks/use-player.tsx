import React from "react";

interface PlayerData {
  uuid: string;
  name: string;
  player_number: number;
  code: string;
  postion: string;
  weight: number;
  height: number;
  user_id: string;
  team_id: string;
  season_id: string;
}

export interface PlayerContextType {
  players: PlayerData[];
  addPlayer: (player: PlayerData) => void;
  setPlayers: (players: PlayerData[]) => void;
  setPlayersData: (players: PlayerData[]) => void;
}

const initialContextState: PlayerContextType = {
  players: [],
  addPlayer: () => {},
  setPlayers: () => {},
  setPlayersData: () => {},
};

export const PlayerContext =
  React.createContext<PlayerContextType>(initialContextState);

export const usePlayer = () => React.useContext(PlayerContext);

export default function PlayerProvider({ children }: any) {
  const [players, setPlayers] = React.useState<PlayerData[]>([]);

  const addPlayer = (player: PlayerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }

  const setPlayersData = (players: PlayerData[]) => {
    setPlayers(players);
  }

  return (
    <PlayerContext.Provider value={{ players, addPlayer, setPlayers, setPlayersData }}>
      {children}
    </PlayerContext.Provider>
  );
}
