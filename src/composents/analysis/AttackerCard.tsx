import React, { useEffect } from "react";

import AttackBall from "./AttackCard/AttackBall";
import AttackEndZoneSelect from "./AttackCard/AttackEndZoneSelect";
import AttackPlayer from "./AttackCard/AttackPlayer";
import AttackResult from "./AttackCard/AttackResult";
import AttackSkillType from "./AttackCard/AttackSkillType";
import AttackStartZoneSelect from "./AttackCard/AttackStartZoneSelect";
import { AttackTeamSelect } from "./AttackCard/AttackTeamSelect";
import { MatchRequest, TeamPlayers } from "../../api-client/api";
import { useCard } from "../../hooks/card/useCardController";

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
  const { currentStep, setCurrentStep, currentTeam } = useCard();

  useEffect(() => {
    setCurrentStep("SelectTeam");
  }, []);

  const renderStepComponent = () => {
    switch (currentStep) {
      case "SelectTeam":
        return <AttackTeamSelect match={match} nextStep="AttackPlayer" />;
      case "AttackPlayer":
        if (currentTeam === "home")
          return (
            <AttackPlayer
              onCourtPlayer={homeOnCourtPlayer}
              nextStep="AttackStartZoneSelect"
            />
          );
        return (
          <AttackPlayer
            onCourtPlayer={awayOnCourtPlayer}
            nextStep="AttackStartZoneSelect"
          />
        );
      case "AttackStartZoneSelect":
        return <AttackStartZoneSelect nextStep="AttackEvaluation" />;
      case "AttackEvaluation":
        return <AttackBall nextStep="AttackSkillType" />;
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
