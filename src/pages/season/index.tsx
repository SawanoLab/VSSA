import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../composents/table";
import { getSeasons } from "../../lib/api/seasons";
import { useAuth } from "../../hooks/use-auth";
import { useSeason } from "../../hooks/match/use-season";
import LoadingSpinner from "../../composents/LoadingSpinner";

const SeasonIndex: React.FC = () => {
  const { username } = useAuth();
  const [loading, setLoading] = useState(true);
  const { seasons, setSeasonsData } = useSeason();

  const header = [
    { header: "開始日", accessor: "start_day" },
    { header: "終了日", accessor: "end_day" },
    { header: "シーズン名", accessor: "season_name" },
    { header: "GameFormat", accessor: "game_format" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, loading } = await getSeasons(username);
        if (loading || !data) {
          return;
        }
        setSeasonsData(data);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">シーズン</h1>
            <Link
              to="/season/create"
              className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
            >
              シーズンを作成
            </Link>
          </div>
          <div className=" bg-blue-100 p-4 border" />
          <Table data={seasons} columns={header} />
        </div>
      )}
    </div>
  );
};

export default SeasonIndex;
