import React, { useEffect } from "react";
import Table from "../../composents/table";
import { Link } from "react-router-dom";
import { getPlayers } from "../../lib/api/api";
import { useAuth } from "../../hooks/use-auth";
import { useTeam } from "../../hooks/match/use-team";
import { usePlayer } from "../../hooks/match/use-player";

const PlayerIndex: React.FC = () => {
  const { username } = useAuth();
  const { players, setPlayersData } = usePlayer();

  const header = [
    { header: "No.", accessor: "uuid" },
    { header: "コード", accessor: "player_number" },
    { header: "名", accessor: "name" },
    { header: "ポジション", accessor: "postion" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlayers(username);
      console.log(data);
      
      let items = data.map((item: any) => {
        return {
          uuid: item.uuid,
          name: item.name,
          player_number: item.player_number,
          code: item.code,
          postion: item.postion,
          weight: item.weight,
          height: item.height,
          user_id: item.user_id,
          team_id: item.team_id,
          season_id: item.season_id,
        };
      })
      setPlayersData(items);
    }
    fetchData();
  }, []);

  const tableData = [
    {
      number: 1,
      player_code: "ITA1",
      surname: "Donnarumma",
      name: "Gianluigi",
      nickname: "Gigi",
      position: "GK",
    },
    {
      number: 2,
      player_code: "ITA1",
      surname: "Donnarumma",
      name: "Gianluigi",
      nickname: "Gigi",
      position: "GK",
    },
  ];


  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">プレイヤー</h1>
        <Link to="create" className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded">
          新しいプレイヤー
        </Link>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={players} columns={header} />
    </div>
  );
};

export default PlayerIndex;
