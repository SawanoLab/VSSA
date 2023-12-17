import React from "react";

import { useCard } from "../../../hooks/card/useCardController";
import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface BlockEvalutionProps {
  nextStep: string;
}
export const BlockEvalution: React.FC<BlockEvalutionProps> = ({ nextStep }) => {
  const { currentTeam, setCurrentStep } = useCard();
  const onClick = () => setCurrentStep(nextStep);

  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: "Possible cover" },
    { description: "Net Violation" },
  ];
  return (
    <PlayCardLayout title="ブロック" subTitle="評価" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default BlockEvalution;
