import React from "react";

import { useCard } from "../../../../hooks/card/useCardController";
import ZoneSelect from "../../ZoneSelect/ZoneSelect";
import PlayCardLayout from "../PlayCardLayout";

interface ServeEndZoneProps {
  nextStep: string;
}

const ServeEndZone: React.FC<ServeEndZoneProps> = ({ nextStep }) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  return (
    <PlayCardLayout
      type={currentTeam}
      title="サーブゾーン"
      subTitle="サーブゾーンを選択してください"
    >
      <ZoneSelect
        type={currentTeam}
        draw_type={currentTeam}
        onClick={onClick}
      />
    </PlayCardLayout>
  );
};

export default ServeEndZone;
