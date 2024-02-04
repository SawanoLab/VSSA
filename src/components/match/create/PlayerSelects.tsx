import { BenchPlayerDisplay } from "components/match/create/BenchPlayerDisplay";
import { LiberoPlayerSelects } from "components/match/create/LiberoPlayerSelects";
import { OnCourtPlayerSelectTable } from "components/match/create/OnCourtPlayerSelectTable";
import { useMatch } from "hooks/match/useMatch";
import { usePlayer } from "hooks/match/usePlayer";
import { useTeam } from "hooks/match/useTeam";
import React, { useEffect } from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface PlayerSelectsProps {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  homeTeamUUID: string;
  awayTeamUUID: string;
}
export const PlayerSelects: React.FC<PlayerSelectsProps> = ({
  errors,
  register,
  homeTeamUUID,
  awayTeamUUID,
}) => {
  const { setTeamPlayer } = useMatch();
  const { players, getTeamPlayers } = usePlayer();
  const { teams, getTeamName } = useTeam();

  useEffect(() => {
    setTeamPlayer(
      "away",
      getTeamName(awayTeamUUID),
      getTeamPlayers(players, awayTeamUUID)
    );
    setTeamPlayer(
      "home",
      getTeamName(homeTeamUUID),
      getTeamPlayers(players, homeTeamUUID)
    );
  }, [homeTeamUUID, awayTeamUUID, teams, players]);
  return (
    <div className="flex flex-col justify-between">
      <OnCourtPlayerSelectTable register={register} errors={errors} />
      <LiberoPlayerSelects />
      <BenchPlayerDisplay />
    </div>
  );
};
