import React from "react";

import { useCard } from "../../../hooks/card/use-cardController";
import Table from "../../Table";
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
    { description: "アタック" },
    { description: "セット" },
  ];
  return (
    <PlayCardLayout title="レセプション" subTitle="評価" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default ServeEvaluation;
