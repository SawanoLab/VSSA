import React from "react";

import { useAttackHistory } from "../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../hooks/card/useCardController";
import ZoneSelect from "../ZoneSelect/ZoneSelect";

interface ReceptionZoneSelectProps {
  nextStep: string;
}

const AttackStartZoneSelect: React.FC<ReceptionZoneSelectProps> = ({
  nextStep,
}) => {
  const { setAttackStartZone } = useAttackHistory();
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = (Zone_id: number) => {
    setCurrentStep(nextStep);
    setAttackStartZone(Zone_id);
  };
  return (
    <ZoneSelect
      type={currentTeam}
      draw_type={currentTeam === "home" ? "away" : "home"}
      title="アタック"
      subTitle="スタートゾーンを選択してください"
      onClick={onClick}
    />
  );
};

export default AttackStartZoneSelect;
