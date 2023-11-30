import React from "react";

import PlayCardLayout from "./PlayCardLayout";
import { MatchRequest } from "../../api-client/api";

interface AnalysisStartProps {
  match?: MatchRequest;
}
export const AnalysisStart: React.FC<AnalysisStartProps> = ({ match }) => {
  return (
    <PlayCardLayout title="試合" subTitle="開始">
      {/* チーム名 */}
      <div className="flex flex-row justify-center items-center">
        <p>
          {match?.home_team.team_name}
          <span className="border p-1 m-3">{match?.home_team_score}</span>
          vs
          <span className="border p-1 m-3">{match?.away_team_score}</span>
          {match?.away_team.team_name}
        </p>
      </div>

      {/* 得点ボタン */}
      <div className="flex flex-row justify-center items-center">
        <button
          style={{ width: "100px", height: "50px" }}
          className="
          bg-white
          border border-gray-400
          text-gray-700"
        >
          {match?.home_team_score}
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          className="
          bg-white
          border border-gray-400
          text-gray-700
          "
        >
          {match?.away_team_score}
        </button>
      </div>

      {/* セット開始ボタン 一番下に配置 */}
      <div className="flex flex-row justify-center items-center">
        <button
          className="
        w-max
        bg-gray-200
        text-gray-700
        hover:bg-gray-300
        font-bold py-2 px-4 rounded"
        >
          次のラリーを開始
        </button>
      </div>
    </PlayCardLayout>
  );
};
export default AnalysisStart;
