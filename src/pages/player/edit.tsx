import React, { useState } from "react";

import { renderField } from "./renderField";
import { PlayerGet } from "../../api-client/api";
import { useAuth } from "../../hooks/use-auth";
import { playerClient } from "../../lib/api/main";
import { PositonNameEnum } from "../../types/player";
import { TeamName } from "../../types/team";

interface Field {
  key: keyof PlayerGet;
  label: string;
  type: "text" | "number" | "select";
  options?: Record<string, string>;
}

interface EditProps {
  playerData: PlayerGet;
  teamData: TeamName[];
  onClose: () => void;
}

const Edit: React.FC<EditProps> = ({ playerData, teamData, onClose }) => {
  const { username } = useAuth();
  const [fieldValue, setFieldValue] = useState<PlayerGet>(playerData);

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

  const feachPutPlayer = async (playerData: PlayerGet) => {
    try {
      await playerClient.updatePlayerPlayersPut(
        username,
        playerData.uuid,
        fieldValue
      );
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

export default Edit;
