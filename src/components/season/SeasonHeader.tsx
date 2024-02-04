import React, { useState } from "react";

import SeasonCreate from "../../pages/season/create";
import Modal from "../Modal";

export const SeasonHeader: React.FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleCloseClick = () => {
    setCreateModalOpen(false);
  };

  return (
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
    </div>
  );
};
