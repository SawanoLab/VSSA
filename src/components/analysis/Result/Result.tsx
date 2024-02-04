// import PlayCardLayout from "composents/analysis/Cards/PlayCardLayout";
import Table from "components/Table";
import React, { FunctionComponent } from "react";

import { AttackEvaluationType } from "../../../api-client/api";

interface ResultProps {
  onClick: (context: string) => void;
}
export const Result: FunctionComponent<ResultProps> = ({ onClick }) => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: AttackEvaluationType.Kill },
    { description: AttackEvaluationType.OverPass },
    { description: AttackEvaluationType.PossibleCover },
    { description: AttackEvaluationType.Blocked },
    { description: AttackEvaluationType.InPlay },
    { description: AttackEvaluationType.Error },
  ];
  return <Table columns={header} data={tableData} onRowClick={onClick} />;
};
