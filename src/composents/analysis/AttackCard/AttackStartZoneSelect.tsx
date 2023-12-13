import React from "react";

import { useAttackHistory } from "../../../hooks/analysis/attack/use-attackHistory";
import { useCard } from "../../../hooks/card/use-cardController";
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
  }
  return (
    <ZoneSelect
      type={currentTeam}
      draw_type={currentTeam}
      title="アタック"
      subTitle="エンドゾーンを選択してください"
      onClick={onClick}
    />
  );
};

export default AttackStartZoneSelect;
