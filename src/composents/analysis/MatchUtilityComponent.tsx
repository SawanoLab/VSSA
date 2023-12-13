import React from "react";

import { TeamDisplayComponent } from "./TeamDisplayComponet";
import { MatchRequest } from "../../api-client/api";
import { useAttackHistory } from "../../hooks/analysis/attack/use-attackHistory";
import Table from "../Table";

interface PlayHistoryComponentProps {}

const PlayHistoryComponent: React.FC<PlayHistoryComponentProps> = () => {
  const { history } = useAttackHistory();

  const header = [
    { header: "名前", accessor: "name" },
    { header: "行動", accessor: "action" },
    { header: "コース", accessor: "course" },
  ];
  const data = history.map((item) => {
    return {
      name: item.player_id,
      action: `${item.attack_ball_type} → ${item.attack_evaluation}`,
      course: `${item.attack_start_zone} → ${item.attack_end_zone}`,
    };
  });

  return (
    <div>
      <Table data={data} columns={header} />
    </div>
  );
};

export interface MatchUtilityComponent {
  match?: MatchRequest;
}
export const MatchUtilityComponent: React.FC<MatchUtilityComponent> = ({
  match,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <MatchTeamComponet match={match} />
        <ScoreDisplayComponent match={match} />
      </div>
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
const ScoreDisplayComponent: React.FC<MatchUtilityComponent> = () => {
  return (
    <p className="text-ml text-gray-500">
      スコア: {0} - {0}
    </p>
  );
};
