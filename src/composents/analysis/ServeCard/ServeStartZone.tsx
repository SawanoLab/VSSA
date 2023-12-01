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
        {type === "home" ? (
          <img
            src="/volleyball-court3.jpg"
            alt="court"
            style={{ width: "280px" }}
          />
        ) : (
          <img
            src="/volleyball-court4.jpg"
            alt="court"
            style={{ width: "280px" }}
          />
        )}
        <div
          className="absolute left-0 w-full
        flex flex-row justify-center items-center"
          style={{ top: type === "home" ? 30 : 230 }}
        >
          {Array.from(Array(5).keys()).map((i) => (
            <button
              className="border-x border-dashed border-white p-4"
              key={`button-${i}`}
            >
              {type === "home" ? serve_zone[i] : serve_zone[4 - i]}
            </button>
          ))}
        </div>
      </div>
    </PlayCardLayout>
  );
};

export default ServeStartZone;
