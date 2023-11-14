import React from "react";
import { SeasonData } from "../../types/season";


interface SeasonNames {
  uuid: string;
  season_name: string;
}

export interface SeasonContextType {
  seasons: SeasonData[];
  addSeason: (season: SeasonData) => void;
  setSeasons: (seasons: SeasonData[]) => void;
  setSeasonsData: (seasons: SeasonData[]) => void;
  getSeasonNames: (seasons: SeasonData[]) => SeasonNames[];
}

// Set initial context state
const initialContextState: SeasonContextType = {
  seasons: [],
  addSeason: () => { },
  setSeasons: () => { },
  setSeasonsData: () => { },
  getSeasonNames: () => []
};

export const SeasonContext = React.createContext<SeasonContextType>(initialContextState);

export const useSeason = () => React.useContext(SeasonContext);

export default function SeasonProvider({ children }: any) {
  const [seasons, setSeasons] = React.useState<SeasonData[]>([]);

  const addSeason = (season: SeasonData) => {
    setSeasons((prevSeasons) => [...prevSeasons, season]);
  }

  const setSeasonsData = (seasons: SeasonData[]) => {
    setSeasons(seasons);
  }

  const getSeasonNames = (seasons: SeasonData[]) => {
    return seasons.map((season) => {
      return {
        uuid: season.uuid,
        season_name: season.season_name,
      };
    });
  }

  return (
    <SeasonContext.Provider value={{
      seasons,
      addSeason,
      setSeasons,
      setSeasonsData,
      getSeasonNames,
    }}>
      {children}
    </SeasonContext.Provider>
  );
}
