import React, { useEffect, useState } from "react";

import LoadingSpinner from "../../components/LoadingSpinner";
import { SeasonHeader } from "../../components/season/SeasonHeader";
import { SeasonList } from "../../components/season/SeasonList";
import { SeasonPageError } from "../../components/season/SeasonPageError";
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
