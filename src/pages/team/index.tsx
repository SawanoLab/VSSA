import { useSeason } from "hooks/match/useSeason";
import React, { useEffect } from "react";

import LoadingSpinner from "../../components/LoadingSpinner";
import { TeamIndexHeader } from "../../components/team/TeamIndexHeader";
import { TeamList } from "../../components/team/TeamList";
import { TeamPageError } from "../../components/team/TeamPageError";
import { useTeam } from "../../hooks/match/useTeam";

const TeamIndex: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { seasonError, seasonLoading, setSeasonError, fetchSeasons } =
    useSeason();
  const { teamLoading, teamError, setTeamError, fetchTeams } = useTeam();

  useEffect(() => {
    fetchTeams();
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (!teamLoading && !seasonLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [teamLoading, seasonLoading]);

  return (
    <div>
      <TeamPageError
        seasonError={seasonError}
        teamError={teamError}
        setSeasonError={setSeasonError}
        setTeamError={setTeamError}
      />
      {loading ? <LoadingSpinner /> : null}
      <TeamIndexHeader />
      <div className=" bg-gray-200 h-0.5 p-4 border" />
      <TeamList />
    </div>
  );
};

export default TeamIndex;
