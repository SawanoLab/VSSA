import React from "react";


const ShowYouTubeVideo = (url: string) => {
  // if (!url || typeof url !== 'string' || !url.includes('youtube.com')) {
  //   // URLが無効な場合の処理
  //   return <div>無効なURL</div>;
  // }
  const embedUrl = url.includes("youtu.be")
    ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`
    : url
  console.log("embedUrl", embedUrl);
  
  return (
    <iframe
      width="600"
      height="450"
      src={embedUrl}

      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};
export default ShowYouTubeVideo;
