import React from "react";

import ShowYouTubeVideo from "../../utility/ShowYouTubeVideo";


const YouTubeVideoComponent: React.FC = () => {
  const [YouTubeUrl, setYouTubeUrl] = React.useState("https://youtu.be/f-GCt8bQcM0");

  console.log("YouTubeUrl", YouTubeUrl);
  

  return (
    <>
      {ShowYouTubeVideo(YouTubeUrl)}
      <form className="flex">
        <input
          type="text"
          placeholder="YouTubeのURLを入力"
          onChange={(e) => setYouTubeUrl(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </form>
    </>
  );
};



export default YouTubeVideoComponent;
