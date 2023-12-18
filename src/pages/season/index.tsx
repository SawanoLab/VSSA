import React, { useEffect, useState } from "react";

import LoadingSpinner from "../../composents/LoadingSpinner";
import { SeasonHeader } from "../../composents/season/SeasonHeader";
import { SeasonList } from "../../composents/season/SeasonList";
import { SeasonPageError } from "../../composents/season/SeasonPageError";
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
