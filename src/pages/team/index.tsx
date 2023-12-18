import { useSeason } from "hooks/match/useSeason";
import React, { useEffect } from "react";

import LoadingSpinner from "../../composents/LoadingSpinner";
import { TeamIndexHeader } from "../../composents/team/TeamIndexHeader";
import { TeamList } from "../../composents/team/TeamList";
import { TeamPageError } from "../../composents/team/TeamPageError";
import { useTeam } from "../../hooks/match/useTeam";

const TeamIndex: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { seasonError, seasonLoading, setSeasonError, fetchSeasons } =
    useSeason();
  const { teamLoading, teamError, setTeamError, fetchTeams } = useTeam();
  // const [isNewModalOpen, setNewModalOpen] = React.useState(false);

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
