import React from "react";
import ShowYouTubeVideo from "utility/ShowYouTubeVideo";

import { YoutubeSkipButton } from "./YoutubeSkipButton";

interface AnalysisYoutubeProps {
  url: string;
}
export const AnalysisYoutube: React.FC<AnalysisYoutubeProps> = ({ url }) => {
  // const [currentTime, setCurrentTime] = React.useState<number>(0);
  return (
    <div>
      <ShowYouTubeVideo url={url} time={0} />
      <YoutubeSkipButton />
    </div>
  );
};
