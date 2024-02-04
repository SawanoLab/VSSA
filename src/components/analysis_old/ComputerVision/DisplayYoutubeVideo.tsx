import { useMatch } from "hooks/match/useMatch";
import React from "react";
import ShowYouTubeVideo from "utility/ShowYouTubeVideo";

import { YoutubeVideoSplitCards } from "./YoutubeVideoSplitCards";

interface DisplayYoutubeVideoProps {}
export const DisplayYoutubeVideo: React.FC<DisplayYoutubeVideoProps> = () => {
  const [youtubeTime, setYoutubeTime] = React.useState<number>(0);
  const { match } = useMatch();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
      <ShowYouTubeVideo
        url={match.youtube_url}
        width={600}
        height={300}
        time={youtubeTime}
        controls={0}
        modestbranding={0}
        rel={0}
      />
      <YoutubeVideoSplitCards setYoutubeTime={setYoutubeTime} />
    </div>
  );
};
