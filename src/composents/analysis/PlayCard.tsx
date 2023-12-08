import React from "react";

import { AnalysisStart } from "./AnalysisStart";
import AttackEndZoneSelect from "./AttackCard/AttackEndZoneSelect";
import AttackEvalution from "./AttackCard/AttackEvalution";
import AttackPlayer from "./AttackCard/AttackPlayer";
import AttackResult from "./AttackCard/AttackResult";
import AttackSkillType from "./AttackCard/AttackSkillType";
import BlockEvalution from "./BlockCard/BlockEvalution";
import BlockPlayer from "./BlockCard/BlockPlayer";
import ReceptionEvaluation from "./ReceptionCard/ReceptionEvaluation";
import ReceptionPlayer from "./ReceptionCard/ReceptionPlayer";
import ReceptionZoneSelect from "./ReceptionCard/ReceptionZoneSelect";
import ServeEndZone from "./ServeCard/ServeEndZone";
import { ServeEvaluation } from "./ServeCard/ServeEvaluation";
import ServeStartZone from "./ServeCard/ServeStartZone";
import { ServeTeamSelect } from "./ServeCard/ServeTeamSelect";
import { MatchRequest, TeamPlayers } from "../../api-client/api";
import { useCard } from "../../hooks/card/use-cardController";


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
  const { currentStep } = useCard();
  const renderStepComponent = () => {
    switch (currentStep) {
      case 'analysisStart':
        return <AnalysisStart match={match} nextStep='serveTeamSelect' />
      case 'serveTeamSelect':
        return <ServeTeamSelect match={match} homeOnCourtPlayer={homeOnCourtPlayer} awayOnCourtPlayer={awayOnCourtPlayer} nextStep='serveStartZone' />
      case 'receptionPlayer':
        return <ReceptionPlayer onCourtPlayer={awayOnCourtPlayer} nextStep='receptionZoneSelect' />
      case 'attackPlayer':
        return <AttackPlayer onCourtPlayer={homeOnCourtPlayer} nextStep='attackEvaluation' />
      case 'blockPlayer':
        return <BlockPlayer onCourtPlayer={homeOnCourtPlayer} nextStep='blockEvalution' />
      case 'serveStartZone':
        return <ServeStartZone nextStep='serveEvaluation' />
      case 'serveEvaluation':
        return <ServeEvaluation nextStep='ServeEndZone' />
      case 'ServeEndZone':
        return <ServeEndZone nextStep='receptionPlayer' />
      case 'receptionZoneSelect':
        return <ReceptionZoneSelect nextStep='receptionEvaluation' />
      case 'receptionEvaluation':
        return <ReceptionEvaluation nextStep='attackPlayer' />
      case 'attackEvaluation':
        return <AttackEvalution nextStep='attackSkillType' />
      case 'attackSkillType':
        return <AttackSkillType nextStep='AttackResult' />
      case 'AttackResult':
        return <AttackResult nextStep='AttackEndZoneSelect' />
      case 'AttackEndZoneSelect':
        return <AttackEndZoneSelect nextStep='blockPlayer' />
      case 'blockEvaluation':
        return <BlockEvalution nextStep='blockZone' />
      default:
        return null;
  }}
  return <div>{renderStepComponent()}</div>;
};

export default PlayCard;
