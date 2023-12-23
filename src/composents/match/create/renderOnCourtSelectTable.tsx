import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import OnCourtSelect from "./OnCourtSelect";
import { typeOfTeam } from "../../../types/team";

export const renderOnCourtSelectTable = (
  type: typeOfTeam,
  courtZoneName: string[][],
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
) => {
  return (
    <table>
      <tbody>
        {Array.from({ length: 3 }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length: 2 }).map((_, col) => (
              <td key={`${row}-${col}`}>
                <OnCourtSelect
                  type={type}
                  uniformImage={
                    type === typeOfTeam.home
                      ? "/uniform.png"
                      : "/away_uniform.png"
                  }
                  courtZoneName={courtZoneName[row][col]}
                  key={`${row}-${col}`}
                  register={register}
                  errors={errors}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
