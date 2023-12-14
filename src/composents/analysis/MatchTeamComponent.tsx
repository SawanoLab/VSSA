import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { MatchRequest } from "../../api-client/api";
import { useAttackHistory } from "../../hooks/analysis/attack/use-attackHistory";


export interface MatchTeamComponent {
  match?: MatchRequest;
}

export const MatchTeamComponent: React.FC<MatchTeamComponent> = ({ match }) => {
  const {
    homeTeamScore,
    awayTeamScore,
    homeTeamSetScore,
    awayTeamSetScore,
    setHomeTeamScore,
    setAwayTeamScore,
    setHomeTeamSetScore,
    setAwayTeamSetScore,
  } = useAttackHistory();

  const handleDecreaseScore = (team: "home" | "away") => {
    if (team === "home") {
      setHomeTeamScore((prev) => {
        if (prev <= 0 && homeTeamSetScore > 0) {
          setHomeTeamSetScore((setPrev) => setPrev - 1);
          return 25;
        }
        return prev > 0 ? prev - 1 : 0;
      });
    } else {
      setAwayTeamScore((prev) => {
        if (prev <= 0 && awayTeamSetScore > 0) {
          setAwayTeamSetScore((setPrev) => setPrev - 1);
          return 25;
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }
  };

  const handleScore = (team: "home" | "away", increment: boolean) => {
    if (team === "home") {
      setHomeTeamScore((prev) =>
        increment ? prev + 1 : prev > 0 ? prev - 1 : 0
      );
    } else {
      setAwayTeamScore((prev) =>
        increment ? prev + 1 : prev > 0 ? prev - 1 : 0
      );
    }
    checkSetEnd();
  };

  const checkSetEnd = () => {
    if (homeTeamScore >= 25 && homeTeamScore - awayTeamScore >= 2) {
      setHomeTeamSetScore((prev) => prev + 1);
      resetScores();
    } else if (awayTeamScore >= 25 && awayTeamScore - homeTeamScore >= 2) {
      setAwayTeamSetScore((prev) => prev + 1);
      resetScores();
    }
  };

  const resetScores = () => {
    setHomeTeamScore(0);
    setAwayTeamScore(0);
  };

  return (
    <div className="m-5">
      <table className="table-auto text-center w-full text-gray-500">
        <tr>
          <td></td>
          <td className="p-2 border-r border-l border-gray-200">セット</td>
          <td className="p-2 border-r border-l border-gray-200">得点</td>
          <td></td>
          <td className="p-2 border-r border-l border-gray-200">得点</td>
          <td className="p-2 border-r border-l border-gray-200">セット</td>
          <td></td>
        </tr>
        <tr>
          <td className="p-2">{match?.home_team.team_name}</td>
          <td className="border-r border-l border-gray-200">
            {homeTeamSetScore}
          </td>
          <td className="border-r border-l border-gray-200">{homeTeamScore}</td>
          <td className="p-2">-</td>
          <td className="border-r border-l border-gray-200">{awayTeamScore}</td>
          <td className="border-r border-l border-gray-200">
            {awayTeamSetScore}
          </td>
          <td className="p-2">{match?.away_team.team_name}</td>
        </tr>
      </table>
      <p className="text-center text-gray-500 flex justify-between m-3">
        <div>
          スコア
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={() => handleScore("home", true)}
          >
            <AiOutlinePlus />
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={() => handleDecreaseScore("home")}
          >
            <AiOutlineMinus />
          </button>
        </div>
        <div>
          スコア
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={() => handleScore("away", true)}
          >
            <AiOutlinePlus />
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={() => handleDecreaseScore("away")}
          >
            <AiOutlineMinus />
          </button>
        </div>
      </p>
    </div>
  );
};
