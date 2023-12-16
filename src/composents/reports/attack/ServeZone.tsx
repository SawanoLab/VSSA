import React from "react";

import { AttackGet } from "../../../api-client/api";


interface ServeZoneProps {
  showTeamHistory: "home" | "away" | "and";
  idPrefix: string;
  serveZone: string[][];
  componentId: string;
  playerAttacks: AttackGet[];
  getPlayerNumber: (player_id: string) => number;
  getPlayerTeam: (player_id: string) => string;
}

export const ServeZone: React.FC<ServeZoneProps> = ({
  idPrefix,
  serveZone,
  componentId,
  playerAttacks,
  getPlayerNumber,
}) => {
  const findAttackerStartZone = (zoneNumber : number) => {
    const attack = playerAttacks.find((attack) => attack.attack_start_zone === zoneNumber);
    if (attack) {
      return getPlayerNumber(attack.player_id);
    }
    return "";
  }
  return (
    <table className="border border-gray-500 w-full">
      <tbody>
        {serveZone.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                className="items-center border border-gray-500 text-center"
                key={`${rowIndex}-${colIndex}`}
                style={{ width: "50px", height: "45px" }}
                >
                <span id={`${idPrefix}${cell}${componentId}`}>
                  {
                    findAttackerStartZone(Number(cell))
                  }
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
