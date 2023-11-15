import React from "react";
import Modal from "../../composents/Modal";
import Edit from "../../pages/player/edit";
import { PlayerInfo } from "../../types/player";

interface PlayerModalProps {
  player: PlayerInfo | null;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
  return (
    <Modal onClose={onClose}>
      {player && <Edit player={player} />}
    </Modal>
  );
};

export default PlayerModal;
