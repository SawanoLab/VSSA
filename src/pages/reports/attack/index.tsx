import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MatchResponse } from "../../../api-client/api";
import LoadingSpinner from "../../../composents/LoadingSpinner";
import Table from "../../../composents/Table";
import { matchClient } from "../../../lib/api/main";


interface Props {}

const AttackReportIndex: React.FC<Props> = () => {
  return <Component />
}

interface IProps {}

const Component: React.FC<IProps> = () => {
  const [loading, setLoading] = useState(true);
  const [matchs, setMatchs] = useState<MatchResponse[]>([]);

  const fetchMatchs = async () => {
    setLoading(true);
    const response = await matchClient.getMatchesApiV1MatchesGet();
    setLoading(false);
    setMatchs(response.data);
  }
  useEffect(() => {
    fetchMatchs();
  }, []);

  const tableData = matchs.map((match) => ({
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
  const navigate = useNavigate();
  
  /* eslint-disable */
  const handleRowClick = (row: any) => {
    navigate(`${row.id}`);
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">マッチレポート: スパイクコース</h1>
          </div>
          <div className=" bg-gray-200 p-4 border" />
          <Table
            data={tableData}
            columns={header}
            onRowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  );
}

export default AttackReportIndex
