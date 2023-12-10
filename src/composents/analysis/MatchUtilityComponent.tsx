import React from "react";

import { TeamDisplayComponent } from "./TeamDisplayComponet";
import { MatchRequest } from "../../api-client/api";
import Table from "../Table";

interface PlayHistoryComponentProps {
}

const PlayHistoryComponent: React.FC<PlayHistoryComponentProps> = () => {
  const header = [
    { header: "名前", accessor: "name" },
    { header: "行動", accessor: "action" },
    { header: "コース", accessor: "course" },
  ];

  return(
    <div>
      <Table data={[]} columns={header}/>
    </div>
  );
}


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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <PlayHistoryComponent />
        </div>
        <div>
          <TeamDisplayComponent match={match} />
        </div>
      </div>
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
