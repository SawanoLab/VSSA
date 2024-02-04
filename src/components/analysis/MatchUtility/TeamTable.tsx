import Table from "components/Table";
import React from "react";

type TeamTableProps = {
  teamData?: Record<string, { PlayerInfo: { name: string; postion: string } }>;
};
export const TeamTable: React.FC<TeamTableProps> = ({ teamData }) => {
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
      <Table
        data={data}
        columns={header}
        fontSize="text-xs"
        tableHeight="240px"
      />
    </div>
  );
};
