import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface option {
  uuid: string;
  context: string;
}
interface SelectBoxProps {
  options: option[];
  title: string;
  optionDefalut: string;
  selectedValue: string;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  onChange: (value: string) => void;
}
export const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  title,
  optionDefalut,
  selectedValue,
  errors,
  register,
  onChange,
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 p-1 w-80">{title}</p>
      <select
        {...register(title, { required: true })}
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
      {errors[title] && (
        <p className="text-red-500 text-xs">{title}を選択してください</p>
      )}
    </div>
  );
};
