import React from "react";

import PlayCardLayout from "../PlayCardLayout";

interface ServeStartZoneProps {
  type: "home" | "away";
}

const ServeStartZone: React.FC<ServeStartZoneProps> = ({ type }) => {
  const serve_zone = ["1", "9", "6", "7", "5"];
  return (
    <PlayCardLayout title="サーブ" subTitle="サーブスタートゾーン">
      <div className="relative w-max h-50">
        <img
          src="/volleyball-court2.png"
          alt="court"
          style={{ width: "280px", height: "450px" }}
        />
        <div
          className={`absolute
          ${type === "home" ? "bottom" : "top"}-0
          left-0
          w-full
          h-1/3
        bg-white 
          opacity-100`}
        ></div>
        <div
          className="absolute left-0 w-full
        flex flex-row justify-center items-center"
          style={{ top: type === "home" ? 30 : 365 }}
        >
          {Array.from(Array(5).keys()).map((i) => (
            <button className="border-x border-dashed border-white p-4" key={i}>
              {type === "home" ? serve_zone[i] : serve_zone[4 - i]}
            </button>
          ))}
        </div>
      </div>
    </PlayCardLayout>
  );
};

export default ServeStartZone;
