import React from "react";

import { useCard } from "../../../hooks/card/use-cardController";
import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface AttackEvalutionProps {
  nextStep: string;
}
export const AttackEvalution: React.FC<AttackEvalutionProps> = ({
  nextStep,
}) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "High" },
    { description: "Medium" },
    { description: "Quick" },
    { description: "Other" },
  ];
  return (
    <PlayCardLayout title="アタック" subTitle="評価" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default AttackEvalution;
