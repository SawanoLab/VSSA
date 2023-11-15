import React from "react";
import { Link } from "react-router-dom";

import { useSeason } from "../../hooks/match/use-season";
import { useAuth } from "../../hooks/use-auth";
import { postTeam } from "../../lib/api/teams";

const TeamCreate: React.FC = () => {
  const { username } = useAuth();
  const { getSeasonNames, seasons } = useSeason();
  const seasonNames = getSeasonNames(seasons);
  const [teamName, setTeamName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [seasonName, setSeasonName] = React.useState("");
  const [director, setDirector] = React.useState("");
  const [coach, setCoach] = React.useState("");
  const [trainer, setTrainer] = React.useState("");
  const [doctor, setDoctor] = React.useState("");
  const handleSubmit = async () => {
    if (teamName === "" || code === "") {
      alert("全ての入力を完了してください");
      return;
    } else {
      const data = {
        name: teamName,
        code: code,
        director: director,
        coach: coach,
        trainer: trainer,
        doctor: doctor,
        season_id: seasonName,
        user_id: username,
      };
      try {
        const response = await postTeam(data);
        console.log("response", response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="m-2">
      <h1>チーム情報</h1>
      <form className="flex flex-wrap border bg-blue-50 p-5">
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            名称
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={"名称"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">
            コード
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={"コード"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">
            シーズン
            <span className="text-red-500">*</span>
          </label>
          <select
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setSeasonName(e.target.value)}
          >
            {seasonNames.map((seasonName) => (
              <option value={seasonName.uuid} key={seasonName.uuid}>{seasonName.season_name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">監督</label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">コーチ</label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setCoach(e.target.value)}
          />
        </div>
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">トレーナー</label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setTrainer(e.target.value)}
          />
        </div>
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">ドクター</label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setDoctor(e.target.value)}
          />
        </div>
        <Link
          to="/team"
          className="bg-blue-400 hover:bg-blue-500 text-white  py-1 px-4 rounded"
          onClick={handleSubmit}
        >
          作成
        </Link>
        <Link
          to="/team"
          className="bg-gray-200 hover:text-gray-600 text-gray-500  py-1 px-4 rounded"
        >
          キャンセル
        </Link>
      </form>
    </div>
  );
};

export default TeamCreate;
