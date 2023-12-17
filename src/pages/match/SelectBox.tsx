import React from "react";

interface option {
  uuid: string;
  context: string;
}
interface SelectBoxProps {
  options: option[];
  title: string;
  optionDefalut: string;
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
}
export const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  title,
  optionDefalut,
  selectedValue,
  onChange,
  error,
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 p-1 w-80">{title}</p>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
      >
        <option value="">{optionDefalut}</option>
        {options.map((option) => (
          <option key={option.uuid} value={option.uuid}>
            {option.context}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
