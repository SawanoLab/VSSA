import React from "react";

import { TeamDisplayComponet } from "./TeamDisplayComponet";
import { MatchRequest } from "../../api-client/api";

export interface MatchUtilityComponent {
  match?: MatchRequest;
}
export const MatchUtilityComponent: React.FC<MatchUtilityComponent> = ({
  match,
}) => {
  return (
    <div>
      <MatchTeamComponet match={match} />
      <ScoreDisplayComponent match={match} />
      <TeamDisplayComponet match={match} />
    </div>
  );
};
const MatchTeamComponet: React.FC<MatchUtilityComponent> = ({ match }) => {
  return (
    <p className="text-xl text-gray-500">
      {match?.home_team.team_name} vs {match?.away_team.team_name}
    </p>
  );
};
const ScoreDisplayComponent: React.FC<MatchUtilityComponent> = ({ match }) => {
  return (
    <p className="text-ml text-gray-500">
      スコア: {match?.home_team_score} - {match?.away_team_score}
    </p>
  );
};
