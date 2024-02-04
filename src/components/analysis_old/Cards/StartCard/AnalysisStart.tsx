import React from "react";

import { MatchResponse } from "../../../../api-client/api";
import { useCard } from "../../../../hooks/card/useCardController";
import PlayCardLayout from "../PlayCardLayout";

interface AnalysisStartProps {
  match?: MatchResponse;
  nextStep: string;
}
export const AnalysisStart: React.FC<AnalysisStartProps> = ({
  match,
  nextStep,
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);

  return (
    <PlayCardLayout title="試合" subTitle="開始" type={currentTeam}>
      <div className="flex flex-row justify-center items-center">
        <p>
          {match?.home_team.team_name}
          <span className="border p-1 m-3">0</span>
          vs
          <span className="border p-1 m-3">0</span>
          {match?.away_team.team_name}
        </p>
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          style={{ width: "100px", height: "50px" }}
          className="
          bg-white
          border border-gray-400
          text-gray-700"
        >
          0
        </button>
        <button
          style={{ width: "100px", height: "50px" }}
          className="
          bg-white
          border border-gray-400
          text-gray-700
          "
        >
          0
        </button>
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="
          w-max
          bg-gray-200
          text-gray-700
          hover:bg-gray-300
          font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          次のラリーを開始
        </button>
      </div>
    </PlayCardLayout>
  );
};

export default AnalysisStart;
