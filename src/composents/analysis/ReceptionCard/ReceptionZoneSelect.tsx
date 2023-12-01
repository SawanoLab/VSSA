import React from "react";

import ZoneSelect from "../ZoneSelect";

interface ReceptionZoneSelectProps {
  type: "home" | "away";
}

const ReceptionZoneSelect: React.FC<ReceptionZoneSelectProps> = ({ type }) => {
  return (
    <ZoneSelect
      type={type}
      title="サーブゾーン"
      subTitle="サーブゾーンを選択してください"
    />
  );
};

export default ReceptionZoneSelect;
