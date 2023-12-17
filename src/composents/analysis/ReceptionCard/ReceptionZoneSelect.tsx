import React from "react";

import { useCard } from "../../../hooks/card/useCardController";
import ZoneSelect from "../ZoneSelect/ZoneSelect";

interface ReceptionZoneSelectProps {
  nextStep: string;
}

const ReceptionZoneSelect: React.FC<ReceptionZoneSelectProps> = ({
  nextStep,
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);

  return (
    <ZoneSelect
      type={currentTeam}
      draw_type={currentTeam}
      title="レセプションゾーン"
      subTitle="レセプションゾーンを選択してください"
      onClick={onClick}
    />
  );
};

export default ReceptionZoneSelect;
