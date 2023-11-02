import React from "react";
import Table from "../../composents/table";

const PlayerIndex: React.FC = () => {
  const tableData = [
    {
      number: 1,
      player_code: "ITA1",
      surname: "Donnarumma",
      name: "Gianluigi",
      nickname: "Gigi",
      position: "GK",
    },
    {
      number: 2,
      player_code: "ITA1",
      surname: "Donnarumma",
      name: "Gianluigi",
      nickname: "Gigi",
      position: "GK",
    },
  ];

  const header = [
    { header: "No.", accessor: "number" },
    { header: "コード", accessor: "player_code" },
    { header: "姓", accessor: "surname" },
    { header: "名", accessor: "name" },
    { header: "ニックネーム", accessor: "nickname" },
    { header: "ポジション", accessor: "position" },
  ];

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">プレイヤー</h1>
        <button className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded">
          新しいプレイヤー
        </button>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={tableData} columns={header} />
    </div>
  );
};

export default PlayerIndex;
