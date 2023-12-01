import React from "react";

import PlayCardLayout from "./PlayCardLayout";

interface ZoneSelectProps {
  type: "home" | "away";
  title: string;
  subTitle: string;
}

const ZoneSelect: React.FC<ZoneSelectProps> = ({
  type,
  title,
  subTitle,
}) => {
  const serve_zone = ["1", "9", "6", "7", "5"];
  return (
    <PlayCardLayout
    title={title}
    subTitle={subTitle}
    >
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
          style={{ top: type === "home" ? 30 : 75 }}
        >
          <div>
            {Array.from(Array(3).keys()).map((i) => (
              <div key={`row-${i}`}>
                {Array.from(Array(3).keys()).map((y) => (
                  <button
                    className="border border-white p-4"
                    key={`button-${i}-${y}`}
                    style={{ width: "70px", height: "70px" }}
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

export default ZoneSelect;
