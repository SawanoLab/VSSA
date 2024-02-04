import React from "react";

import { AttackSkill } from "../../../../api-client/api";
import { useAttackHistory } from "../../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../../hooks/card/useCardController";
import Table from "../../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface AttackEvalutionProps {
  nextStep: string;
}
export const AttackEvalution: React.FC<AttackEvalutionProps> = ({
  nextStep,
}) => {
  const { setAttackSkill } = useAttackHistory();
  const { currentTeam, setCurrentStep } = useCard();
  /* eslint-disable */
  const onClick = (row: any) => {
    setCurrentStep(nextStep);
    setAttackSkill(row.description);
  };

  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: AttackSkill.HeadSpike },
    { description: AttackSkill.SoftSpike },
    { description: AttackSkill.Dink },
  ];
  return (
    <PlayCardLayout title="アタック" subTitle="スキルタイプ" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default AttackEvalution;
