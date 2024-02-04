import React from "react";

import { useCard } from "../../../../hooks/card/useCardController";
import Table from "../../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface ServeEvaluationProps {
  nextStep: string;
}

export const ServeEvaluation: React.FC<ServeEvaluationProps> = ({
  nextStep,
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
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
    <PlayCardLayout title="サーブ" subTitle="評価" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default ServeEvaluation;
