import React from "react";

import { useCard } from "../../../../hooks/card/useCardController";
import ZoneSelect from "../../ZoneSelect/ZoneSelect";
import PlayCardLayout from "../PlayCardLayout";

interface ReceptionZoneSelectProps {
  nextStep: string;
}

const ReceptionZoneSelect: React.FC<ReceptionZoneSelectProps> = ({
  nextStep,
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);

  return (
    <PlayCardLayout
      type={currentTeam}
      title="レセプションゾーン"
      subTitle="レセプションゾーンを選択してください"
    >
      <ZoneSelect
        type={currentTeam}
        draw_type={currentTeam}
        onClick={onClick}
      />
    </PlayCardLayout>
  );
};

export default ReceptionZoneSelect;
