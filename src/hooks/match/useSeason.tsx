import React from "react";

import { SeasonResponse, SeasonBase } from "../../api-client/api";
import { seasonClient } from "../../lib/api/main";
import { useAuth } from "../use-auth";

interface SeasonNames {
  uuid: string;
  season_name: string;
}

export interface SeasonContextType {
  seasons: SeasonResponse[];
  seasonLoading: boolean;
  seasonError: string | null;
  setSeasonError: (error: string | null) => void;
  addSeason: (season: SeasonResponse) => void;
  setSeasons: (seasons: SeasonResponse[]) => void;
  setSeasonsData: (seasons: SeasonResponse[]) => void;
  getSeasonNames: (seasons: SeasonResponse[]) => SeasonNames[];
  fetchSeasons: () => void;
  deleteSeasons: (seasonUuid: string) => void;
  postSeasons: (season: SeasonBase) => void;
}

const initialContextState: SeasonContextType = {
  seasons: [],
  seasonLoading: true,
  seasonError: null,
  setSeasonError: () => {
    return;
  },
  addSeason: () => {
    return;
  },
  setSeasons: () => {
    return;
  },
  setSeasonsData: () => {
    return;
  },
  getSeasonNames: () => [],
  fetchSeasons: () => {
    return;
  },
  deleteSeasons: () => {
    return;
  },
  postSeasons: () => {
    return;
  },
};

export const SeasonContext =
  React.createContext<SeasonContextType>(initialContextState);

export const useSeason = () => React.useContext(SeasonContext);

export default function SeasonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = useAuth();
  const [seasonLoading, setLoading] = React.useState(true);
  const [seasons, setSeasons] = React.useState<SeasonResponse[]>([]);
  const [seasonError, setSeasonError] = React.useState<string | null>(null);

  const addSeason = (season: SeasonResponse) => {
    setSeasons((prevSeasons) => [...prevSeasons, season]);
  };

  const setSeasonsData = (seasons: SeasonResponse[]) => {
    setSeasons(seasons);
  };

  const getSeasonNames = (seasons: SeasonResponse[]) => {
    return seasons.map((season) => {
      return {
        uuid: season.uuid,
        season_name: season.season_name,
      };
    });
  };

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
      await seasonClient.deleteSeasonSeasonsSeasonIdDelete(
        seasonUuid,
        username
      );
    } catch (error) {
      setSeasonError("シーズンの削除中にエラーが発生しました");
    }
  };

  const postSeasons = async (season: SeasonBase) => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await seasonClient.createSeasonSeasonsPost(
        season
      );
      const data = response.data;
      setSeasonsData(
        seasons.concat({
          ...data,
          season_name: season.season_name,
          game_format: season.game_format,
          code: season.code,
          start_day: season.start_day,
          end_day: season.end_day,
          user_id: season.user_id,
        })
      );
    } catch (error) {
      setSeasonError("シーズンの作成中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeasonContext.Provider
      value={{
        seasons,
        seasonLoading,
        seasonError,
        setSeasonError,
        addSeason,
        setSeasons,
        setSeasonsData,
        getSeasonNames,
        fetchSeasons,
        deleteSeasons,
        postSeasons,
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
}
