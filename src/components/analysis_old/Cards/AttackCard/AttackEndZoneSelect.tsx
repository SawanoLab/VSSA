import React from "react";

import { useAttackHistory } from "../../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../../hooks/card/useCardController";
import ZoneSelect from "../../ZoneSelect/ZoneSelect";
import PlayCardLayout from "../PlayCardLayout";

interface ReceptionZoneSelectProps {
  nextStep: string;
}

const AttackEndZoneSelect: React.FC<ReceptionZoneSelectProps> = ({
  nextStep,
}) => {
  const { setAttackEndZone } = useAttackHistory();
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = (Zone_id: number) => {
    setCurrentStep(nextStep);
    setAttackEndZone(Zone_id);
  };
  return (
    <PlayCardLayout
      type={currentTeam}
      title="アタック"
      subTitle="エンドゾーンを選択してください"
    >
      <ZoneSelect
        type={currentTeam}
        draw_type={currentTeam}
        onClick={onClick}
      />
    </PlayCardLayout>
  );
};

export default AttackEndZoneSelect;
