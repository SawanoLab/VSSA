import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import { renderOnCourtSelectTable } from "./renderOnCourtSelectTable";
import { typeOfTeam } from "../../../types/team";
import {
  home_team_zone_name_row,
  away_team_zone_name_row,
} from "../../../types/team_zone_name_column";

interface onCourtPlayerSelectTableProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
export const OnCourtPlayerSelectTable: React.FC<
  onCourtPlayerSelectTableProps
> = ({ register, errors }) => {
  return (
    <div className="relative m-1">
      <div className="absolute top-12 left-16">
        <div className="flex flex-row justify-center items-center">
          {renderOnCourtSelectTable(
            typeOfTeam.home,
            home_team_zone_name_row,
            register,
            errors
          )}
          {renderOnCourtSelectTable(
            typeOfTeam.away,
            away_team_zone_name_row,
            register,
            errors
          )}
        </div>
      </div>
      <img
        src="/volleyball-court.png"
        alt="court"
        className="w-[660px] h-[440px]"
      />
    </div>
  );
};
