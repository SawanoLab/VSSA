import React, { useEffect, useState } from "react";

import { AnalaysisCourt } from "./AnalaysisCourt";
import { DrowArrow } from "./DrowArrow";
import { AttackGet } from "../../../api-client/api";
import { ShowMatchScore } from "../../analysis/ShowMatchScore";

interface GameHistoryProps {
  history: AttackGet[];
  getPlayerTeam: (player_id: string) => string;
  getPlayerNumber: (player_id: string) => number;
}

const GameHistory: React.FC<GameHistoryProps> = ({
  history,
  getPlayerTeam,
  getPlayerNumber,
}) => {
  const [AttackGroup, setAttackGroup] = React.useState<AttackGet[][]>([]);
  const [showTeamHistory, setShowTeamHistory] = useState<
    "home" | "away" | "and"
  >("and"); // "home" | "away"

  const home_serve_zone = [
    ["4", "3", "2"],
    ["7", "8", "9"],
    ["5", "6", "1"],
  ];
  const away_serve_zone = [
    ["1", "6", "5"],
    ["9", "8", "7"],
    ["2", "3", "4"],
  ];

  const groupBy = (history: AttackGet[]) => {
    const group = history.reduce(
      (acc, cur) => {
        const key = `${cur.home_team_score}${cur.away_team_score}${cur.home_team_set_score}${cur.away_team_set_score}`;
        (acc[key] = acc[key] || []).push(cur);
        return acc;
      },
      {} as { [key: string]: AttackGet[] }
    );
    return Object.values(group);
  };

  useEffect(() => {
    const groupHistory = groupBy(history);
    setAttackGroup(groupHistory);
  }, [history]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "800px",
      }}
    >
      {/* 選択ボタン */}
      <div>
        <button onClick={() => setShowTeamHistory("home")}>home</button>
        <button onClick={() => setShowTeamHistory("away")}>away</button>
        <button onClick={() => setShowTeamHistory("and")}>and</button>
      </div>
      {Object.values(AttackGroup).map((attckers, index) => (
        <div
          key={index}
          className="items-center flex flex-col"
          style={{ width: "200px", marginBottom: "10px" }}
        >
          <ShowMatchScore
            homeTeamScore={attckers[0].home_team_score}
            awayTeamScore={attckers[0].away_team_score}
            homeTeamSetScore={attckers[0].home_team_set_score}
            awayTeamSetScore={attckers[0].away_team_set_score}
          />
          <AnalaysisCourt
            showTeamHistory={showTeamHistory}
            homeServeZone={home_serve_zone}
            awayServeZone={away_serve_zone}
            homeAttacks={attckers.filter(
              (attcker) => getPlayerTeam(attcker.player_id) === "home"
            )}
            awayAttacks={attckers.filter(
              (attcker) => getPlayerTeam(attcker.player_id) === "away"
            )}
            componentId={index}
            getPlayerNumber={getPlayerNumber}
            getPlayerTeam={getPlayerTeam}
          />
          <span className="border border-gray-500">
            {attckers.map((attcker) => (
              <DrowArrow
                showTeamHistory={showTeamHistory}
                attcker={attcker}
                index={index}
                team={getPlayerTeam(attcker.player_id)}
                key={attcker.uuid}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GameHistory;
