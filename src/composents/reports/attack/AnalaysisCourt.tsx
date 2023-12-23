import React from "react";

import { AttackResponse } from "../../../api-client/api";
import { ServeZone } from "../attack/ServeZone";

interface AnalaysisCourtProps {
  showTeamHistory: "home" | "away" | "and";
  homeServeZone: string[][];
  awayServeZone: string[][];
  componentId: number;
  homeAttacks: AttackResponse[];
  awayAttacks: AttackResponse[];
  getPlayerNumber: (player_id: string) => number;
  getPlayerTeam: (player_id: string) => string;
}
export const AnalaysisCourt: React.FC<AnalaysisCourtProps> = ({
  showTeamHistory,
  homeServeZone,
  awayServeZone,
  componentId,
  homeAttacks,
  awayAttacks,
  getPlayerNumber,
  getPlayerTeam,
}) => {
  return (
    <div>
      <table className="table-auto top-11 border border-gray-500">
        <ServeZone
          showTeamHistory={showTeamHistory}
          idPrefix="away"
          serveZone={awayServeZone}
          componentId={String(componentId)}
          playerAttacks={
            showTeamHistory === "away" || showTeamHistory === "and"
              ? awayAttacks
              : []
          }
          getPlayerNumber={getPlayerNumber}
          getPlayerTeam={getPlayerTeam}
        />
        <ServeZone
          showTeamHistory={showTeamHistory}
          idPrefix="home"
          serveZone={homeServeZone}
          componentId={String(componentId)}
          playerAttacks={
            showTeamHistory === "home" || showTeamHistory === "and"
              ? homeAttacks
              : []
          }
          getPlayerNumber={getPlayerNumber}
          getPlayerTeam={getPlayerTeam}
        />
      </table>
    </div>
  );
};
