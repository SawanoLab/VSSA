import React from "react";

import Table from "../Table";

type TeamTableComponentProps = {
  teamName?: string;
  teamData?: Record<string, { PlayerInfo: { name: string; postion: string } }>;
};
export const TeamTableComponent: React.FC<TeamTableComponentProps> = ({
  teamName,
  teamData,
}) => {
  const header = [
    { header: "ホーム", accessor: "name" },
    { header: "ポジション", accessor: "postion" },
  ];
  const data = teamData
    ? Object.values(teamData).map((item) => ({
        name: item.PlayerInfo.name,
        postion: item.PlayerInfo.postion,
      }))
    : [];

  return (
    <div className="text-ml text-gray-500">
      <h2>{teamName}</h2>
      <Table
      data={data}
      columns={header}
      fontSize="text-xs"
      />
    </div>
  );
};
