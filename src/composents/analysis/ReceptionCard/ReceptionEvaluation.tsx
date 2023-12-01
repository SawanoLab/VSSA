import React from "react";

import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface ServeEvaluationProps {}
export const ServeEvaluation: React.FC<ServeEvaluationProps> = () => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "エンド" },
    { description: "セット" },
  ];
  return (
    <PlayCardLayout title="レセプション" subTitle="評価">
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default ServeEvaluation;
