import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { FunctionComponent } from "react";

import { MatchResponse } from "../../../api-client/api";

interface TeamSelectProps {
  type: "home" | "away";
  setTeam: React.Dispatch<React.SetStateAction<"home" | "away">>;
  match: MatchResponse;
  onClick: (team_id: string) => void;
}
export const TeamSelect: FunctionComponent<TeamSelectProps> = ({
  type,
  setTeam,
  match,
  onClick,
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "home" | "away"
  ) => {
    setTeam(newAlignment);
    newAlignment == "home"
      ? onClick(match.home_team.uuid.toString())
      : onClick(match.away_team.uuid.toString());
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="h-1/2"
    >
      <ToggleButton value="home">
        {match.home_team.team_name.toString()}
      </ToggleButton>
      <ToggleButton value="away">
        {match.away_team.team_name.toString()}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
