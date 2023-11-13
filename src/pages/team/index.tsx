import React, { useEffect } from "react";
import Table from "../../composents/table";
import { Link } from "react-router-dom";
import { getTeams } from "../../lib/api/api";
import { useAuth } from "../../hooks/use-auth";
import { useTeam } from "../../hooks/match/use-team";

const TeamIndex: React.FC = () => {
  const { username } = useAuth();
  const { teams, setTeamsData } = useTeam();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeams(username);
      let items = data.map((item: any) => {
        return {
          uuid: item.uuid,
          name: item.name,
          code: item.code,
          director: item.director,
          doctor: item.doctor,
          coach: item.coach,
          trainer: item.trainer,
          season_id: item.season_id,
          user_id: item.user_id,
        };
      });
      setTeamsData(items);
    };
    fetchData();
  }, []);

  const header = [{ header: "名称", accessor: "name" }];

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-3sm">チーム</h1>
        <button className="bg-red-400 hover:bg-red-500 text-white  py-1 px-4 rounded left-0">
          チームの削除
        </button>
        <Link
          to="/team/create"
          className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded"
        >
          チームの追加
        </Link>
      </div>
      <div className=" bg-blue-100 p-4 border" />
      <Table data={teams} columns={header} />
    </div>
  );
};

export default TeamIndex;
