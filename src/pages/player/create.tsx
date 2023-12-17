import React from "react";
import { useState } from "react";

import { PlayerGet } from "../../api-client/api";
import { renderField } from "../../composents/renderField";
import { useAuth } from "../../hooks/use-auth";
import { playerClient } from "../../lib/api/main";
import { PositonNameEnum } from "../../types/player";
import { SeasonData } from "../../types/season";
import { TeamName } from "../../types/team";

interface Field {
  key: keyof PlayerGet;
  label: string;
  type: "text" | "number" | "select";
  options?: Record<string, string>;
}

interface CreateProps {
  seasonData: SeasonData[];
  teamData: TeamName[];
  onClose: () => void;
}

const Create: React.FC<CreateProps> = ({ seasonData, teamData, onClose }) => {
  const { username } = useAuth();
  const [fieldValue, setFieldValue] = useState<PlayerGet>({
    uuid: "",
    name: "",
    player_number: 0,
    code: "",
    postion: "",
    weight: 0,
    height: 0,
    user_id: username,
    team_id: "",
    season_id: "",
  });

  const positionOptions: PositonNameEnum = {
    setter: "セッター",
    outsideHitter: "アウトサイドヒッター",
    middleBlocker: "ミドルブロッカー",
    oppositeHitter: "オッポジット",
    libero: "リベロ",
  };

  const handleInputChange = (key: keyof PlayerGet, value: string | number) => {
    setFieldValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const postPlayer = async (fieldValue: PlayerGet) => {
    try {
      await playerClient.createPlayerPlayersPost(fieldValue);
    } catch (error) {
      console.error("プレイヤーの作成中にエラーが発生しました:", error);
    } finally {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPlayer(fieldValue);
  };

  const fields: Field[] = [
    { key: "name", label: "名前", type: "text" },
    { key: "player_number", label: "背番号", type: "text" },
    { key: "code", label: "コード", type: "text" },
    {
      key: "postion",
      label: "ポジション",
      type: "select",
      options: positionOptions,
    },
    { key: "weight", label: "体重", type: "number" },
    { key: "height", label: "身長", type: "number" },
    {
      key: "team_id",
      label: "チーム",
      type: "select",
      options: teamData.reduce(
        (acc, team) => ({ ...acc, [team.uuid]: team.name }),
        {}
      ),
    },
    {
      key: "season_id",
      label: "シーズン",
      type: "select",
      options: seasonData.reduce(
        (acc, season) => ({ ...acc, [season.uuid]: season.season_name }),
        {}
      ),
    },
  ];

  return (
    <div>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {fields.map((field) =>
          renderField({
            field,
            handleInputChange,
            defaultValue: fieldValue[field.key] as string,
          })
        )}
        <button className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded col-span-2">
          登録
        </button>
      </form>
    </div>
  );
};

export default Create;
