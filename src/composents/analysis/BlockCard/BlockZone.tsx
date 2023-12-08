import React from "react";

import ZoneSelect from "../ZoneSelect";

interface BlockZoneSelectProps {
  type: "home" | "away";
}

const BlockZone: React.FC<BlockZoneSelectProps> = ({ type }) => {
  return (
    <ZoneSelect
      type={type}
      draw_type={type}
      title="ブロック"
      subTitle="ブロックゾーンを選択してください"
    />
  );
};

export default BlockZone;
