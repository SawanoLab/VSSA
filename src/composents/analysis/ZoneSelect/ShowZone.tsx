import React, { FunctionComponent } from "react";
import { away_serve_zone, home_serve_zone } from "types/team_zone_name_column";

interface ShowZoneProps {
  type: "home" | "away";
  currentZone: { value: string };
  setCurrentZone: React.Dispatch<React.SetStateAction<{ value: string }>>;
  x: number;
  y: number;
  width?: number;
  height?: number;
  onClick?: (Zone_id: number) => void;
}
export const ShowZone: FunctionComponent<ShowZoneProps> = ({
  type,
  currentZone,
  setCurrentZone,
  x,
  y,
  width = 280 / 3,
  height = 180 / 3,
  onClick,
}) => {
  const zoneValue =
    type === "home" ? home_serve_zone[x][y] : away_serve_zone[x][y];

  const handleZoneClick = (x: number, y: number) => {
    const zoneCode =
      type === "home" ? home_serve_zone[x][y] : away_serve_zone[x][y];
    setCurrentZone({ value: zoneCode });
    if (onClick) {
      onClick(Number(zoneCode));
    }
  };

  const isZoneSelected = (zoneValue: string) => {
    return currentZone.value === zoneValue;
  };

  return (
    <button
      className={`border border-white p-4 text-white ${
        isZoneSelected(zoneValue) ? "bg-blue-500" : ""
      }`}
      key={`button-${x}-${y}`}
      style={{ width: width, height: height }}
      onClick={() => handleZoneClick(x, y)}
    >
      {zoneValue}
    </button>
  );
};
