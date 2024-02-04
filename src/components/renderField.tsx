import React from "react";

import { InputForm, SelectForm } from "./InputForm";

interface renderFieldProps<T> {
  field: {
    key: Extract<keyof T, string | number>;
    label: string;
    type: "text" | "number" | "select" | "datetime-local";
    options?: Record<string, string>;
  };
  handleInputChange: (key: keyof T, value: string | number) => void;
  defaultValue: string;
}

export const renderField = <T,>({
  field,
  handleInputChange,
  defaultValue,
}: renderFieldProps<T>) => {
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
      {type === "datetime-local" && (
        <InputForm
          label={label}
          isRequired={true}
          type="datetime-local"
          defaultValue={defaultValue}
          onChange={(e) => handleInputChange(key, e.target.value)}
        />
      )}
    </div>
  );
};
