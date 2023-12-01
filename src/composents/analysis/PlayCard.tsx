import React from "react";

import { AnalysisStart } from "./AnalysisStart";
import AttackEndZoneSelect from "./AttackCard/AttackEndZoneSelect";
import AttackEvalution from "./AttackCard/AttackEvalution";
import AttackPlayer from "./AttackCard/AttackPlayer";
import AttackSkillType from "./AttackCard/AttackSkillType";
import ReceptionEvaluation from "./ReceptionCard/ReceptionEvaluation";
import ReceptionPlayer from "./ReceptionCard/ReceptionPlayer";
import ReceptionZoneSelect from "./ReceptionCard/ReceptionZoneSelect";
import { ServeEvaluation } from "./ServeCard/ServeEvaluation";
import ServeStartZone from "./ServeCard/ServeStartZone";
import { ServeTeamSelect } from "./ServeCard/ServeTeamSelect";
import ServeZoneSelect from "./ServeCard/ServeZoneSelect";
import { MatchRequest, TeamPlayers } from "../../api-client/api";

interface PlayCardProps {
  match?: MatchRequest;
  homeOnCourtPlayer?: TeamPlayers[];
  awayOnCourtPlayer?: TeamPlayers[];
}

export const PlayCard: React.FC<PlayCardProps> = ({
  match,
  homeOnCourtPlayer,
  awayOnCourtPlayer,
}) => {
  return (
    <div>
      <AnalysisStart
        match={match}
      />
      <ServeTeamSelect
        match={match}
        homeOnCourtPlayer={homeOnCourtPlayer}
        awayOnCourtPlayer={awayOnCourtPlayer}
      />
      <ServeStartZone
        type="home"
      />
      <ServeEvaluation />
      <ServeZoneSelect
        type="home"
      />
      <ReceptionPlayer
        type="home"
        onCourtPlayer={awayOnCourtPlayer}
      />
      <ReceptionZoneSelect
        type="home"
      />
      <ReceptionEvaluation />
      <AttackPlayer
        type="home"
        onCourtPlayer={homeOnCourtPlayer}
      />
      <AttackEvalution />
      <AttackSkillType />
      <AttackEndZoneSelect
        type="home"
      />
    </div>
  );
};
