import React from "react";

import ZoneSelect from "../../ZoneSelect/ZoneSelect";
import PlayCardLayout from "../PlayCardLayout";

interface BlockZoneSelectProps {
  type: "home" | "away";
}

const BlockZone: React.FC<BlockZoneSelectProps> = ({ type }) => {
  return (
    <PlayCardLayout
      type={type}
      title="ブロック"
      subTitle="ブロックゾーンを選択してください"
    >
      <ZoneSelect
        type={type}
        draw_type={type}
      />
    </PlayCardLayout>
  );
};

export default BlockZone;
