import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Edit from "./edit";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Modal from "../../composents/Modal";
import Table from "../../composents/table";
import { usePlayer } from "../../hooks/match/use-player";
import { useAuth } from "../../hooks/use-auth";
import { getPlayers, deletePlayer } from "../../lib/api/players";
import { getTeams } from "../../lib/api/teams";
import { PlayerInfo } from "../../types/player";
import { TeamName } from "../../types/team";
import { TeamsData } from "../../types/team";
import errorHandling from "../../utility/ErrorHandling";


const PlayerIndex: React.FC = () => {
  const { username } = useAuth();
  const { players, setPlayersData } = usePlayer();
  const [teams, setTeams] = useState<TeamName[]>([]);
  const [loading, setLoading] = useState(true);
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
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
    setModalOpen(false);
    fetchPlayerData();
  };

  const fetchTeamData = async () => {
    try {
      const { data, loading } = await getTeams(username);
      if (loading || !data) return;
      const formattedData = data.map((item: TeamsData) => ({
        uuid: item.uuid,
        name: item.name,
      }));
      setTeams(formattedData);
    } catch (error) {
      errorHandling(error, "チームデータ");
    }
  };

  const fetchPlayerData = async () => {
    try {
      const { data, loading } = await getPlayers(username);
      if (loading || !data) return;
      setPlayersData(formatPlayerData(data));
    } catch (error) {
      errorHandling(error, "プレイヤーデータ");
    } finally {
      setLoading(false);
    }
  };

  const formatPlayerData = (data: PlayerInfo[]) => {
    return data.map(
      ({
        uuid,
        name,
        player_number,
        code,
        postion,
        weight = 0,
        height = 0,
        user_id,
        team_id,
        season_id,
      }: PlayerInfo) => ({
        uuid,
        name,
        player_number,
        code,
        postion,
        weight,
        height,
        user_id,
        team_id,
        season_id,
      })
    );
  };

  const handleDeleteClick = async (playerId: string) => {
    try {
      const { data, loading } = await deletePlayer(playerId, username);
      if (loading || !data) return;
      fetchPlayerData();
    } catch (error) {
      errorHandling(error, "プレイヤーの削除");
    }
  };

  useEffect(() => {
    fetchTeamData();
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
