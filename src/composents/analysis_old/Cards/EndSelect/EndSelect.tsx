import React from "react";

import Table from "../../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface BlockEvalutionProps {
  type: "home" | "away";
}
export const BlockEvalution: React.FC<BlockEvalutionProps> = ({ type }) => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "アタック" },
    { description: "ディグ" },
    { description: "セット" },
  ];
  return (
    <PlayCardLayout title="エンド" subTitle="スキル" type={type}>
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default BlockEvalution;
