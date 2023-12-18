// import { TeamsData } from "api-client";
import Modal from "composents/Modal";
import { useSeason } from "hooks/match/useSeason";
import TeamCreate from "pages/team/create";
import React, { useState } from "react";

import { useTeam } from "../../hooks/match/useTeam";
import Table from "../Table";

export const TeamList: React.FC = () => {
  const { seasons } = useSeason();
  const { teams, deleteTeam } = useTeam();
  const [editTeamModalOpen, setEditTeamModalOpen] = useState(false);
  const handleDeleteClick = (teamId: string) => {
    deleteTeam(teamId);
  };
  const handleEditClick = () => {
    setEditTeamModalOpen(true);
  };

  const header = [{ header: "名称", accessor: "name" }];
  return (
    <div>
      {editTeamModalOpen && (
        <Modal onClose={() => setEditTeamModalOpen(false)}>
          <TeamCreate
            type="edit"
            defaultValues={teams[0]}
            seasonData={seasons}
            closeModal={setEditTeamModalOpen}
          />
        </Modal>
      )}
      <Table
        data={teams}
        columns={header}
        hover={true}
        deleteButton={handleDeleteClick}
        editButton={handleEditClick}
      />
    </div>
  );
};
