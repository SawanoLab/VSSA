import OnCourtSelect from "./OnCourtSelect";
import { SetterPositionName } from "../../interface/player";
import { typeOfTeam } from "../../interface/team";


export const renderOnCourtSelectTable = (
  type: typeOfTeam,
  courtZoneName: SetterPositionName[][],
  setterPositionHome: SetterPositionName,
  setterPositionAway: SetterPositionName
) => (
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
