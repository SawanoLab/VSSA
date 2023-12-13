import React, { useState } from "react";

import { TeamDisplayComponent } from "./TeamDisplayComponet";
import { MatchRequest } from "../../api-client/api";
import { useAttackHistory } from "../../hooks/analysis/attack/use-attackHistory";
import Table from "../Table";

interface PlayHistoryComponentProps {
  match?: MatchRequest;
}

const PlayHistoryComponent: React.FC<PlayHistoryComponentProps> = ({ match }) => {
  const { history, deleteAttackData } = useAttackHistory();

  const header = [
    { header: "名前", accessor: "name" },
    // { header: "行動", accessor: "action" },
    { header: "得点", accessor: "score" },
    { header: "コース", accessor: "course" },
  ];

  const data = history.map((item) => {
    const team = item.team_id === match?.home_team.uuid ? "home" : "away";
    const playerName = team === "home"
          ? match?.home_team.players[item.player_id]?.PlayerInfo.name
          : match?.away_team.players[item.player_id]?.PlayerInfo.name;

    return {
      name: <div className={team === "home" ? "text-blue-500" : "text-red-500"}>{playerName}</div>,
      action: `${item.attack_ball_type}→${item.attack_skill}→${item.attack_evaluation}`,
      score: `${item.away_team_score}-${item.home_team_score}`,
      course: `${item.attack_start_zone}→${item.attack_end_zone}`,
      id: item.uuid
    };
  });


  const handleDelete = (attackId: string) => {
    deleteAttackData(attackId);
  }
  return (
    <div style={{ width: "550px" }}>
      <Table data={data} columns={header} tableHeight="300px" hover={true} deleteButton={handleDelete} />
    </div>
  );
};

export interface MatchUtilityComponent {
  match?: MatchRequest;
}
export const MatchUtilityComponent: React.FC<MatchUtilityComponent> = ({
  match,
}) => {
  const [activeTab, setActiveTab] = useState("playHistory");

  return (
    <div>
      <div className="flex justify-between">
        <MatchTeamComponet match={match} />
        <ScoreDisplayComponent match={match} />
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
        {activeTab === "playHistory" && (
          <PlayHistoryComponent match={match} />
        )}
        {activeTab === "playerList" && (
          <TeamDisplayComponent match={match} />
        )}

      </div>
    </div>
  );
};
const MatchTeamComponet: React.FC<MatchUtilityComponent> = ({ match }) => {
  return (
    <p className="text-xl text-gray-500">
      {match?.home_team.team_name}vs{match?.away_team.team_name}
    </p>
  );
};
const ScoreDisplayComponent: React.FC<MatchUtilityComponent> = () => {
  return (
    <p className="text-ml text-gray-500">
      スコア: {0}-{0}
    </p>
  );
};
