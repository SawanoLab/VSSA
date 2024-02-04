import { InputForm } from "components/InputForm";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import ShowYouTubeVideo from "../../../utility/ShowYouTubeVideo";

interface YouTubeVideoComponentProps {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  youtubeUrl: string;
  setYoutubeUrl: React.Dispatch<React.SetStateAction<string>>;
}

const YouTubeVideoComponent: React.FC<YouTubeVideoComponentProps> = ({
  errors,
  register,
  youtubeUrl,
  setYoutubeUrl,
}) => {
  return (
    <div>
      <ShowYouTubeVideo url={youtubeUrl} />
      <InputForm
        label="YouTubeのURL"
        type="text"
        isRequired={true}
        defaultValue={""}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        errors={errors}
        register={register}
      />
    </div>
  );
};

export default YouTubeVideoComponent;
