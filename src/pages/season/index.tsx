import React from "react";
import Table from "../../composents/table";

const SeasonIndex: React.FC = () => {
  const tableData = [
    {
      start_day: "2021-06-11",
      end_day: "2021-07-12",
      season_name: "EURO2020",
      game_format: "INDOOR",
    },
  ];

  const header = [
    { header: "開始日", accessor: "start_day" },
    { header: "終了日", accessor: "end_day" },
    { header: "シーズン名", accessor: "season_name" },
    { header: "GameFormat", accessor: "game_format" },
  ];

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">シーズン</h1>
        <button className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded">
          シーズンを作成
        </button>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={tableData} columns={header} />
    </div>
  );
};

export default SeasonIndex;
