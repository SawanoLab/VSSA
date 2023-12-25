import React, { useEffect, useState } from "react";

import PlayerCreate from "./create";
import PlayerEdit from "./edit";
import { PlayerResponse } from "../../api-client/api";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Modal from "../../composents/Modal";
import Table from "../../composents/Table";
import { usePlayer } from "../../hooks/match/usePlayer";
import { playerClient, teamClient, seasonClient } from "../../lib/api/main";
import { SeasonData } from "../../types/season";
import { TeamName } from "../../types/team";
import { TeamsData } from "../../types/team";
import ErrorMessage from "../../utility/ErrorMessage";

const PlayerIndex: React.FC = () => {
  const { players, setPlayersData } = usePlayer();
  const [teams, setTeams] = useState<TeamName[]>([]);
  const [seasons, setSeasons] = useState<SeasonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerResponse | undefined>(
    undefined
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const tableHeader = [
    { header: "名前", accessor: "name" },
    { header: "背番号", accessor: "player_number" },
    { header: "ポジション", accessor: "postion" },
  ];

  const getTeams = async () => {
    setLoading(true);
    try {
      const response = await teamClient.getTeamsApiV1TeamsGet();
      const data = response.data;
      const formattedData = data.map((item: TeamsData) => ({
        uuid: item.uuid,
        name: item.name,
      }));
      setTeams(formattedData);
    } catch (error) {
      setErrorMessage("チームデータの取得");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayer = async () => {
    setLoading(true);
    try {
      const response = await playerClient.getPlayersApiV1PlayersGet();
      const data = response.data;
      if (data) {
        setPlayersData(formatPlayerData(data));
      }
    } catch (error) {
      setErrorMessage("プレイヤーデータの取得");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeasonData = async () => {
    setLoading(true);
    try {
      const response = await seasonClient.getSeasonsApiV1SeasonsGet();
      const data = response.data;
      setSeasons(data);
    } catch (error) {
      setErrorMessage("シーズンデータの取得");
    } finally {
      setLoading(false);
    }
  };

  const deletePlayer = async (playerId: string) => {
    try {
      await playerClient.deletePlayerApiV1PlayersDelete(playerId);
    } catch (error) {
      setErrorMessage("プレイヤーの削除");
    }
  };

  const handleDeleteClick = async (playerId: string) => {
    await deletePlayer(playerId);
    fetchPlayer();
  };

  const handleEditClick = (playerId: string) => {
    const player = players.find((player) => player.uuid === playerId);
    setSelectedPlayer(player);
    setEditModalOpen(true);
    fetchPlayer();
  };

  const formatPlayerData = (data: PlayerResponse[]) => {
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
      }: PlayerResponse) => ({
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

  useEffect(() => {
    getTeams();
    fetchSeasonData();
  }, []);

  useEffect(() => {
    if (teams.length > 0) {
      fetchPlayer();
      fetchSeasonData();
      fetchPlayer();
    }
  }, [teams]);

  return (
    <div>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clearError={() => setErrorMessage("")}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">プレイヤー</h1>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
              onClick={() => setNewModalOpen(true)}
            >
              新しいプレイヤー
            </button>
          </div>
          <div className="bg-gray-200 p-4 border" />
          <Table
            data={players}
            columns={tableHeader}
            hover={true}
            deleteButton={handleDeleteClick}
            editButton={handleEditClick}
          />
        </div>
      )}
      {isEditModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)}>
          {selectedPlayer && (
            <PlayerEdit
              playerData={selectedPlayer}
              teamData={teams}
              onClose={() => setEditModalOpen(false)}
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
    </div>
  );
};

export default PlayerIndex;
