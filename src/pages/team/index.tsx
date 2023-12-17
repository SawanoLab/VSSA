import { TeamGet } from "api-client";
import Modal from "composents/Modal";
import { useSeason } from "hooks/match/useSeason";
import React, { useEffect } from "react";
import ErrorMessage from "utility/ErrorMessage";

import TeamCreate from "./create";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Table from "../../composents/Table";
import { useTeam } from "../../hooks/match/useTeam";

const TeamIndex: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { seasons, seasonError, seasonLoading, setSeasonError, fetchSeasons } =
    useSeason();
  const {
    teams,
    teamLoading,
    teamError,
    setTeamError,
    fetchTeams,
    createTeams,
    deleteTeam,
  } = useTeam();
  const [isNewModalOpen, setNewModalOpen] = React.useState(false);

  const fetchSeasonData = async () => {
    fetchSeasons();
  };

  useEffect(() => {
    fetchTeams();
    fetchSeasonData();
  }, []);

  useEffect(() => {
    if (!teamLoading && !seasonLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [teamLoading, seasonLoading]);

  const header = [{ header: "名称", accessor: "name" }];

  const handleCreateClick = (data: TeamGet) => {
    createTeams(data);
    setNewModalOpen(false);
    fetchTeams();
  };

  const handleDeleteClick = (teamId: string) => {
    deleteTeam(teamId);
  };

  const handleEditClick = () => {
    console.log("edit");
  };

  return (
    <div>
      {seasonError ? (
        <ErrorMessage
          message={seasonError}
          clearError={() => setSeasonError("")}
        />
      ) : null}
      {teamError ? (
        <ErrorMessage message={teamError} clearError={() => setTeamError("")} />
      ) : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">チーム</h1>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
          onClick={() => setNewModalOpen(true)}
        >
          新しいチーム
        </button>
      </div>
      <div className=" bg-gray-200 h-0.5 p-4 border" />
      <Table
        data={teams}
        columns={header}
        hover={true}
        deleteButton={handleDeleteClick}
        editButton={handleEditClick}
      />
      {isNewModalOpen && (
        <Modal onClose={() => setNewModalOpen(false)}>
          <TeamCreate seasonData={seasons} postTeam={handleCreateClick} />
        </Modal>
      )}
    </div>
  );
};

export default TeamIndex;
