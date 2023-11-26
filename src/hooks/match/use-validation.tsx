import React from "react";
import { useForm } from "react-hook-form";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface FormContextType {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const useMatchValidation = React.createContext<FormContextType | null>(
  null
);

export default function MatchValidationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  return (
    <useMatchValidation.Provider value={{ register, handleSubmit, errors }}>
      {children}
    </useMatchValidation.Provider>
  );
}
