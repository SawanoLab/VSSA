import React from "react";
import { Link } from "react-router-dom";

import { InputForm, SelectForm } from "./InputForm";
import { useSeason } from "../../hooks/match/use-season";
import { useTeam } from "../../hooks/match/use-team";
import { useAuth } from "../../hooks/use-auth";
import { postPlayer } from "../../lib/api/players";

const PlayerCreate: React.FC = () => {
  const { username } = useAuth();
  const { getSeasonNames, seasons } = useSeason();
  const seasonNames = getSeasonNames(seasons);
  const { getTeamNames, teams } = useTeam();
  const teamNames = getTeamNames(teams);

  const [playerName, setPlayerName] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [playerNumber, setPlayerNumber] = React.useState<number>();
  const [position, setPosition] = React.useState<string>("");
  const [season, setSeason] = React.useState<string>("");
  const [team, setTeam] = React.useState<string>("");
  const [height, setHeight] = React.useState<number>();
  const [weight, setWeight] = React.useState<number>();

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
  };

  return (
    <div className="m-2">
      <h1>新しいプレイヤーを追加</h1>
      <form className="grid grid-cols-2 gap-4">
        <InputForm
          label="名前"
          isRequired={true}
          type="text"
          defaultValue={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <InputForm
          label="背番号"
          isRequired={false}
          type="number"
          defaultValue={playerNumber?.toString() || ""}
          onChange={(e) => setPlayerNumber(Number(e.target.value))}
        />
        <InputForm
          label="コード"
          isRequired={true}
          type="text"
          defaultValue={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <InputForm
          label="ポジション"
          isRequired={true}
          type="text"
          defaultValue={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <SelectForm
          label="シーズン"
          isRequired={true}
          defaultTitle="シーズンを選択"
          items={seasonNames.map((season) => ({
            uuid: season.uuid,
            name: season.season_name,
          }))}
          onChange={(e) => setSeason(e.target.value)}
        />
        <SelectForm
          label="チーム"
          isRequired={true}
          defaultTitle="チームを選択"
          items={teamNames}
          onChange={(e) => setTeam(e.target.value)}
        />
        <InputForm
          label="身長"
          isRequired={true}
          type="number"
          defaultValue={height?.toString() || ""}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <InputForm
          label="体重"
          isRequired={true}
          type="number"
          defaultValue={weight?.toString() || ""}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <div className="col-span-2">
          <Link
            to="/season"
            className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
            onClick={handleSubmit}
          >
            作成
          </Link>
          <Link
            to="/player"
            className="bg-gray-200 hover:text-gray-600 text-gray-500 py-1 px-4 rounded ml-2"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PlayerCreate;
