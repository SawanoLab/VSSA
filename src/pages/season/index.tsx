import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../composents/table";
import { getSeasons } from "../../lib/api/api";
import { useAuth } from "../../hooks/use-auth";
import { useSeason } from "../../hooks/match/use-season";

const SeasonIndex: React.FC = () => {
  const { username } = useAuth();
  const { seasons, setSeasonsData } = useSeason();

  const header = [
    { header: "開始日", accessor: "start_day" },
    { header: "終了日", accessor: "end_day" },
    { header: "シーズン名", accessor: "season_name" },
    { header: "GameFormat", accessor: "game_format" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const items = await getSeasons(username);
      setSeasonsData(items);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">シーズン</h1>
        <Link to="/season/create"
          className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded">
          シーズンを作成
        </Link>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={seasons} columns={header} />
    </div>
  );
};

export default SeasonIndex;
