import React from "react";

import ZoneSelect from "../ZoneSelect";

interface ReceptionZoneSelectProps {
  type: "home" | "away";
}

const AttackEndZoneSelect: React.FC<ReceptionZoneSelectProps> = ({ type }) => {
  return (
    <ZoneSelect
      type={type}
      title="アタック"
      subTitle="アタックエンドゾーンを選択してください"
    />
  );
};

export default AttackEndZoneSelect;
