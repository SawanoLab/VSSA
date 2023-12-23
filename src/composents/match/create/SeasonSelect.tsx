import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { SelectBox } from "./SelectBox";
import { useSeason } from "../../../hooks/match/useSeason";

interface SeasonSelectProps {
  errors: FieldErrors<FieldValues>;
  seasonUUID: string;
  register: UseFormRegister<FieldValues>;
  setSeasonUUID: (uuid: string) => void;
}
export const SeasonSelect: React.FC<SeasonSelectProps> = ({
  errors,
  seasonUUID,
  register,
  setSeasonUUID,
}) => {
  const { seasons, getSeasonNames } = useSeason();
  const seasonNames = getSeasonNames(seasons);

  return (
    <SelectBox
      title="シーズン"
      register={register}
      options={seasonNames.map((season) => ({
        uuid: season.uuid,
        context: season.season_name,
      }))}
      optionDefalut="シーズンを選択"
      selectedValue={seasonUUID}
      onChange={setSeasonUUID}
      errors={errors}
    />
  );
};
