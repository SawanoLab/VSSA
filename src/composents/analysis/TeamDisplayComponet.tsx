import React, { useState } from "react";

import { TeamTableComponent } from "./TeamTableComponent";
import { MatchRequest } from "../../api-client/api";

interface TeamDisplayComponentProps {
  match: MatchRequest | undefined;
}

export const TeamDisplayComponent: React.FC<TeamDisplayComponentProps> = ({
  match,
}) => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ width: "100%" }}>
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium text-center 
                      ${activeTab === "home" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
          onClick={() => setActiveTab("home")}
        >
          Home Team
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium text-center 
                      ${activeTab === "away" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
          onClick={() => setActiveTab("away")}
        >
          Away Team
        </button>
      </div>
      <div className="flex flex-col p-4">
        {activeTab === "home" && (
          <TeamTableComponent
            teamName={match?.home_team.team_name}
            teamData={match?.home_team.players}
          />
        )}
        {activeTab === "away" && (
          <TeamTableComponent
            teamName={match?.away_team.team_name}
            teamData={match?.away_team.players}
          />
        )}
      </div>
    </div>
  );
};
