import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MatchRequest as Match } from "../../api-client/api";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Table from "../../composents/Table";
import { useAuth } from "../../hooks/use-auth";
import { matchClient } from "../../lib/api/main";


const MatchIndex: React.FC = () => {
  const { username } = useAuth();
  const [loading, setLoading] = useState(true);
  const [matchs, setMatchs] = useState<Match[]>([]);

  const fetchMatchs = async () => {
    setLoading(true);
    const response = await matchClient.getMatchesMatchesGet(username);
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
  /* eslint-disable */
  const navigate = useNavigate();

  const handleRowClick = (row: any) => {
    console.log(row);
    navigate(`/analysis/${row.id}`);

  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">試合</h1>
            <Link
              className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded"
              to="/match/create"
            >
              新しい試合
            </Link>
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
};

export default MatchIndex;
