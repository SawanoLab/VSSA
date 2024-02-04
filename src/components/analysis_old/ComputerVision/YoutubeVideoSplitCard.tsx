import React from "react";

interface YoutubeVideoSplitCardType {
  img_path: string;
  isClicked: boolean;
  clickHandler: () => void;
  type: "サーブ" | "スパイク";
}
export const YoutubeVideoSplitCard: React.FC<YoutubeVideoSplitCardType> = ({
  img_path,
  isClicked,
  clickHandler,
  type,
}) => {
  return (
    <li className="flex-none">
      <div
        className={`flex flex-col items-centerborder-gray-300 ${
          isClicked ? "bg-gray-100" : ""
        }`}
      >
        <img
          src={img_path}
          style={{
            width: "200px",
            margin: "2px",
            padding: "2px",
          }}
          onClick={() => clickHandler()}
        />
        <p className="text-center text-sm text-gray-500">{type}</p>
      </div>
    </li>
  );
};
