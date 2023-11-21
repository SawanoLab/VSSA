import React from "react";

import { seasonClient } from "../../lib/api/main";
import { SeasonData } from "../../types/season";
import { useAuth } from "../use-auth";


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
  fetchSeasons: () => void;
  seasonLoading: boolean;
}

// Set initial context state
const initialContextState: SeasonContextType = {
  seasons: [],
  addSeason: () => {
    return
  },
  setSeasons: () => {
    return
  },
  setSeasonsData: () => {
    return
  },
  getSeasonNames: () => [],
  fetchSeasons: () => {
    return
  },
  seasonLoading: true,
};

export const SeasonContext =
  React.createContext<SeasonContextType>(initialContextState);

export const useSeason = () => React.useContext(SeasonContext);

export default function SeasonProvider({ children }: { children: React.ReactNode }) {
  const { username } = useAuth();
  const [seasonLoading, setLoading] = React.useState(true);
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

  const fetchSeasons = async () => {
    setLoading(true);
    try {
      const response = await seasonClient.getSeasonsSeasonsGet(username);
      const data = response.data;
      setSeasonsData(data);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeasonContext.Provider value={{
      seasons,
      seasonLoading,
      addSeason,
      setSeasons,
      setSeasonsData,
      getSeasonNames,
      fetchSeasons,
    }}>
      {children}
    </SeasonContext.Provider>
  );
}
