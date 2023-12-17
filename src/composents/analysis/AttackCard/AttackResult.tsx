import React from "react";

import { AttackEvaluationType } from "../../../api-client/api";
import { useAttackHistory } from "../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../hooks/card/useCardController";
import Table from "../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface AttackEvalutionProps {
  nextStep: string;
}

export const AttackEvalution: React.FC<AttackEvalutionProps> = ({
  nextStep,
}) => {
  const { setAttackEvalution } = useAttackHistory();
  const { currentTeam, setCurrentStep } = useCard();
  /* eslint-disable */
  const onClick = (row: any) => {
    setCurrentStep(nextStep);
    setAttackEvalution(row.description);
  };

  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: AttackEvaluationType.Kill },
    { description: AttackEvaluationType.OverPass },
    { description: AttackEvaluationType.PossibleCover },
    { description: AttackEvaluationType.Blocked },
    { description: AttackEvaluationType.InPlay },
    { description: AttackEvaluationType.Error },
  ];
  return (
    <PlayCardLayout title="アタック" subTitle="評価" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default AttackEvalution;
