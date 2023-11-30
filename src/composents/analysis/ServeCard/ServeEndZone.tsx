import React from "react";

import PlayCardLayout from "../PlayCardLayout";

interface ServeEndZoneProps {
  type: "home" | "away";
}

const ServeEndZone: React.FC<ServeEndZoneProps> = ({ type }) => {
  const serve_zone = ["1", "9", "6", "7", "5"];
  return (
    <PlayCardLayout title="サーブ" subTitle="サーブエンドゾーン">
      <div className="relative w-max h-50">
        <img
          src="/volleyball-court2.png"
          alt="court"
          style={{ width: "280px", height: "450px" }}
        />
        <div
          className={`absolute
          ${type === "home" ? "top" : "bottom"}-0
          left-0
          w-full
          h-1/3
        bg-white 
          opacity-100`}
        ></div>
        <div
          className="absolute left-0 w-full
        flex flex-row justify-center items-center"
          style={{ top: type === "home" ? 225 : 25 }}
        >
          <div>
            {Array.from(Array(3).keys()).map((i) => (
              <div key={`row-${i}`}>
                {" "}
                {/* 各行に対して一意のキーを提供 */}
                {Array.from(Array(3).keys()).map((y) => (
                  <button
                    className="border border-white p-4"
                    key={`button-${i}-${y}`}
                    style={{ width: "70px", height: "66px" }}
                  >
                    {type === "home" ? serve_zone[i] : serve_zone[4 - i]}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PlayCardLayout>
  );
};

export default ServeEndZone;
