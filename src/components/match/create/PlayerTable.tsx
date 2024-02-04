import React from "react";

import { PlayerInfo } from "../../../api-client/api";
import Table from "../../Table";

interface Column {
  header: string;
  accessor: string;
}

interface PlayerTableProps {
  playerData: PlayerInfo[];
  columns: Column[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ playerData, columns }) => {
  return (
    <div>
      <div>
        <p className="text-sm text-gray-500 w-80">ベンチ選手</p>
        <Table data={playerData} columns={columns} tableHeight="200px" />
      </div>
    </div>
  );
};

export default PlayerTable;
