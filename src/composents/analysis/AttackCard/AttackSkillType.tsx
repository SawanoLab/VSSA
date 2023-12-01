import React from "react";

import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface AttackEvalutionProps {}
export const AttackEvalution: React.FC<AttackEvalutionProps> = () => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "ハードスパイク" },
    { description: "ソフトスパイク" },
    { description: "ティップ" },
  ];
  return (
    <PlayCardLayout title="アタック" subTitle="スキルタイプ">
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default AttackEvalution;
