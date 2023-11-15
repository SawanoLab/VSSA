import React from "react";
import { PlayerInfo } from "../../types/player";

interface EditProps {
  player: PlayerInfo;
}

const Edit: React.FC<EditProps> = (player) => {
  return (
      <div className="">
        <h2 className="text-2xl font-bold mb-4">あああ</h2>
        <p className="mb-2">Player Number: 1</p>
        <p className="mb-2">Position: 2</p>
        <p className="mb-2">Weight: 22</p>
        <p className="mb-2">Height: 11</p>
      </div>
  );
};

export default Edit;
