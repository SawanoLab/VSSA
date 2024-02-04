import React, { useEffect, useState } from "react";

interface ShowYouTubeVideoProps {
  /**
   * 埋め込むYouTube動画のURL。
   */
  url: string;

  /**
   * 動画の開始時間（秒単位）指定しない場合は、動画の開始から再生される。
   */
  time?: number;

  /**
   * 動画プレーヤーの幅（ピクセル単位）指定しない場合は、デフォルトの幅が使用される。
   */
  width?: number;

  /**
   * 動画プレーヤーの高さ（ピクセル単位）指定しない場合は、デフォルトの高さが使用される。
   */
  height?: number;

  /**
   * 自動再生を制御するフラグ（0: 自動再生しない、1: 自動再生する）
   */
  autoplay?: 0 | 1;

  /**
   * 関連動画を表示するかどうかを制御するフラグ（0: 表示しない、1: 表示する）
   */
  rel?: 0 | 1;

  /**
   * プレーヤーのコントロールを表示するかどうかを制御するフラグ（0: 表示しない、1: 表示する）
   */
  controls?: 0 | 1;

  /**
   * プレーヤーに YouTubeロゴを表示するかどうかを制御するフラグ（0: 表示しない、1: 表示する）
   */
  modestbranding?: 0 | 1;
}

const ShowYouTubeVideo: React.FC<ShowYouTubeVideoProps> = ({
  url,
  time = 0,
  width = 600,
  height = 300,
  autoplay = 1,
  rel = 1,
  controls = 1,
  modestbranding = 1,
}) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");

  const getYouTubeVideoId = (url: string) => {
    const urlParts = url.split("youtu.be/");
    return urlParts[1] || "";
  };

  useEffect(() => {
    const videoId = getYouTubeVideoId(url);
    const newEmbedUrl = `https://www.youtube.com/embed/${videoId}?start=${time}&autoplay=${autoplay}&mute=1&rel=${rel}&controls=${controls}&modestbranding=${modestbranding}`;
    setEmbedUrl(newEmbedUrl);
  }, [url, time]);

  return (
    <div className="flex justify-center">
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ShowYouTubeVideo;
