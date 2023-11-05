import React from "react";

interface SeasonsData {
  uuid: string;
  start_day: string;
  end_day: string;
  season_name: string;
  game_format: string;
}

interface SeasonNames {
  uuid: string;
  season_name: string;
}

export interface SeasonContextType {
  seasons: SeasonsData[];
  addSeason: (season: SeasonsData) => void;
  setSeasons: (seasons: SeasonsData[]) => void;
  setSeasonsData: (seasons: SeasonsData[]) => void;
  getSeasonNames: (seasons: SeasonsData[]) => SeasonNames[];
}

// Set initial context state
const initialContextState: SeasonContextType = {
  seasons: [],
  addSeason: () => {},
  setSeasons: () => {},
  setSeasonsData: () => {},
  getSeasonNames: () => []
};

export const SeasonContext = React.createContext<SeasonContextType>(initialContextState);

export const useSeason = () => React.useContext(SeasonContext);

export default function SeasonProvider({ children }: any) {
  const [seasons, setSeasons] = React.useState<SeasonsData[]>([]);

  const addSeason = (season: SeasonsData) => {
    setSeasons((prevSeasons) => [...prevSeasons, season]);
  }

  const setSeason = (season: SeasonsData) => {
    setSeasons([season]);
  }

  const setSeasonsData = (seasons: SeasonsData[]) => {
    setSeasons(seasons);
  }

  const getSeasonNames = (seasons: SeasonsData[]) => {
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
