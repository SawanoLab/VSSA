import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import OnCourtSelect from "./OnCourtSelect";
import { SetterPositionName } from "../../types/player";
import { typeOfTeam } from "../../types/team";


export const renderOnCourtSelectTable = (
  type: typeOfTeam,
  courtZoneName: string[][],
  setterPositionHome: SetterPositionName,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
) => {
  return (
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
              uniformImage={ type === typeOfTeam.home ? "/uniform.png" : "/away_uniform.png" }
              courtZoneName={courtZoneName[row][col]}
              key={`${row}-${col}`}
              isSetter={ courtZoneName[row][col] === setterPositionHome }
              register={register}
              errors={errors}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
}
