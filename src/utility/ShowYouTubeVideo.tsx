import React, { useEffect, useState } from 'react';

interface ShowYouTubeVideoProps {
  url: string;
  time?: number;
}

const ShowYouTubeVideo: React.FC<ShowYouTubeVideoProps> = ({ url, time = 0 }) => {
  const [embedUrl, setEmbedUrl] = useState<string>('');

  const getYouTubeVideoId = (url: string) => {
    const urlParts = url.split('youtu.be/');
    return urlParts[1] || '';
  };

  useEffect(() => {
    const videoId = getYouTubeVideoId(url);
    const newEmbedUrl = `https://www.youtube.com/embed/${videoId}?start=${time}&autoplay=1&mute=1`;
    setEmbedUrl(newEmbedUrl);
  }, [url, time]);

  return (
    <iframe
      width="600"
      height="300"
      src={embedUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default ShowYouTubeVideo;
