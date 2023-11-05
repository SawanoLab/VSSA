import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { postSeason } from "../../lib/api/api";


type Season = {
  seasonName: string;
  gameFormat: string;
  code: string;
  startDay: string;
  endDay: string;
};

const TeamCreate: React.FC = () => {
  const { username, isAuthenticated, isLoading } = useAuth();
  const [teamName, setTeamName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [seasons, setSeasons] = React.useState<Season[]>([]);
  const [seasonName, setSeasonName] = React.useState("");
  const [director, setDirector] = React.useState("");
  const [coach, setCoach] = React.useState("");
  const [trainer, setTrainer] = React.useState("");
  const [doctor, setDoctor] = React.useState("");

  useEffect(() => {
    console.log("username", username);
    console.log("isAuthenticated", isAuthenticated);
    console.log("isLoading", isLoading);
  }, []);

  const handleSubmit = async () => {
    if (
      seasonName === "" ||
      code === ""
    ) {
      alert("全ての入力を完了してください");
      return;
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
            defaultValue={"シーズン名"}
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
            defaultValue={"シーズン名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setSeasonName(e.target.value)}
          />
        </div>
        
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">
            監督
          </label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">
            コーチ
          </label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setCoach(e.target.value)}
          />
        </div>
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">
            トレーナー
          </label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setTrainer(e.target.value)}
          />
        </div>
        <div className="flex flex-row  m-1">
          <label className="text-gray-500 text-sm">
            ドクター
          </label>
          <input
            type="text"
            defaultValue={"名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setDoctor(e.target.value)}
          />
        </div>
        <Link
          to="/season"
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
