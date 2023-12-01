import React from "react";

import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface AttackEvalutionProps {}
export const AttackEvalution: React.FC<AttackEvalutionProps> = () => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "High" },
    { description: "Medium" },
    { description: "Quick" },
    { description: "Other" },
  ];
  return (
    <PlayCardLayout title="アタック" subTitle="評価">
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default AttackEvalution;
