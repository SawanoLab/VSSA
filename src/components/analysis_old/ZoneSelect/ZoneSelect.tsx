import React from "react";

interface ZoneSelectProps {
  type: "home" | "away";
  draw_type: "home" | "away";
  onClick?: (Zone_id: number) => void;
}

const ZoneSelect: React.FC<ZoneSelectProps> = ({
  // type,
  draw_type,
  onClick,
}) => {
  const [currentZone, setCurrentZone] = React.useState<{ value: string }>({
    value: "8",
  });
  const home_serve_zone = [
    ["4", "3", "2"],
    ["7", "8", "9"],
    ["5", "6", "1"],
  ];
  const away_serve_zone = [
    ["1", "6", "5"],
    ["9", "8", "7"],
    ["2", "3", "4"],
  ];

  const handleZoneClick = (x: number, y: number) => {
    const zoneCode =
      draw_type === "home" ? home_serve_zone[x][y] : away_serve_zone[x][y];
    setCurrentZone({ value: zoneCode });
    if (onClick) {
      onClick(Number(zoneCode));
    }
  };

  const isZoneSelected = (zoneValue: string) => {
    return currentZone.value === zoneValue;
  };
  return (
    <div className="relative w-max h-50">
      {draw_type === "home" ? (
        <img
          src="/volleyball-court4.jpg"
          alt="court"
          style={{ width: "280px" }}
        />
      ) : (
        <img
          src="/volleyball-court3.jpg"
          alt="court"
          style={{ width: "280px" }}
        />
      )}
      <div
        className="absolute left-0 w-full
        flex flex-row justify-center items-center"
        style={{ top: draw_type === "home" ? 75 : 30 }}
      >
        <div>
          {Array.from(Array(3).keys()).map((i) => (
            <div key={`row-${i}`}>
              {Array.from(Array(3).keys()).map((y) => {
                const zoneValue =
                  draw_type === "home"
                    ? home_serve_zone[i][y]
                    : away_serve_zone[i][y];
                return (
                  <button
                    className={`border border-white p-4 text-white ${
                      isZoneSelected(zoneValue) ? "bg-blue-500" : ""
                    }`}
                    key={`button-${i}-${y}`}
                    style={{ width: "70px", height: "70px" }}
                    onClick={() => handleZoneClick(i, y)}
                  >
                    {zoneValue}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZoneSelect;
