import React, { useEffect, useState } from "react";

import SeasonCreate from "./create";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Modal from "../../composents/Modal";
import Table from "../../composents/Table";
import { useSeason } from "../../hooks/match/use-season";
import { useAuth } from "../../hooks/use-auth";
import { seasonClient } from "../../lib/api/main";

const SeasonIndex: React.FC = () => {
  const { username } = useAuth();
  const [loading, setLoading] = useState(true);
  const { seasons, setSeasonsData } = useSeason();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleCloseClick = () => {
    setCreateModalOpen(false);
  };
  const header = [
    { header: "開始日", accessor: "start_day" },
    { header: "終了日", accessor: "end_day" },
    { header: "シーズン名", accessor: "season_name" },
    { header: "GameFormat", accessor: "game_format" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await seasonClient.getSeasonsSeasonsGet(username);
        setSeasonsData(data);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {isCreateModalOpen && (
            <Modal onClose={handleCloseClick}>
              <SeasonCreate onClose={handleCloseClick} />
            </Modal>
          )}
          <div className="flex justify-between p-4">
            <h1 className="text-3sm">シーズン</h1>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
              onClick={handleCreateClick}
            >
              作成
            </button>
          </div>
          <div className=" bg-blue-100 p-4 border" />
          <Table data={seasons} columns={header} />
        </div>
      )}
    </div>
  );
};

export default SeasonIndex;
