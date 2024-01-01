import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useMatch } from "../../../hooks/match/useMatch";
import Table from "../../Table";

type TableData = {
  id: string;
  season_name: string;
  home_team: string;
  away_team: string;
};

export const MatchList: React.FC = () => {
  const { matchs, deleteMatch } = useMatch();
  const navigate = useNavigate();

  const tableData: TableData[] = matchs.map((match) => ({
    id: match.uuid,
    season_name: match.season_name,
    home_team: match.home_team.team_name,
    away_team: match.away_team.team_name,
    tag_status: (
      <p>
        <AiOutlineCheck className="text-green-500" />
      </p>
    ),
  }));
  const header = [
    { header: "シーズン", accessor: "season_name" },
    { header: "ホーム", accessor: "home_team" },
    { header: "アウェイ", accessor: "away_team" },
    { header: "自動タグ付状態", accessor: "tag_status" },
  ];

  const handleRowClick = (row: TableData) => {
    navigate(`/analysis/${row.id}`);
  };

  const handleEditClick = (id: string) => {
    navigate(`/match/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    deleteMatch(id);
  }

  return (
    <Table
      data={tableData}
      columns={header}
      hover={true}
      onRowClick={handleRowClick}
      editButton={handleEditClick}
      deleteButton={handleDeleteClick}
    />
  );
};
