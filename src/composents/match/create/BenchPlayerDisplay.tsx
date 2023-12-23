import React from "react";

import PlayerTable from "./PlayerTable";
import { useMatch } from "../../../hooks/match/useMatch";
import { typeOfTeam } from "../../../types/team";

interface BenchPlayerDisplayProps {}
export const BenchPlayerDisplay: React.FC<BenchPlayerDisplayProps> = () => {
  const { getOffCourtPlayers } = useMatch();

  const onCourtHomePlayers = getOffCourtPlayers(typeOfTeam.home);
  const onCourtAwayPlayers = getOffCourtPlayers(typeOfTeam.away);

  const columns = [
    { header: "選手名", accessor: "name" },
    { header: "背番号", accessor: "player_number" },
    { header: "ポジション", accessor: "postion" },
  ];

  return (
    <div className="flex flex-row justify-between w-[700px]">
      <div className="flex flex-col w-1/2">
        <PlayerTable
          playerData={onCourtHomePlayers.map((player) => player.PlayerInfo)}
          columns={columns}
        />
      </div>
      <div className="flex flex-col w-1/2">
        <PlayerTable
          playerData={onCourtAwayPlayers.map((player) => player.PlayerInfo)}
          columns={columns}
        />
      </div>
    </div>
  );
};
