import React from "react";

import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface ServeEvaluationProps {}
export const ServeEvaluation: React.FC<ServeEvaluationProps> = () => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "Ace - エラーパス" },
    { description: "Hard serve - バッドパス" },
    { description: "Netral serve - 通常のパス" },
    { description: "Very hard serve - 非常にハードなパス" },
    { description: "Easy serve - 簡単なパス" },
    { description: "Service error - サービスエラー" },
  ];
  return (
    <PlayCardLayout title="サーブ" subTitle="評価">
      <Table columns={header} data={tableData} />
    </PlayCardLayout>
  );
};
export default ServeEvaluation;
