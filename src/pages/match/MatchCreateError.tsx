import React from "react";
import ErrorMessage from "utility/ErrorMessage";

interface MatchCreatePageErrorProps {
  matchError: string | null;
  seasonError: string | null;
  setMatchError: (error: string | null) => void;
  setSeasonError: (error: string | null) => void;
}
export const MatchCreateError: React.FC<MatchCreatePageErrorProps> = ({
  matchError,
  seasonError,
  setMatchError,
  setSeasonError,
}) => {
  return (
    <div>
      {seasonError && (
        <ErrorMessage
          message={seasonError}
          clearError={() => setSeasonError(null)}
        />
      )}
      {matchError && (
        <ErrorMessage
          message={matchError}
          clearError={() => setMatchError(null)}
        />
      )}
    </div>
  );
};
