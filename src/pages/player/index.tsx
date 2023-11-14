import React, { useEffect, useState } from "react";
import Table from "../../composents/table";
import { Link } from "react-router-dom";
import { getPlayers } from "../../lib/api/players";
import { usePlayer } from "../../hooks/match/use-player";
import { PlayerInfo } from "../../types/player";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useAuth } from "../../hooks/use-auth";

const PlayerIndex: React.FC = () => {
  const { username } = useAuth();
  const { players, setPlayersData } = usePlayer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const header = [
    { header: "No.", accessor: "uuid" },
    { header: "コード", accessor: "player_number" },
    { header: "名", accessor: "name" },
    { header: "ポジション", accessor: "postion" },
  ];

  const fetchData = async () => {
    try {
      const { data, loading } = await getPlayers(username);
      if (loading || !data) return;
      const formattedData = data.map((item: PlayerInfo) => ({
        uuid: item.uuid,
        name: item.name,
        player_number: item.player_number,
        code: item.code,
        postion: item.postion,
        weight: item.weight || 0,
        height: item.height || 0,
        user_id: item.user_id,
        team_id: item.team_id,
        season_id: item.season_id,
      }));
      setPlayersData(formattedData);
      setError(null);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      setError("データの取得に失敗しました。もう一度試してください。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username, setPlayersData]);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="fixed top-0 right-0 p-4 bg-red-500 text-white">
          {error}
        </div>
      )}

      {!loading && (
        <div>
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">プレイヤー</h1>
            <Link
              to="create"
              className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
            >
              新しいプレイヤー
            </Link>
          </div>
          <div className="bg-blue-100 p-4 border" />
          <Table data={players} columns={header} />
        </div>
      )}
    </div>
  );
};

export default PlayerIndex;
