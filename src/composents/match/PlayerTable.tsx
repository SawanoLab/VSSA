import React from 'react';

import { PlayerInfo } from "../../types/player";
import Table from '../table';


interface Column {
  header: string;
  accessor: string;
}

interface PlayerTableProps {
  playerData: PlayerInfo[];
  columns: Column[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ playerData, columns }) =>{
  return (
    <div>
      <div>
        <p className="text-sm text-gray-500  p-1 w-80">ベンチ選手</p>
        <Table
          data={playerData}
          columns={columns}
          />
      </div>
    </div>
  )
}

export default PlayerTable;
