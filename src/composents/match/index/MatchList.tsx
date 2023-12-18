import React from "react";
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
  const { matchs } = useMatch();
  const navigate = useNavigate();
  const handleRowClick = (row: TableData) => {
    navigate(`/analysis/${row.id}`);
  };

  const tableData: TableData[] = matchs.map((match) => ({
    id: match.uuid,
    season_name: match.season_name,
    home_team: match.home_team.team_name,
    away_team: match.away_team.team_name,
  }));
  const header = [
    { header: "シーズン", accessor: "season_name" },
    { header: "ホーム", accessor: "home_team" },
    { header: "アウェイ", accessor: "away_team" },
  ];

  return (
    <Table data={tableData} columns={header} onRowClick={handleRowClick} />
  );
};
