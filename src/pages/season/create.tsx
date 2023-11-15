import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";
import { postSeason } from "../../lib/api/seasons";

const SeasonCreate: React.FC = () => {
  const { username } = useAuth();
  const [seasonName, setSeasonName] = React.useState<string>("");
  const [gameFormat, setGameFormat] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [startDay, setStartDay] = React.useState<string>("");
  const [endDay, setEndDay] = React.useState<string>("");
  const handleSubmit = async () => {
    if (
      seasonName === "" ||
      gameFormat === "" ||
      code === "" ||
      startDay === "" ||
      endDay === ""
    ) {
      alert("全ての入力を完了してください");
      return;
    } else {
      const data = {
        season_name: seasonName,
        game_format: gameFormat,
        code: code,
        start_day: startDay,
        end_day: endDay,
        user_id: username,
      };
      postSeason(data);
    }
  };

  return (
    <div className="m-2">
      <h1>Info</h1>
      <form className="flex flex-wrap border bg-blue-50 p-5">
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            シーズン名
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
            ゲームフォーマット
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={"シーズン名"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setGameFormat(e.target.value)}
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
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap m-1">
          <label className="text-gray-500 text-sm">
            開始日
            <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            className="text-sm text-gray-500 border border-spacing-5 p-1"
            onChange={(e) => setStartDay(e.target.value)}
          />
          <label className="text-gray-500 text-sm">
            終了日
            <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            className="text-sm text-gray-500 border border-spacing-5 p-1"
            onChange={(e) => setEndDay(e.target.value)}
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
          to="/season"
          className="bg-gray-200 hover:text-gray-600 text-gray-500  py-1 px-4 rounded"
        >
          キャンセル
        </Link>
      </form>
    </div>
  );
};

export default SeasonCreate;
