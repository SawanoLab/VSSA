import React from "react";
import Table from "../../composents/table";

const TeamIndex: React.FC = () => {
  const tableData = [
    {
      team_abbreviation: "ITA",
      team_name: "イタリア",
    },
  ];

  const header = [
    { header: "略称", accessor: "team_abbreviation" },
    { header: "名称", accessor: "team_name" },
  ];

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">チーム</h1>
        <button className="bg-red-400 hover:bg-red-500 text-white  py-1 px-4 rounded left-0">
          チームの削除
        </button>
        <button className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded">
          チームの追加
        </button>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={tableData} columns={header} />
    </div>
  );
};

export default TeamIndex;
