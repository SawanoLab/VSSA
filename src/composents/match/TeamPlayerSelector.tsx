import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import LiberoPlayerSelect from "./LiberoPlayerSelection";
import PlayerTable from "./PlayerTable";
import { renderOnCourtSelectTable } from "./renderOnCourtSelectTable";
import SetPositionSelect from "./SetPositionSelect";
import { useMatch } from "../../hooks/match/useMatch";
import { SetterPositionName } from "../../types/player";
import { typeOfTeam } from "../../types/team";
import {
  home_team_zone_name_row,
  away_team_zone_name_row,
} from "../../types/team_zone_name_column";

interface TeamSelectorTableProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const TeamPlayerSelector: React.FC<TeamSelectorTableProps> = ({
  register,
  errors,
}) => {
  const { getOffCourtPlayers, getSetterPosition } = useMatch();
  const setterPositionHome = getSetterPosition(typeOfTeam.home);
  const setterPositionAway = getSetterPosition(typeOfTeam.away);
  const onCourtHomePlayers = getOffCourtPlayers(typeOfTeam.home);
  const onCourtAwayPlayers = getOffCourtPlayers(typeOfTeam.away);

  const courtHomeZoneName: SetterPositionName[][] = [
    [SetterPositionName.Z5, SetterPositionName.Z4],
    [SetterPositionName.Z6, SetterPositionName.Z3],
    [SetterPositionName.Z1, SetterPositionName.Z2],
  ];
  const courtAwayZoneName: SetterPositionName[][] = [
    [SetterPositionName.Z2, SetterPositionName.Z1],
    [SetterPositionName.Z3, SetterPositionName.Z6],
    [SetterPositionName.Z4, SetterPositionName.Z5],
  ];

  const columns = [
    { header: "選手名", accessor: "name" },
    { header: "背番号", accessor: "player_number" },
    { header: "ポジション", accessor: "postion" },
  ];

  return (
    <div className="flex flex-col justify-between">
      <div className="flex m-1 relative">
        {renderOnCourtSelectTable(
          typeOfTeam.home,
          home_team_zone_name_row,
          setterPositionHome,
          register,
          errors
        )}
        {renderOnCourtSelectTable(
          typeOfTeam.away,
          away_team_zone_name_row,
          setterPositionAway,
          register,
          errors
        )}
        <img
          src="/volleyball-court.png"
          alt="court"
          style={{ width: "660px", height: "440px" }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <SetPositionSelect
          type={typeOfTeam.home}
          courtZoneName={courtHomeZoneName}
        />
        <SetPositionSelect
          type={typeOfTeam.away}
          courtZoneName={courtAwayZoneName}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <p className="text-sm text-gray-500 p-1 w-50">リベロを選択</p>
          <div className="my-1">
            <LiberoPlayerSelect type={typeOfTeam.home} />
            <LiberoPlayerSelect type={typeOfTeam.home} />
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <p className="text-sm text-gray-500 p-1 w-100">リベロを選択</p>
          <div className="my-1">
            <LiberoPlayerSelect type={typeOfTeam.away} />
            <LiberoPlayerSelect type={typeOfTeam.away} />
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
