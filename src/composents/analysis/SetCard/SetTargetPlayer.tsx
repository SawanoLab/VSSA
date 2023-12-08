import React from "react";

import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface SetTragetPlayereProps {
  type: "home" | "away";
}
export const SetTragetPlayere: React.FC<SetTragetPlayereProps> = ({ type }) => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "フロント" },
    { description: "センター" },
    { description: "Quick" },
    { description: "Other" },
  ];
  return (
    <PlayCardLayout title="セット" subTitle="ターゲットプレイヤー" type={type}>
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default SetTragetPlayere;
