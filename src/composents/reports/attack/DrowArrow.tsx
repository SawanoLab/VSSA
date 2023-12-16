import React from "react";
import Xarrow from "react-xarrows";

import { AttackGet } from "../../../api-client/api";

interface DrowArrowProps {
  showTeamHistory: "home" | "away" | "and";
  attcker: AttackGet;
  index: number;
  team: string;
}
export const DrowArrow: React.FC<DrowArrowProps> = ({
  showTeamHistory,
  attcker,
  index,
  team,
}) => {
  if (showTeamHistory === "home" && team === "away") return null;
  if (showTeamHistory === "away" && team === "home") return null;
  return (
    <Xarrow
      start={`${team === "home" ? "home" : "away"}${
        attcker.attack_start_zone
      }${index}`}
      end={`${team === "home" ? "away" : "home"}${
        attcker.attack_end_zone
      }${index}`}
      curveness={0}
      strokeWidth={3}
      color={team === "home" ? "red" : "blue"}
      key={index}
      arrowBodyProps={{
        onClick: () => console.log("arrowHeadProps clicked!"),
      }}
    />
  );
};
