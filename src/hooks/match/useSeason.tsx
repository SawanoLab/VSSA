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
  seasonLoading: boolean;
  seasonError: string|null;
  setSeasonError: (error: string|null) => void;
  addSeason: (season: SeasonData) => void;
  setSeasons: (seasons: SeasonData[]) => void;
  setSeasonsData: (seasons: SeasonData[]) => void;
  getSeasonNames: (seasons: SeasonData[]) => SeasonNames[];
  fetchSeasons: () => void;
  deleteSeasons: (seasonUuid: string) => void;
}

const initialContextState: SeasonContextType = {
  seasons: [],
  seasonLoading: true,
  seasonError: null,
  setSeasonError: () => {
    return
  },
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
  deleteSeasons: () => {
    return
  },
};

export const SeasonContext =
  React.createContext<SeasonContextType>(initialContextState);

export const useSeason = () => React.useContext(SeasonContext);

export default function SeasonProvider({ children }: { children: React.ReactNode }) {
  const { username } = useAuth();
  const [seasonLoading, setLoading] = React.useState(true);
  const [seasons, setSeasons] = React.useState<SeasonData[]>([]);
  const [seasonError, setSeasonError] = React.useState<string|null>(null);

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
    if (!username) return;
    setLoading(true);
    try {
      const response = await seasonClient.getSeasonsSeasonsGet(username);
      const data = response.data;
      setSeasonsData(data);
    } catch (error) {
      setSeasonError("シーズンデータの取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const deleteSeasons = async (seasonUuid: string) => {
    if (!username) return;
    try {
      await seasonClient.deleteSeasonSeasonsSeasonIdDelete(seasonUuid, username)
    } catch (error) {
      setSeasonError("シーズンの削除中にエラーが発生しました");
    }
  };

  return (
    <SeasonContext.Provider value={{
      seasons,
      seasonLoading,
      seasonError,
      setSeasonError,
      addSeason,
      setSeasons,
      setSeasonsData,
      getSeasonNames,
      fetchSeasons,
      deleteSeasons
    }}>
      {children}
    </SeasonContext.Provider>
  );
}
