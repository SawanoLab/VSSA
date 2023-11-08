// PlayerTable.tsx
import React, { ChangeEvent } from 'react';
import Table from '../table';
import PlayerSelection from './PlayerSelection';
import { PlayerData } from "../../interface/player";

interface PlayerTableProps {
  teamPlayers: PlayerData[];
  selectedPlayers: string[];
  handlePlayerSelect: (e: ChangeEvent<HTMLSelectElement>, row: number, col: number) => void;
  handlePlayerLiberoSelect: (e: ChangeEvent<HTMLSelectElement>, liberoIndex: number) => void;
  columns: any[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ teamPlayers, selectedPlayers, handlePlayerSelect, handlePlayerLiberoSelect, columns }) => (
  <div>
    <p className="text-sm text-gray-500  p-1 w-80">リベロを選択</p>
    <div className="flex flex-col w-2/5">
      <div className='my-1'>
      <PlayerSelection
        teamPlayers={teamPlayers}
        selectedPlayers={selectedPlayers}
        handleSelect={handlePlayerLiberoSelect}
        row={0}
        col={0}
        />
      </div>
      <div className='my-1'>

      <PlayerSelection
        teamPlayers={teamPlayers}
        selectedPlayers={selectedPlayers}
        handleSelect={handlePlayerLiberoSelect}
        row={1}
        col={0}
        />
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-500  p-1 w-80">ベンチ選手</p>
      <Table
        data={teamPlayers.filter((player) => !selectedPlayers.includes(player.uuid))}
        columns={columns}
      />
    </div>
  </div>
);

export default PlayerTable;
