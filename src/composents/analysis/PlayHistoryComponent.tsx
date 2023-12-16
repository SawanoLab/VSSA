import React from "react";

import { MatchRequest } from "../../api-client/api";
import { useAttackHistory } from "../../hooks/analysis/attack/use-attackHistory";
import Table from "../Table";

interface PlayHistoryComponentProps {
  match?: MatchRequest;
}
export const PlayHistoryComponent: React.FC<PlayHistoryComponentProps> = ({
  match,
}) => {
  const { history, deleteAttackData } = useAttackHistory();

  const header = [
    { header: "名前", accessor: "name" },
    // { header: "行動", accessor: "action" },
    { header: "得点", accessor: "score" },
    { header: "コース", accessor: "course" },
  ];

  const data = history.map((item) => {
    const team = item.team_id === match?.home_team.uuid ? "home" : "away";
    const playerName =
      team === "home"
        ? match?.home_team.players[item.player_id]?.PlayerInfo.name
        : match?.away_team.players[item.player_id]?.PlayerInfo.name;

    return {
      name: (
        <div className={team === "home" ? "text-blue-500" : "text-red-500"}>
          {playerName}
        </div>
      ),
      action: `${item.attack_ball_type}→${item.attack_skill}→${item.attack_evaluation}`,
      score: `${item.home_team_set_score}|${item.home_team_score}-${item.away_team_score}|${item.away_team_set_score}`,
      course: `${item.attack_start_zone}→${item.attack_end_zone}`,
      uuid: item.uuid,
    };
  });

  const handleDelete = (attackId: string) => {
    deleteAttackData(attackId);
  };
  return (
    <div style={{ width: "550px" }}>
      <Table
        data={data}
        columns={header}
        tableHeight="300px"
        hover={true}
        deleteButton={handleDelete}
      />
    </div>
  );
};
