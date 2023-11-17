import React from "react";

import OnCourtSelect from "./OnCourtSelect";
import { useMatch } from "../../hooks/match/matchProvider";
import { SetterPositionName } from "../../types/player";
import { typeOfTeam } from "../../types/team";

interface OnCourtSelectTableProps {
  type: typeOfTeam;
  courtZoneName: SetterPositionName[][];
}

const OnCourtSelectTable: React.FC<OnCourtSelectTableProps> = ({
  type,
  courtZoneName,
}) => {
  const { getSetterPosition } = useMatch();
  const setterPositionHome = getSetterPosition("home");
  const setterPositionAway = getSetterPosition("away");
  return (
    <table
      className={`table-auto absolute top-20 ${
        type === "home" ? "left-8" : "right-8"
      }`}
    >
      <tbody>
        {Array.from({ length: 3 }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length: 2 }).map((_, col) => (
              <OnCourtSelect
                type={type}
                uniformImage={
                  type === "home" ? "/uniform.png" : "/away_uniform.png"
                }
                key={`${row}-${col}`}
                isSetter={
                  courtZoneName[row][col] ===
                  (type === "home" ? setterPositionHome : setterPositionAway)
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OnCourtSelectTable;
