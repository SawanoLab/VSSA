import React from "react";

import ShowYouTubeVideo from "../../../utility/ShowYouTubeVideo";

const YouTubeVideoComponent: React.FC = () => {
  const [YouTubeUrl] = React.useState(
    "https://youtu.be/f-GCt8bQcM0"
  );

  return (
    <>
      {ShowYouTubeVideo(YouTubeUrl)}
    </>
  );
};

export default YouTubeVideoComponent;
