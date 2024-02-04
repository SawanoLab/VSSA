import Table from "composents/Table";
import React, { FunctionComponent } from "react";

import { AttackBallType } from "../../../api-client/api";

interface EvaluationType {
  onClick: (context: string) => void;
}

export const Evaluation: FunctionComponent<EvaluationType> = ({ onClick }) => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: AttackBallType.High },
    { description: AttackBallType.Medium },
    { description: AttackBallType.Quick },
    { description: AttackBallType.Other },
  ];
  return <Table columns={header} data={tableData} onRowClick={onClick} />;
};
