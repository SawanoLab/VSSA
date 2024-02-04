import React, { useEffect, useState } from "react";

import { usePlayer } from "../../../hooks/match/usePlayer";
import { useSeason } from "../../../hooks/match/useSeason";
import { useTeam } from "../../../hooks/match/useTeam";
import LoadingSpinner from "../../LoadingSpinner";

interface MatchCreateLoadingProps {}
export const MatchCreateLoading: React.FC<MatchCreateLoadingProps> = () => {
  const [loading, setLoading] = useState(true);
  const { teamLoading } = useTeam();
  const { playerLoading } = usePlayer();
  const { seasonLoading } = useSeason();

  useEffect(() => {
    if (!teamLoading && !playerLoading && !seasonLoading) {
      setLoading(false);
    }
  }, [teamLoading, playerLoading, seasonLoading]);
  return <div>{loading ? <LoadingSpinner /> : null}</div>;
};
