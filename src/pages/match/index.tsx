import React from "react";
import { useEffect, useState } from "react";

import LoadingSpinner from "../../composents/LoadingSpinner";
import { MatchIndexError } from "../../composents/match/index/MatchIndexError";
import { MatchIndexHeader } from "../../composents/match/index/MatchIndexHeader";
import { MatchList } from "../../composents/match/index/MatchList";
import { useMatch } from "../../hooks/match/useMatch";

const MatchIndex: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { matchError, matchLoading, setMatchError, fetchMatchs } = useMatch();

  useEffect(() => {
    fetchMatchs();
  }, []);

  useEffect(() => {
    if (!matchLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [matchLoading]);

  return (
    <div>
      <MatchIndexError matchError={matchError} setMatchError={setMatchError} />
      {loading ? <LoadingSpinner /> : null}
      <MatchIndexHeader />
      <div className=" bg-gray-200 p-4 border" />
      <MatchList />
    </div>
  );
};

export default MatchIndex;
