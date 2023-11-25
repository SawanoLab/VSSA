import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../../composents/LoadingSpinner";
import Table from "../../composents/Table";
import { useTeam } from "../../hooks/match/use-team";

const TeamIndex: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { teams, fetchTeams, teamLoading } = useTeam();

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (!teamLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [teamLoading]);

  const header = [{ header: "名称", accessor: "name" }];
  return (
    <div>
      {loading ? <LoadingSpinner /> : null}
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
      <div className=" bg-gray-200 h-0.5 p-4 border" />
      <Table data={teams} columns={header} />
    </div>
  );
};

export default TeamIndex;
