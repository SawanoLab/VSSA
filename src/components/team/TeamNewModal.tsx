import Modal from "components/Modal";
import { useSeason } from "hooks/match/useSeason";
import React from "react";

import TeamCreate from "../../pages/team/create";

export const TeamNewModal: React.FC = () => {
  const { seasons } = useSeason();
  const [isNewModalOpen, setNewModalOpen] = React.useState(false);

  return (
    <div>
      {isNewModalOpen && (
        <Modal onClose={() => setNewModalOpen(false)}>
          <TeamCreate
            type="create"
            seasonData={seasons}
            closeModal={setNewModalOpen}
          />
        </Modal>
      )}
      <button
        className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
        onClick={() => setNewModalOpen(true)}
      >
        新しいチーム
      </button>
    </div>
  );
};
