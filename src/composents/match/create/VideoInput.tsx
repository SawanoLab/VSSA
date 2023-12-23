import YouTubeVideoComponent from "composents/analysis/Video/YouTubeVideoComponent";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface VideoInputProps {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  youtubeUrl: string;
  setYoutubeUrl: React.Dispatch<React.SetStateAction<string>>;
}
export const VideoInput: React.FC<VideoInputProps> = ({
  errors,
  register,
  youtubeUrl,
  setYoutubeUrl,
}) => {
  return (
    <div>
      <YouTubeVideoComponent
      errors={errors}
      register={register}
      youtubeUrl={youtubeUrl}
      setYoutubeUrl={setYoutubeUrl}
      />
    </div>
  );
};
