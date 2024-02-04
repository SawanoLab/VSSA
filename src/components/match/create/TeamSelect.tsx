import React, { memo, useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { SelectBox } from "./SelectBox";
import { useTeam } from "../../../hooks/match/useTeam";

interface TeamSelectProps {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  homeTeamUUID: string;
  awayTeamUUID: string;
  setHomeTeamUUID: (uuid: string) => void;
  setAwayTeamUUID: (uuid: string) => void;
}
const TeamSelect: React.FC<TeamSelectProps> = ({
  errors,
  register,
  homeTeamUUID,
  awayTeamUUID,
  setHomeTeamUUID,
  setAwayTeamUUID,
}) => {
  const { teams, fetchTeams } = useTeam();
  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <div className="flex flex-row m-1">
      <SelectBox
        title="ホームチーム"
        register={register}
        options={teams.map((team) => ({
          uuid: team.uuid,
          context: team.name,
        }))}
        optionDefalut="ホームチームを選択"
        selectedValue={homeTeamUUID}
        onChange={setHomeTeamUUID}
        errors={errors}
      />
      <SelectBox
        title="アウェイチーム"
        register={register}
        options={teams.map((team) => ({
          uuid: team.uuid,
          context: team.name,
        }))}
        optionDefalut="アウェイチームを選択"
        selectedValue={awayTeamUUID}
        onChange={setAwayTeamUUID}
        errors={errors}
      />
    </div>
  );
};
export default memo(TeamSelect);
