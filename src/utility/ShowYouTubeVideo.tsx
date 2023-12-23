import React from "react";

interface ShowYouTubeVideoProps {
  url: string;
}

const ShowYouTubeVideo: React.FC<ShowYouTubeVideoProps> = ({ url }) => {
  const embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}?showinfo=0`;
  return (
    <iframe
      width="600"
      height="300"
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default ShowYouTubeVideo;
