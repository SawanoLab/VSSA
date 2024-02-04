import React, { useEffect } from "react";

import { MatchCreateError } from "../../components/match/create/MatchCreateError";
import { MatchCreateLoading } from "../../components/match/create/MatchCreateLoading";
import { MatchForm } from "../../components/match/create/MatchForm";
import { usePlayer } from "../../hooks/match/usePlayer";
import { useSeason } from "../../hooks/match/useSeason";
import { useTeam } from "../../hooks/match/useTeam";

const MatchCreate: React.FC = () => {
  const { fetchPlayers } = usePlayer();
  const { fetchTeams } = useTeam();
  const { fetchSeasons } = useSeason();

  useEffect(() => {
    const fetchDatas = async () => {
      await Promise.all([fetchTeams(), fetchPlayers(), fetchSeasons()]);
    };
    fetchDatas();
  }, []);

  return (
    <div>
      <MatchCreateLoading />
      <MatchCreateError />
      <MatchForm />
    </div>
  );
};

export default MatchCreate;
