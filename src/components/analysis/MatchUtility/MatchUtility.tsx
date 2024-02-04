import { MatchResponse } from "api-client";
import React, { useState } from "react";

import { MatchTeam } from "./MatchTeam";
import { PlayHistory } from "./PlayHistory";
import { TeamDisplay } from "./TeamDisplay";

export interface MatchUtility {
  match?: MatchResponse;
}
export const MatchUtility: React.FC<MatchUtility> = ({ match }) => {
  const [activeTab, setActiveTab] = useState("playHistory");

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <MatchTeam match={match} />
      </div>
      <div style={{ width: "100%" }}>
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium text-center 
                      ${
                        activeTab === "playHistory"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
            onClick={() => setActiveTab("playHistory")}
          >
            プレー履歴
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium text-center 
                      ${
                        activeTab === "playerList"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
            onClick={() => setActiveTab("playerList")}
          >
            選手一覧
          </button>
        </div>
      </div>
      <div className="flex flex-col p-4">
        {activeTab === "playHistory" && <PlayHistory match={match} />}
        {activeTab === "playerList" && <TeamDisplay match={match} />}
      </div>
    </div>
  );
};
