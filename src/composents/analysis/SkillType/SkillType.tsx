import { ToggleButton } from "@mui/material";
import Table from "composents/Table";
import React, { FunctionComponent } from "react";

import { AttackSkill } from "../../../api-client/api";

interface ToggleButtonProps {
  skill: string;
}

export const SkillToggleButton: FunctionComponent<ToggleButtonProps> = ({
  skill,
}) => <ToggleButton value={skill}>{skill}</ToggleButton>;

interface SkillTypeProps {
  onClick: (context: string) => void;
}

export const SkillType: FunctionComponent<SkillTypeProps> = ({ onClick }) => {
  const header = [{ header: "説明", accessor: "description" }];
  const tableData = [
    { description: AttackSkill.Dink },
    { description: AttackSkill.HeadSpike },
    { description: AttackSkill.SoftSpike },
  ];
  return <Table columns={header} data={tableData} onRowClick={onClick} />;
};
