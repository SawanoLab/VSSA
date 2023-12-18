import React from "react";

import { TeamNewModal } from "./TeamNewModal";

export const TeamIndexHeader: React.FC = () => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-3sm">チーム</h1>
      <TeamNewModal />
    </div>
  );
};
