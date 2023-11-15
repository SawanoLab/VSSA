// PlayerIndex.tsx
import React, { useEffect, useState } from "react";
import Table from "../../composents/table";
import PlayerModal from "../../composents/player/PlayerModal";
import { Link } from "react-router-dom";
import { getPlayers, deletePlayer } from "../../lib/api/players";
import { usePlayer } from "../../hooks/match/use-player";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useAuth } from "../../hooks/use-auth";
import { PlayerInfo } from "../../types/player";

const PlayerIndex: React.FC = () => {
  const { username } = useAuth();
  const { players, setPlayersData } = usePlayer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfo | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const header = [
    // { header: "No.", accessor: "uuid" },
    { header: "コード", accessor: "player_number" },
    { header: "名", accessor: "name" },
    { header: "ポジション", accessor: "postion" },
    {
      header: "",
      accessor: "edit",
      cellRenderer: (item: PlayerInfo) => (
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white py-1 px-4 rounded"
          onClick={() => handleEditClick(item)}
        >
          編集
        </button>
      ),
    },
    {
      header: "",
      accessor: "delete",
      cellRenderer: (item: PlayerInfo) => (
        <button
          className="bg-red-400 hover:bg-red-700 text-white py-1 px-4 rounded"
          onClick={() => handleDeleteClick(item.uuid)}
        >
          削除
        </button>
      ),
    },
  ];

  const handleEditClick = (player: PlayerInfo) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
    setModalOpen(false);
  };

  const fetchPlayerData = async () => {
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

  const handleDeleteClick = async (playerId: string) => {
    try {
      const { data, loading } = await deletePlayer(playerId, username);
      if (loading || !data) return;
      fetchPlayerData();
    } catch (error) {
      console.error("プレイヤーの削除中にエラーが発生しました:", error);
      setError("プレイヤーの削除に失敗しました。もう一度試してください。");
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, [username, setPlayersData]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {isModalOpen && (
            <PlayerModal player={selectedPlayer} onClose={handleCloseModal} />
          )}
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
