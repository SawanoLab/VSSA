import React from "react";

import { TeamTableComponent } from "./TeamTableComponent";
import { MatchRequest } from "../../api-client/api";

interface TeamDisplayComponetProps {
  match: MatchRequest | undefined;
}
export const TeamDisplayComponet: React.FC<TeamDisplayComponetProps> = ({
  match,
}) => {
  return (
    <div className="flex">
      <TeamTableComponent
        teamName={match?.home_team.team_name}
        teamData={match?.home_team.players}
      />
      <TeamTableComponent
        teamName={match?.away_team.team_name}
        teamData={match?.away_team.players}
      />
    </div>
  );
};
