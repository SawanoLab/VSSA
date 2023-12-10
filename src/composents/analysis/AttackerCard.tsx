import React, { useEffect } from "react";

import AttackEndZoneSelect from "./AttackCard/AttackEndZoneSelect";
import AttackEvalution from "./AttackCard/AttackEvalution";
import AttackPlayer from "./AttackCard/AttackPlayer";
import AttackResult from "./AttackCard/AttackResult";
import AttackSkillType from "./AttackCard/AttackSkillType";
import { ServeTeamSelect } from "./ServeCard/ServeTeamSelect";
import { MatchRequest, TeamPlayers } from "../../api-client/api";
import { useCard } from "../../hooks/card/use-cardController";

interface AttackerCardProps {
  match?: MatchRequest;
  homeOnCourtPlayer?: TeamPlayers[];
  awayOnCourtPlayer?: TeamPlayers[];
}

export const AttackerCard: React.FC<AttackerCardProps> = ({
  match,
  homeOnCourtPlayer,
  awayOnCourtPlayer,
}) => {
  const { currentStep, setCurrentStep } = useCard();
  useEffect(() => {
    setCurrentStep("SelectTeam");
  }, []);
  const renderStepComponent = () => {
    switch (currentStep) {
      case "SelectTeam":
        return <ServeTeamSelect match={match} homeOnCourtPlayer={homeOnCourtPlayer} awayOnCourtPlayer={awayOnCourtPlayer} nextStep='AttackPlayer' />
      case "AttackPlayer":
        return (<AttackPlayer onCourtPlayer={homeOnCourtPlayer} nextStep="AttackEvaluation" />);
      case "AttackEvaluation":
        return <AttackEvalution nextStep="AttackSkillType" />;
      case "AttackSkillType":
        return <AttackSkillType nextStep="AttackResult" />;
      case "AttackResult":
        return <AttackResult nextStep="AttackEndZoneSelect" />;
      case "AttackEndZoneSelect":
        return <AttackEndZoneSelect nextStep="SelectTeam" />;
      default:
        return null;
    }
  };
  return <div>{renderStepComponent()}</div>;
};

export default AttackerCard;
