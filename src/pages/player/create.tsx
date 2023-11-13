import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { postPlayer } from "../../lib/api/api";
import { useSeason } from "../../hooks/match/use-season";
import { useTeam } from "../../hooks/match/use-team";

const PlayerCreate: React.FC = () => {
  const { username } = useAuth();
  const { getSeasonNames, seasons } = useSeason();
  const seasonNames = getSeasonNames(seasons);
  const { getTeamNames, teams } = useTeam();
  const teamNames = getTeamNames(teams);
  const [playerName, setPlayerName] = React.useState<string>("");
  const [ code, setCode] = React.useState<string>("");
  const [ playerNumber, setPlayerNumber] = React.useState<number>();
  const [ position, setPosition] = React.useState<string>("");
  const [ season, setSeason] = React.useState<string>("");
  const [ team, setTeam] = React.useState<string>("");
  const [ height, setHeight] = React.useState<number>();
  const [ weight, setWeight] = React.useState<number>();
  const handleSubmit = async () => {
    if (
      playerName === "" ||
      code === "" ||
      playerNumber === undefined ||
      position === "" ||
      season === "" ||
      team === ""
    ) {
      alert("全ての入力を完了してください");
      return;
    } else {
      const data = {
        name: playerName,
        player_number: playerNumber,
        code: code,
        position: position,
        team: team,
        height: height,
        weight: weight,
        season_id: season,
        user_id: username,
      };
      postPlayer(data);
    }
  }
  return (
    <div className="m-2">
      <h1>新しいプレイヤーを追加</h1>
      <form className="flex flex-wrap border bg-blue-50 p-5">
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            名前
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={"名前"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            背番号
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            defaultValue={"背番号"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setPlayerNumber(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-row m-1">
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
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            ポジション
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={"ポジション"}
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            シーズン
            <span className="text-red-500">*</span>
          </label>
          <select
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setSeason(e.target.value)}
          >
            {seasonNames.map((seasonName) => (
              <option value={seasonName.uuid}>{seasonName.season_name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row m-1">
          <label className="text-gray-500 text-sm">
            チーム
            <span className="text-red-500">*</span>
          </label>
          <select
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setTeam(e.target.value)}
          >
            {teamNames.map((teamName) => (
              <option value={teamName.uuid}>{teamName.name}</option>
            ))}
          </select>
        </div>
          <div className="flex flex-row m-1">
            <label className="text-gray-500 text-sm">
              身長
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              defaultValue={"身長"}
              className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row m-1">
            <label className="text-gray-500 text-sm">
              体重
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              defaultValue={"体重"}
              className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
              onChange={(e) => setWeight(Number(e.target.value))}
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
          to="/player"
          className="bg-gray-200 hover:text-gray-600 text-gray-500  py-1 px-4 rounded"
        >
          キャンセル
        </Link>
      </form>
    </div>
  );
};

export default PlayerCreate;
