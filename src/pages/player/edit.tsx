import React, { useState } from "react";

import { InputForm, SelectForm } from "../../composents/InputForm";
import { useAuth } from "../../hooks/use-auth";
import { putPlayer } from "../../lib/api/players";
import { PositonNameEnum } from "../../types/player";
import { PlayerInfo } from "../../types/player";
import { TeamName } from "../../types/team";

interface Field {
  key: keyof PlayerInfo;
  label: string;
  type: "text" | "number" | "select";
  options?: Record<string, string>;
}

interface EditProps {
  playerData: PlayerInfo;
  teamData: TeamName[];
  onClose: () => void;
}

const Edit: React.FC<EditProps> = ({ playerData, teamData, onClose }) => {
  const { username } = useAuth();
  const [fieldValue, setFieldValue] = useState<PlayerInfo>(playerData);

  const positionOptions: PositonNameEnum = {
    setter: "セッター",
    outsideHitter: "アウトサイドヒッター",
    middleBlocker: "ミドルブロッカー",
    oppositeHitter: "オッポジット",
    libero: "リベロ",
  };

  const handleInputChange = (key: keyof PlayerInfo, value: string) => {
    setFieldValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const renderField = (field: Field) => {
    const { key, label, type, options } = field;

    return (
      <div key={key} className="mb-4">
        {["text", "number"].includes(type) && (
          <InputForm
            label={label}
            isRequired={true}
            type={type}
            defaultValue={playerData[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        )}
        {type === "select" && (
          <SelectForm
            label={label}
            isRequired={true}
            defaultTitle={`Select ${label}`}
            items={
              options
                ? Object.entries(options).map(([uuid, name]) => ({
                    uuid,
                    name,
                  }))
                : []
            } // Ensure items is an array
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        )}
      </div>
    );
  };

  const feachPutPlayer = async (playerData: PlayerInfo) => {
    try {
      const { data, loading } = await putPlayer(
        playerData.uuid,
        username,
        fieldValue
      );
      if (loading || !data) return;
      console.log(data);
    } catch (error) {
      console.error("プレイヤーの更新中にエラーが発生しました:", error);
    } finally {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    feachPutPlayer(playerData);
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
  ];

  return (
    <div>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {fields.map(renderField)}
        <button className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded col-span-2">
          登録
        </button>
      </form>
    </div>
  );
};

export default Edit;
