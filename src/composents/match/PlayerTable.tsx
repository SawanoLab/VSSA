import React from "react";

import { PlayerGet } from "../../api-client/api";
import Table from "../Table";

interface Column {
  header: string;
  accessor: string;
}

interface PlayerTableProps {
  playerData: PlayerGet[];
  columns: Column[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ playerData, columns }) => {
  return (
    <div>
      <div>
        <p className="text-sm text-gray-500  p-1 w-80">ベンチ選手</p>
        <Table data={playerData} columns={columns} />
      </div>
    </div>
  );
};

export default PlayerTable;
