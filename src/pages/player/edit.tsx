import React, { useEffect } from "react";

import { useAuth } from "../../hooks/use-auth";
import { putPlayer } from "../../lib/api/players";
import { PositonNameEnum } from "../../types/player";
import { PlayerInfo } from "../../types/player";
import { TeamName } from "../../types/team";

interface Field {
  key: string;
  label: string;
  type: string;
}

interface EditProps {
  playerData: PlayerInfo;
  teamData: TeamName[];
  onClose: () => void;
}

const Edit: React.FC<EditProps> = ({ playerData, teamData, onClose }) => {
  const { username } = useAuth();
  const [fieldValue, setFieldValue] = React.useState<PlayerInfo>(playerData);

  const positionOptions: PositonNameEnum = {
    setter: "セッター",
    outsideHitter: "アウトサイドヒッター",
    middleBlocker: "ミドルブロッカー",
    oppositeHitter: "オッポジット",
    libero: "リベロ",
  };

  const renderField = (field: Field) => {
    const { key, label, type } = field;
    return (
      <div key={key} className="mb-4">
        <label className="text-sm text-gray-500 mb-1">{label}</label>
        {type === "text" && (
          <input
            className="border border-gray-400 p-2 rounded w-full"
            type="text"
            // value={fieldValue}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        )}
        { key === "postion" && (
          <select
            className="border border-gray-400 p-2 rounded w-full"
            onChange={(e) => handleInputChange(key, e.target.value)}
          >
            <option value="">ポジションを選択</option>
            {Object.entries(positionOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        )}
        { key === "team_id" && (
          <select
            className="border border-gray-400 p-2 rounded w-full"
            onChange={(e) => handleInputChange(key, e.target.value)}
          >
            <option value="">チームを選択</option>
            {teamData.map((team) => (
              <option key={team.uuid} value={team.uuid}>
                {team.name}
              </option>
            ))}
          </select>
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

  useEffect(() => {
    console.log(fieldValue);
  }, [fieldValue]);

  useEffect(() => {
    console.log(playerData);
  }, [playerData]);

  const handleInputChange = (fieldKey: string, value: string) => {
    setFieldValue((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(playerData);
    console.log(fieldValue);
    feachPutPlayer(playerData);
  };

  return (
    <div>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {[
          { key: "name", label: "名前", type: "text" },
          { key: "player_number", label: "背番号", type: "text" },
          { key: "code", label: "コード", type: "text" },
          { key: "postion", label: "ポジション", type: "select" },
          { key: "weight", label: "体重", type: "text" },
          { key: "height", label: "身長", type: "text" },
          { key: "team_id", label: "チーム", type: "select" },
        ].map(renderField)}
        <button className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded col-span-2">
          登録
        </button>
      </form>
    </div>
  );
};

export default Edit;
