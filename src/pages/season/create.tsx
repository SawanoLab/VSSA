import { renderField } from "components/renderField";
import { useSeason } from "hooks/match/useSeason";
import React from "react";

import { SeasonCreate, SeasonBase } from "../../api-client/api";
import { useAuth } from "../../hooks/use-auth";

interface Field {
  key: keyof SeasonBase;
  label: string;
  type: "text" | "number" | "select" | "datetime-local";
  options?: Record<string, string>;
}

interface SeasonCreateProps {
  onClose: () => void;
}

const SeasonCreatePage: React.FC<SeasonCreateProps> = ({ onClose }) => {
  const { username } = useAuth();
  const { postSeasons } = useSeason();
  const [fieldValue, setFieldValue] = React.useState<SeasonBase>({
    season_name: "",
    game_format: "",
    code: "",
    start_day: new Date().toString(),
    end_day: new Date().toString(),
    user_id: username,
  });

  const handleSubmit = async () => {
    postSeasons(fieldValue);
    onClose();
  };

  const handleInputChange = (
    key: keyof SeasonCreate,
    value: string | number | Date
  ) => {
    setFieldValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const fields: Field[] = [
    { key: "season_name", label: "シーズン名", type: "text" },
    { key: "game_format", label: "ゲームフォーマット", type: "text" },
    { key: "code", label: "コード", type: "text" },
    { key: "start_day", label: "開始日", type: "datetime-local" },
    { key: "end_day", label: "終了日", type: "datetime-local" },
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

export default SeasonCreatePage;
