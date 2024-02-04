import React, { FunctionComponent } from "react";

import { ShowZone } from "./ShowZone";

interface ShowZonesProps {
  type: "home" | "away";
  width?: number;
  height?: number;
  onClick?: (Zone_id: number) => void;
}
export const ShowZones: FunctionComponent<ShowZonesProps> = ({
  type,
  width = 280,
  height = 180,
  onClick,
}) => {
  const [currentZone, setCurrentZone] = React.useState<{ value: string }>({
    value: "-1",
  });

  const row_num = 3;
  const column_num = 3;

  const button_width = width / column_num;
  const button_height = height / row_num;

  return (
    <div>
      {Array.from(Array(row_num).keys()).map((x) => (
        <div key={`row-${x}`}>
          {Array.from(Array(column_num).keys()).map((y) => (
            <ShowZone
              type={type}
              x={x}
              y={y}
              width={button_width}
              height={button_height}
              onClick={onClick}
              key={`zone-${x}-${y}`}
              currentZone={currentZone}
              setCurrentZone={setCurrentZone}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
