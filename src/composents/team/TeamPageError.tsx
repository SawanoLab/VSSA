import React from "react";
import ErrorMessage from "utility/ErrorMessage";

interface TeamPageErrorProps {
  seasonError: string | null;
  teamError: string | null;
  setSeasonError: (message: string) => void;
  setTeamError: (message: string) => void;
}
export const TeamPageError: React.FC<TeamPageErrorProps> = ({
  seasonError,
  teamError,
  setSeasonError,
  setTeamError,
}) => {
  return (
    <div>
      {seasonError ? (
        <ErrorMessage
          message={seasonError}
          clearError={() => setSeasonError("")}
        />
      ) : null}
      {teamError ? (
        <ErrorMessage message={teamError} clearError={() => setTeamError("")} />
      ) : null}
    </div>
  );
};
