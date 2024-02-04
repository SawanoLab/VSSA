import React from "react";

import { ShowCourtImage } from "./ShowCourtImage";
import { ShowZones } from "./ShowZones";

interface ZoneSelectProps {
  draw_type: "home" | "away";
  onClick?: (Zone_id: number) => void;
}

const ZoneSelect: React.FC<ZoneSelectProps> = ({ draw_type, onClick }) => {
  const court_width = 200;
  const zone_width = court_width * 0.75;
  const zone_height = zone_width * 1;
  return (
    <div className="relative w-max h-50">
      <ShowCourtImage type={draw_type} width={court_width} />
      <div
        className="absolute left-0 w-full
        flex flex-row justify-center items-center"
        style={{ top: draw_type === "home" ? 53 : 23 }}
      >
        <ShowZones
          type={draw_type}
          width={zone_width}
          height={zone_height}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default ZoneSelect;
