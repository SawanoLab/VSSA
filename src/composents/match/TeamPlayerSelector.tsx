import React from "react";
import PlayerTable from "./PlayerTable";
import OnCourtSelect from "./OnCourtSelect";
import SetPositionSelect from "./SetPositionSelect";
import LiberoPlayerSelect from "./LiberoPlayerSelection";
import { useMatch } from "../../hooks/match/matchProvider";


const TeamPlayerSelector: React.FC = () => {
  const { getOffCourtPlayers } = useMatch();
  const onCourtHomePlayers = getOffCourtPlayers("home");
  const onCourtAwayPlayers = getOffCourtPlayers("away");

  const columns = [
    { header: "選手名", accessor: "name" },
    { header: "背番号", accessor: "player_number" },
    { header: "ポジション", accessor: "postion" },
  ];

  return (
    <div className="flex flex-col justify-between">
      <div className="flex m-1 relative">
        <table className="table-auto absolute top-20 left-8">
          <tbody>
          {Array.from({ length: 3 }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: 2 }).map((_, col) => (
                <OnCourtSelect
                  type="home"
                  uniformImage={'/uniform.png'}
                  key={`${row}-${col}`}
                />
              ))}
            </tr>
          ))}
          </tbody>
        </table>
        <table className="table-auto absolute top-20 right-8">
          <tbody>
          {Array.from({ length: 3 }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: 2 }).map((_, col) => (
                <OnCourtSelect
                  type="away"
                  uniformImage={'/away_uniform.png'}
                  key={`${row}-${col}`}
                />
              ))}
            </tr>
          ))}
          </tbody>
        </table>
        <img src="/volleyball-court.png" alt="court" style={{ width: "660px", height: "440px" }} />
      </div>
      <div className="flex flex-row justify-between">
        <SetPositionSelect />
        <SetPositionSelect />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-2/5">
          <p className="text-sm text-gray-500 p-1 w-50">リベロを選択</p>
          <div className="my-1">
            <LiberoPlayerSelect type="home"/>
            <LiberoPlayerSelect type="home" />
          </div>
        </div>
        <div className="flex flex-col w-2/5">
          <p className="text-sm text-gray-500 p-1 w-50">リベロを選択</p>
          <div className="my-1">
            <LiberoPlayerSelect type="away"/>
            <LiberoPlayerSelect type="away" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <PlayerTable
          playerData={onCourtHomePlayers.map((player) => player.PlayerInfo)}
          columns={columns}
        />
        <PlayerTable
          playerData={onCourtAwayPlayers.map((player) => player.PlayerInfo)}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default TeamPlayerSelector;
