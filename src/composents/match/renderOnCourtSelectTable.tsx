import OnCourtSelect from "./OnCourtSelect";
import { SetterPositionName } from "../../types/player";
import { typeOfTeam } from "../../types/team";


export const renderOnCourtSelectTable = (
  type: typeOfTeam,
  courtZoneName: SetterPositionName[][],
  setterPositionHome: SetterPositionName,
  setterPositionAway: SetterPositionName
) => (
  <table
    className={`table-auto absolute top-20 ${
      type === typeOfTeam.home ? "left-8" : "right-8"
    }`}
  >
    <tbody>
      {Array.from({ length: 3 }).map((_, row) => (
        <tr key={row}>
          {Array.from({ length: 2 }).map((_, col) => (
            <OnCourtSelect
              type={type}
              uniformImage={
                type === typeOfTeam.home ? "/uniform.png" : "/away_uniform.png"
              }
              key={`${row}-${col}`}
              isSetter={
                courtZoneName[row][col] ===
                (type === typeOfTeam.home ? setterPositionHome : setterPositionAway)
              }
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
