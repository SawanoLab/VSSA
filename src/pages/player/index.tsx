import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeams } from "../../lib/api/teams";
import Edit from "./edit";
import Modal from "../../composents/Modal";
import Table from "../../composents/table";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { usePlayer } from "../../hooks/match/use-player";
import { useAuth } from "../../hooks/use-auth";
import { getPlayers, deletePlayer } from "../../lib/api/players";
import { PlayerInfo } from "../../types/player";
import { TeamName } from "../../types/team";

const PlayerIndex: React.FC = () => {
  const { username } = useAuth();
  const { players, setPlayersData } = usePlayer();
  const [teams, setTeams] = useState<TeamName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfo | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const tableHeader = [
    { header: "名前", accessor: "name" },
    { header: "背番号", accessor: "player_number" },
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
    console.log("player: ", player);
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
    setModalOpen(false);
  };

  const fetchTeamData = async () => {
    try {
      const { data, loading } = await getTeams(username);
      if (loading || !data) return;
      const formattedData = data.map((item: any) => ({
        uuid: item.uuid,
        name: item.name,
      }));
      setTeams(formattedData);
      setError(null);
    } catch (error) {
      console.error("チームデータの取得中にエラーが発生しました:", error);
      setError("チームデータの取得に失敗しました。もう一度試してください。");
      setTeams([]);
    }
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
      console.error("プレイヤーデータの取得中にエラーが発生しました:", error);
      setError(
        "プレイヤーデータの取得に失敗しました。もう一度試してください。"
      );
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
    fetchTeamData(); // チームデータを取得
  }, []);

  useEffect(() => {
    if (teams.length > 0) {
      fetchPlayerData();
    }
  }, [teams]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              {selectedPlayer && (
                <Edit
                  playerData={selectedPlayer}
                  teamData={teams}
                  onClose={handleCloseModal}
                />
              )}
            </Modal>
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
          <Table data={players} columns={tableHeader} />
        </div>
      )}
    </div>
  );
};

export default PlayerIndex;
