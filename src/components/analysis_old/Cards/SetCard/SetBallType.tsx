import React from "react";

import Table from "../../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface SetBallTypeProps {
  type: "home" | "away";
}
export const SetBallType: React.FC<SetBallTypeProps> = ({ type }) => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "High" },
    { description: "Medium" },
    { description: "Quick" },
    { description: "Other" },
  ];
  return (
    <PlayCardLayout title="セット" subTitle="ボールの種類" type={type}>
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default SetBallType;
