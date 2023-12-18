import React from "react";

import Table from "../../composents/Table";
import { useSeason } from "../../hooks/match/useSeason";

export const SeasonList: React.FC = () => {
  const { seasons } = useSeason();
  const header = [
    { header: "開始日", accessor: "start_day" },
    { header: "終了日", accessor: "end_day" },
    { header: "シーズン名", accessor: "season_name" },
    { header: "GameFormat", accessor: "game_format" },
  ];

  return (
    <div>
      <Table data={seasons} columns={header} />
    </div>
  );
};
