import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../composents/table";
import { getSeasons } from "../../lib/api/api";
import { useAuth } from "../../hooks/use-auth";


interface seaonsData {
  uuid: string;
  start_day: string;
  end_day: string;
  season_name: string;
  game_format: string;
}

const SeasonIndex: React.FC = () => {
  const [seaons, setSeasons] = React.useState<seaonsData[]>([]);
  const { username } = useAuth();


  const header = [
    { header: "開始日", accessor: "start_day" },
    { header: "終了日", accessor: "end_day" },
    { header: "シーズン名", accessor: "season_name" },
    { header: "GameFormat", accessor: "game_format" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeasons(username);
      let item = data.map((item: any) => {
        return {
          uuid: item.uuid,
          start_day: item.start_day,
          end_day: item.end_day,
          season_name: item.season_name,
          game_format: item.game_format,
        };
      })
      setSeasons(item);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">シーズン</h1>
          <Link to="/season/create"
          className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded">
          シーズンを作成
          </Link>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={seaons} columns={header} />
    </div>
  );
};

export default SeasonIndex;
