import React from "react";

import { AttackBallType } from "../../../../api-client/api";
import { useAttackHistory } from "../../../../hooks/analysis/attack/useAttackHistory";
import { useCard } from "../../../../hooks/card/useCardController";
import Table from "../../../Table";
import PlayCardLayout from "../PlayCardLayout";

interface AttackBallProps {
  nextStep: string;
}
export const AttackBall: React.FC<AttackBallProps> = ({ nextStep }) => {
  const { setAttackBallType } = useAttackHistory();
  const { currentTeam, setCurrentStep } = useCard();
  /* eslint-disable */
  const onClick = (row: any) => {
    setCurrentStep(nextStep);
    setAttackBallType(row.description);
  };
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: AttackBallType.High },
    { description: AttackBallType.Medium },
    { description: AttackBallType.Quick },
    { description: AttackBallType.Other },
  ];
  return (
    <PlayCardLayout title="アタック" subTitle="評価" type={currentTeam}>
      <Table columns={header} data={tableData} onRowClick={onClick} />
    </PlayCardLayout>
  );
};
export default AttackBall;
