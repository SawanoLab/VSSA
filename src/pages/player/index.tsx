import React, { useEffect, useState } from "react";

import PlayerCreate from "./create";
import Edit from "./edit";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Modal from "../../composents/Modal";
import Table from "../../composents/table";
import { usePlayer } from "../../hooks/match/use-player";
import { useAuth } from "../../hooks/use-auth";
import { getPlayers, deletePlayer } from "../../lib/api/players";
import { getSeasons } from "../../lib/api/seasons";
import { getTeams } from "../../lib/api/teams";
import { PlayerInfo } from "../../types/player";
import { SeasonData } from "../../types/season";
import { TeamName } from "../../types/team";
import { TeamsData } from "../../types/team";
import errorHandling from "../../utility/ErrorHandling";


const PlayerIndex: React.FC = () => {
  const { username } = useAuth();
  const { players, setPlayersData } = usePlayer();
  const [teams, setTeams] = useState<TeamName[]>([]);
  const [seasons, setSeasons] = useState<SeasonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfo | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNewModalOpen, setNewModalOpen] = useState(false);


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
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
    setEditModalOpen(false);
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
      errorHandling("チームデータ");
    }
  };

  const fetchPlayerData = async () => {
    try {
      const { data, loading } = await getPlayers(username);
      if (loading || !data) return;
      setPlayersData(formatPlayerData(data));
    } catch (error) {
      errorHandling("プレイヤーデータ");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeasonData = async () => {
    try {
      const { data, loading } = await getSeasons(username);
      if (loading || !data) return;
      setSeasons(data);
    } catch (error) {
      errorHandling("シーズンデータ");
    } finally {
      setLoading(false);
    }
  }

  const formatPlayerData = (data: PlayerInfo[]) => {
    return data.map(({uuid, name, player_number, code, postion, weight = 0, height = 0, user_id, team_id, season_id}: PlayerInfo) => ({uuid, name, player_number, code, postion, weight, height, user_id, team_id, season_id})
    );
  };

  const handleDeleteClick = async (playerId: string) => {
    try {
      const { data, loading } = await deletePlayer(playerId, username);
      if (loading || !data) return;
      fetchPlayerData();
      fetchSeasonData();
    } catch (error) {
      errorHandling( "プレイヤーの削除");
    }
  };

  useEffect(() => {
    fetchTeamData();
    fetchSeasonData();
  }, []);

  useEffect(() => {
    if (teams.length > 0) {
      fetchPlayerData();
      fetchSeasonData();
    }
  }, [teams]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {isEditModalOpen && (
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
          {isNewModalOpen && (
            <Modal onClose={() => setNewModalOpen(false)}>
              <PlayerCreate
                seasonData={seasons}
                teamData={teams}
                onClose={() => setNewModalOpen(false)}
              />
            </Modal>
          )}
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">プレイヤー</h1>
            <button 
              className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
              onClick={() => setNewModalOpen(true)}
            >
              新しいプレイヤー
            </button>
          </div>
          <div className="bg-blue-100 p-4 border" />
          <Table data={players} columns={tableHeader} />
        </div>
      )}
    </div>
  );
};

export default PlayerIndex;
