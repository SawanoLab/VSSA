import React, { useEffect, useState } from "react";
import { PlayerData } from "../../interface/player";
import PlayerTable from "./PlayerTable";
import PlayerUniform from "./PlayerUniform";

type TeamKbn = "home" | "away";

const TeamSelectorTable: React.FC<{
  teams: { uuid: string; name: string }[];
  players: PlayerData[];
  selectedHomeTeam: string;
  setSelectedHomeTeam: React.Dispatch<React.SetStateAction<string>>;
  selectAwayTeam: string;
  setSelectedAwayTeam: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  teams,
  players,
  selectedHomeTeam,
  setSelectedHomeTeam,
  selectAwayTeam,
  setSelectedAwayTeam,
}) => {
  const initPlayerBackNumber = [
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  const initPrevPlayerList = [
    ["", ""],
    ["", ""],
    ["", ""],
  ];
  const [homeTeamPlayers, setHomeTeamPlayers] = useState<PlayerData[]>([]);
  const [homePlayerBackNumber, setHomePlayerBackNumber] =
    useState(initPlayerBackNumber);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState<PlayerData[]>([]);
  const [awayPlayerBackNumber, setAwayPlayerBackNumber] =
    useState(initPlayerBackNumber);
  const [selectedHomePlayers, setSelectedHomePlayers] = useState<string[]>([]);
  const [selectedAwayPlayers, setSelectedAwayPlayers] = useState<string[]>([]);
  const [prevHomePlayersList, setPrevHomePlayersList] = useState<string[][]>(initPrevPlayerList);
  const [prevAwayPlayersList, setPrevAwayPlayersList] = useState<string[][]>(initPrevPlayerList);
  const [prevHomeLiberoList, setPrevHomeLiberoList] = useState<string[]>([]);
  const [prevAwayLiberoList, setPrevAwayLiberoList] = useState<string[]>([]);

  useEffect(() => {
    console.log("selectedHomePlayers", selectedHomePlayers);
  }, [selectedHomePlayers]);
  const filterTeamPlayers = (teamId: string) =>
    players.filter((player) => player.team_id === teamId);

  useEffect(() => {
    console.log("selectedHomeTeam", selectedHomePlayers);
  }, [selectedHomePlayers]);

  useEffect(() => {
    setHomeTeamPlayers(filterTeamPlayers(selectedHomeTeam));
  }, [selectedHomeTeam]);

  useEffect(() => {
    setAwayTeamPlayers(filterTeamPlayers(selectAwayTeam));
  }, [selectAwayTeam]);

  // チーム変更が起きた際に、背番号表示を初期化する
  useEffect(() => {
    setHomePlayerBackNumber(initPlayerBackNumber);
  }, [selectedHomeTeam]);

  useEffect(() => {
    setAwayPlayerBackNumber(initPlayerBackNumber);
  }, [selectAwayTeam]);

  // 現在選択されてない選手を取得する
  const getTeamPlayers = (players: PlayerData[], teamId: string) =>
    players.filter((player) => player.team_id === teamId);

  const selectPlayer = (
    playerList: PlayerData[],
    setSelectedPlayers: React.Dispatch<React.SetStateAction<string[]>>,
    setPlayerBackNumber: React.Dispatch<React.SetStateAction<number[][]>>,
    setPrevPlayerList: React.Dispatch<React.SetStateAction<string[][]>>,
    e: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const selectedPlayer = playerList.find(
      (player) => player.uuid === e.target.value
    );
    if (selectedPlayer) {
      setPrevPlayerList((prev) => {
        const next = [...prev];
        let oldPlayer = next[rowIndex][colIndex];
        setSelectedPlayers((prevPlayers) => {
          if (oldPlayer) {
            return prevPlayers
              .filter((player) => player !== oldPlayer!)
              .concat(selectedPlayer.uuid);
          } else {
            return prevPlayers.concat(selectedPlayer.uuid);
          }
        });
        next[rowIndex][colIndex] = selectedPlayer.uuid;
        return next;
      });
      setPlayerBackNumber((prev) => {
        const next = [...prev];
        next[rowIndex][colIndex] = selectedPlayer.player_number;
        return next;
      });
    }
  };

  const columns = [
    {
      header: "選手名",
      accessor: "name",
    },
    {
      header: "背番号",
      accessor: "player_number",
    },
    {
      header: "ポジション",
      accessor: "postion",
    },
  ];

  const handlePlayerSelect = (
    teamType: TeamKbn,
    e: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    if (teamType === "home") {
      selectPlayer(
        homeTeamPlayers,
        setSelectedHomePlayers,
        setHomePlayerBackNumber,
        setPrevHomePlayersList,
        e,
        rowIndex,
        colIndex
      );
    } else if (teamType === "away") {
      selectPlayer(
        awayTeamPlayers,
        setSelectedAwayPlayers,
        setAwayPlayerBackNumber,
        setPrevAwayPlayersList,
        e,
        rowIndex,
        colIndex
      );
    }
  };

  const handlePlayerLiberoSelect = (
    teamType: TeamKbn,
    e: React.ChangeEvent<HTMLSelectElement>,
    liberoIndex: number // Add
  ) => {
    const selectedPlayerUuid = e.target.value;
    if (teamType === "home") {
      // update previous state
      setPrevHomeLiberoList((prev) => {
        const next = [...prev];
        let oldPlayer = next[liberoIndex];

        setSelectedHomePlayers((prevPlayers) => {
          if (oldPlayer) {
            // remove old selected player
            return prevPlayers
              .filter((player) => player !== oldPlayer!)
              .concat(selectedPlayerUuid);
          } else {
            return prevPlayers.concat(selectedPlayerUuid);
          }
        });

        next[liberoIndex] = selectedPlayerUuid;
        return next;
      });
    } else if (teamType === "away") {
      setPrevAwayLiberoList((prev) => {
        const next = [...prev];
        let oldPlayer = next[liberoIndex];

        setSelectedAwayPlayers((prevPlayers) => {
          if (oldPlayer) {
            return prevPlayers
              .filter((player) => player !== oldPlayer!)
              .concat(selectedPlayerUuid);
          } else {
            return prevPlayers.concat(selectedPlayerUuid);
          }
        });

        next[liberoIndex] = selectedPlayerUuid;
        return next;
      });
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex m-1 relative">
        {/* homehomeTeamPlayers */}
        <table className="table-auto absolute top-20 left-8">
          <tbody>
            {Array.from({ length: 3 }).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: 2 }).map((_, col) => (
                  <PlayerUniform
                    players={homeTeamPlayers}
                    selectedPlayers={selectedHomePlayers}
                    handleSelect={(e) =>
                      handlePlayerSelect("home", e, row, col)
                    }
                    playerBackNumber={homePlayerBackNumber[row][col]}
                    uniformImage="/uniform.png"
                    row={row}
                    col={col}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* awayhomeTeamPlayers */}
        <table className="table-auto absolute top-20 right-8">
          <tbody>
            {Array.from({ length: 3 }).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: 2 }).map((_, col) => (
                  <PlayerUniform
                    players={awayTeamPlayers}
                    selectedPlayers={selectedAwayPlayers}
                    handleSelect={(e) =>
                      handlePlayerSelect("away", e, row, col)
                    }
                    playerBackNumber={awayPlayerBackNumber[row][col]}
                    uniformImage="/away_uniform.png"
                    row={row}
                    col={col}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <img
          src="/volleyball-court.png"
          alt="court"
          style={{ width: "660px", height: "440px" }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <PlayerTable
          teamPlayers={homeTeamPlayers}
          selectedPlayers={selectedHomePlayers}
          handlePlayerSelect={(e, row, col) =>
            handlePlayerSelect("home", e, row, col)
          }
          handlePlayerLiberoSelect={(e, liberoIndex) =>
            handlePlayerLiberoSelect("home", e, liberoIndex)
          }
          columns={columns}
        />
        <PlayerTable
          teamPlayers={awayTeamPlayers}
          selectedPlayers={selectedAwayPlayers}
          handlePlayerSelect={(e, row, col) =>
            handlePlayerSelect("away", e, row, col)
          }
          handlePlayerLiberoSelect={(e, liberoIndex) =>
            handlePlayerLiberoSelect("away", e, liberoIndex)
          }
          columns={columns}
        />
      </div>
    </div>
  );
};

export default TeamSelectorTable;
