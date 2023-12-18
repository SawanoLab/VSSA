import React from "react";

import { useTeam } from "../../hooks/match/useTeam";
import Table from "../Table";

export const TeamList: React.FC = () => {
  const { teams, deleteTeam } = useTeam();
  const handleDeleteClick = (teamId: string) => {
    deleteTeam(teamId);
  };

  const handleEditClick = () => {
    console.log("edit");
  };

  const header = [{ header: "名称", accessor: "name" }];
  return (
    <div>
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
