import React from 'react';

import ZoneSelect from "../ZoneSelect";



interface ServeZoneSelectProps {
  type: "home" | "away";
}
 
const ServeZoneSelect: React.FC<ServeZoneSelectProps> = (
  { type }
) => {
  return ( 
    <ZoneSelect
      type={type}
      title="サーブゾーン"
      subTitle="サーブゾーンを選択してください"
    />
   );
}
 
export default ServeZoneSelect;
