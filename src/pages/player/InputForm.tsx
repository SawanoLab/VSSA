import React from "react";


interface InputFormProps {
  label: string;
  isRequired: boolean;
  type: string;
  defaultValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  label,
  type,
  isRequired,
  defaultValue,
  onChange,
}) => (
  <div className="mb-4">
    <label className="text-sm text-gray-500 mb-1 block">
      {label}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="border border-gray-400 p-2 rounded w-full"
      onChange={(e) => onChange(e)}
    />
  </div>
);

interface itemTypes {
  uuid: string;
  name: string;
}

interface SelectFormProps {
  label: string;
  isRequired: boolean;
  defaultTitle: string;
  items: itemTypes[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectForm: React.FC<SelectFormProps> = ({
  label,
  isRequired,
  defaultTitle,
  items,
  onChange,
}) => (
  <div className="col-span-2">
    <label className="text-sm text-gray-500 mb-1 block">
      {label}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
    <select
      className="border border-gray-400 p-2 rounded w-full"
      onChange={(e) => onChange(e)}
    >
      <option value="">{defaultTitle}</option>
      {items.map((item) => (
        <option key={item.uuid} value={item.uuid}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);
