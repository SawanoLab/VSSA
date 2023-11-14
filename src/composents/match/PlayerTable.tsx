import React from 'react';
import Table from '../table';
import { PlayerInfo } from "../../types/player";


interface PlayerTableProps {
  playerData: PlayerInfo[];
  columns: any[];
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
