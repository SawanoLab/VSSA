import React from "react";
import Table from "../../composents/table";
import { Link } from "react-router-dom";

const MatchIndex: React.FC = () => {
  const tableData = [
    {
      start_day: "2021/01/01",
      created_at: "2021/01/01",
      home_team: "Italy",
      result: "1-0",
      away_team: "Spain",
    },
    {
      start_day: "2021/01/01",
      created_at: "2021/01/01",
      home_team: "Italy",
      result: "1-0",
      away_team: "Spain",
    },
  ];

  const header = [
    { header: "開催日", accessor: "start_day" },
    { header: "登録日", accessor: "created_at" },
    { header: "ホーム", accessor: "home_team" },
    { header: "スコア", accessor: "result" },
    { header: "アウェイ", accessor: "away_team" },
  ];

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">試合</h1>
        <Link className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded" to="/match/create">
          新しい試合
        </Link>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={tableData} columns={header} />
    </div>
  );
};

export default MatchIndex;
