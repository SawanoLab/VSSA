import { TeamGet } from "api-client";
import { renderField } from "composents/renderField";
import React from "react";
import { SeasonData } from "types/season";

import { useAuth } from "../../hooks/use-auth";

interface Field {
  key: keyof TeamGet;
  label: string;
  type: "text" | "number" | "select";
  options?: Record<string, string>;
}

interface CreateProps {
  seasonData: SeasonData[];
  postTeam: (data: TeamGet) => void;
}

const TeamCreate: React.FC<CreateProps> = ({
  seasonData,
  postTeam,
}) => {
  const { username } = useAuth();
  const [fieldValue, setFieldValue] = React.useState<TeamGet>({
    uuid: "",
    name: "",
    code: "",
    director: "",
    coach: "",
    trainer: "",
    doctor: "",
    season_id: "",
    user_id: username,
  });

  const handleInputChange = (key: keyof TeamGet, value: string | number) => {
    setFieldValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    postTeam(fieldValue);
  };

  const fields: Field[] = [
    { key: "name", label: "名称", type: "text" },
    { key: "code", label: "コード", type: "text" },
    {
      key: "season_id",
      label: "シーズン",
      type: "select",
      options: seasonData.reduce(
        (acc, season) => ({ ...acc, [season.uuid]: season.season_name }),
        {}
      ),
    },
    { key: "director", label: "監督", type: "text" },
    { key: "coach", label: "コーチ", type: "text" },
    { key: "trainer", label: "トレーナー", type: "text" },
    { key: "doctor", label: "ドクター", type: "text" },
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

export default TeamCreate;
