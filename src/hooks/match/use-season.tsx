import React, { useEffect } from "react";
import { useAuth } from "../use-auth";
import { SeasonData } from "../../types/season";
import { getSeasons } from "../../lib/api/api";

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

const getInitialSeasonData = async (username: string) => {
  try {
    const data = await getSeasons(username);
    return data;
  } catch (error) {
    alert("Error fetching season data");
    return [];
  }
}

export default function SeasonProvider({ children }: any) {
  const { username } = useAuth();
  const [seasons, setSeasons] = React.useState<SeasonData[]>([]);

  useEffect(() => {
    if (!username) {
      return;
    }
    const fetchData = async () => {
      try {
        const seasonData = await getInitialSeasonData(username);
        setSeasons(seasonData);
      } catch (error) {
        alert("Error fetching season data");
      }
    };
    fetchData();
  }
    , [username]);
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
