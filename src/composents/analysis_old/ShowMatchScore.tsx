import React from "react";

import { MatchResponse } from "../../api-client/api";

interface ShowMatchScoreProps {
  match?: MatchResponse;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeamSetScore: number;
  awayTeamSetScore: number;
}

export const ShowMatchScore: React.FC<ShowMatchScoreProps> = ({
  match,
  homeTeamScore,
  awayTeamScore,
  homeTeamSetScore,
  awayTeamSetScore,
}) => {
  return (
    <div className="m-5 w-full">
      <table className="table-auto text-center w-full text-gray-500">
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};
