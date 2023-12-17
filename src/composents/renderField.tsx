import React from "react";

import { InputForm, SelectForm } from "./InputForm";
import { PlayerGet } from "../api-client/api";

interface renderFieldProps {
  field: {
    key: keyof PlayerGet;
    label: string;
    type: "text" | "number" | "select";
    options?: Record<string, string>;
  };
  handleInputChange: (key: keyof PlayerGet, value: string | number) => void;
  defaultValue: string;
}
export const renderField: React.FC<renderFieldProps> = ({
  field,
  handleInputChange,
  defaultValue,
}) => {
  const { key, label, type, options } = field;
  return (
    <div key={key} className="mb-4">
      {["text", "number"].includes(type) && (
        <InputForm
          label={label}
          isRequired={true}
          type={type}
          defaultValue={defaultValue}
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
          }
          onChange={(e) => handleInputChange(key, e.target.value)}
        />
      )}
    </div>
  );
};
