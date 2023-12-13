import React from "react";

import { useCard } from "../../../hooks/card/use-cardController";
import ZoneSelect from "../ZoneSelect/ZoneSelect";

interface ServeEndZoneProps {
  nextStep: string;
}

const ServeEndZone: React.FC<ServeEndZoneProps> = ({ nextStep }) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  return (
    <ZoneSelect
      type={currentTeam}
      draw_type={currentTeam}
      title="サーブゾーン"
      subTitle="サーブゾーンを選択してください"
      onClick={onClick}
    />
  );
};

export default ServeEndZone;
