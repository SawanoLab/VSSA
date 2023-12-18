import React, { useEffect, useState } from "react";

import { SeasonHeader } from "./SeasonHeader";
import { SeasonList } from "./SeasonList";
import { SeasonPageError } from "./SeasonPageError";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useSeason } from "../../hooks/match/useSeason";

const SeasonIndex: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { seasonError, seasonLoading, setSeasonError, fetchSeasons } =
    useSeason();

  useEffect(() => {
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (!seasonLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [seasonLoading]);

  return (
    <div>
      <SeasonPageError
        seasonError={seasonError}
        setSeasonError={setSeasonError}
      />
      {loading ? <LoadingSpinner /> : null}
      <SeasonHeader />
      <div className=" bg-gray-200 p-4 border" />
      <SeasonList />
    </div>
  );
};

export default SeasonIndex;
