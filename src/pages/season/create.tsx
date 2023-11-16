import React from "react";

import { InputForm } from "../../composents/InputForm";
import { useAuth } from "../../hooks/use-auth";
import { postSeason } from "../../lib/api/seasons";

interface SeasonCreateProps {
  onClose: () => void;
}

const SeasonCreate: React.FC<SeasonCreateProps> = ({
  onClose,
}) => {
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
      onClose();
    }
  };

  return (
    <div className="m-2">
      <h1>Info</h1>
      <form className="flex flex-wrap border bg-blue-50 p-5">
        <InputForm
          label="シーズン名"
          type="text"
          isRequired={true}
          onChange={(e) => setSeasonName(e.target.value)}
        />
        <InputForm
          label="ゲームフォーマット"
          type="text"
          isRequired={true}
          onChange={(e) => setGameFormat(e.target.value)}
        />
        <InputForm
          label="コード"
          type="text"
          isRequired={true}
          onChange={(e) => setCode(e.target.value)}
        />
        <InputForm
          label="開始日"
          type="date"
          isRequired={true}
          onChange={(e) => setStartDay(e.target.value)}
        />
        <InputForm
          label="終了日"
          type="date"
          isRequired={true}
          onChange={(e) => setEndDay(e.target.value)}
        />
        <button
        className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded col-span-2"
        onClick={handleSubmit}
        >
          作成
        </button>
      </form>
    </div>
  );
};

export default SeasonCreate;
