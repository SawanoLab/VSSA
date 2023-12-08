import React from "react";

import { useCard } from "../../../hooks/card/use-cardController";
import ZoneSelect from "../ZoneSelect";

interface ReceptionZoneSelectProps {
  nextStep: string;
}

const AttackEndZoneSelect: React.FC<ReceptionZoneSelectProps> = ({
  nextStep
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  return (
    <ZoneSelect
      type={currentTeam}
      draw_type={currentTeam}
      title="アタック"
      subTitle="アタックエンドゾーンを選択してください"
      onClick={onClick}
    />
  );
};

export default AttackEndZoneSelect;
