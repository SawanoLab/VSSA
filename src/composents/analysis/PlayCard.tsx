import React from "react";

import { AnalysisStart } from "./AnalysisStart";
import ServeEndZone from "./ServeCard/ServeEndZone";
import { ServeEvaluation } from "./ServeCard/ServeEvaluation";
import ServeStartZone from "./ServeCard/ServeStartZone";
import { ServeTeamSelect } from "./ServeCard/ServeTeamSelect";
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
      <AnalysisStart match={match} />
      <ServeTeamSelect
        match={match}
        homeOnCourtPlayer={homeOnCourtPlayer}
        awayOnCourtPlayer={awayOnCourtPlayer}
      />
      <ServeStartZone type="home" />
      <ServeEvaluation />
      <ServeEndZone type="away" />
    </div>
  );
};
