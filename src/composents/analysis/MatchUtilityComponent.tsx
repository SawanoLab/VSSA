import React, { useState } from "react";

import { MatchTeamComponent } from "./MatchTeamComponent";
import { PlayHistoryComponent } from "./PlayHistoryComponent";
import { TeamDisplayComponent } from "./TeamDisplayComponet";
import { MatchRequest } from "../../api-client/api";

export interface MatchUtilityComponent {
  match?: MatchRequest;
}
export const MatchUtilityComponent: React.FC<MatchUtilityComponent> = ({
  match,
}) => {
  const [activeTab, setActiveTab] = useState("playHistory");

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <MatchTeamComponent match={match} />
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
        {activeTab === "playHistory" && <PlayHistoryComponent match={match} />}
        {activeTab === "playerList" && <TeamDisplayComponent match={match} />}
      </div>
    </div>
  );
};
