import React from "react";

import { useAttackHistory } from "../../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../../hooks/card/useCardController";
import ZoneSelect from "../../ZoneSelect/ZoneSelect";
import PlayCardLayout from "../PlayCardLayout";

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
    <PlayCardLayout
      type={currentTeam}
      title="アタック"
      subTitle="スタートゾーンを選択してください"
    >
      <ZoneSelect
        type={currentTeam}
        draw_type={currentTeam === "home" ? "away" : "home"}
        onClick={onClick}
      />
    </PlayCardLayout>
  );
};

export default AttackStartZoneSelect;
