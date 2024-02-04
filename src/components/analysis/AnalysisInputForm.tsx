import React, { FunctionComponent } from "react";

import { Evaluation } from "./Evaluation/Evaluation";
import PlayerSelect from "./PlayerSelect/PlayerSelect";
import { Result } from "./Result/Result";
import { SkillType } from "./SkillType/SkillType";
import { TeamSelect } from "./TeamSelect/TeamSelect";
import ZoneSelect from "./ZoneSelect/ZoneSelect";
import { MatchResponse, TeamPlayers } from "../../api-client/api";

interface AnalysisInputFormProps {
  match: MatchResponse;
  homeOnCourtPlayer: TeamPlayers[];
  awayOnCourtPlayer: TeamPlayers[];
  setHomeOnCourtPlayer: React.Dispatch<React.SetStateAction<TeamPlayers[]>>;
  setAwayOnCourtPlayer: React.Dispatch<React.SetStateAction<TeamPlayers[]>>;
}
export const AnalysisInputForm: FunctionComponent<AnalysisInputFormProps> = ({
  match,
  homeOnCourtPlayer,
  awayOnCourtPlayer,
}) => {
  const [team, setTeam] = React.useState<"home" | "away">("home");
  return (
    <div className="grid grid-cols-1">
      <div className="flex justify-center ">
        <TeamSelect
          type={team}
          setTeam={setTeam}
          match={match}
          onClick={(team_id: string) => {
            console.log(team_id);
          }}
        />
      </div>
      <div className="grid grid-cols-3 justify-items-center">
        <PlayerSelect
          type={team}
          onCourtPlayer={
            team === "home" ? homeOnCourtPlayer : awayOnCourtPlayer
          }
          onClick={(player_name: string, player_id: string) => {
            console.log(player_name, player_id);
          }}
        />
        <ZoneSelect
          draw_type={team === "home" ? "away" : "home"}
          onClick={(Zone_id: number) => {
            console.log(Zone_id);
          }}
        />
        <ZoneSelect
          draw_type={team}
          onClick={(Zone_id: number) => {
            console.log(Zone_id);
          }}
        />
        <div className="w-full">
          <Evaluation
            onClick={(context: string) => {
              console.log("context", context);
            }}
          />
        </div>
        <div className="w-full">
          <SkillType
            onClick={(context: string) => {
              console.log("context", context);
            }}
          />
        </div>
        <div className="w-full">
          <Result
            onClick={(context: string) => {
              console.log("context", context);
            }}
          />
        </div>
      </div>
    </div>
  );
};
