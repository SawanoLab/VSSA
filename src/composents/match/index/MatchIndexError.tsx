import React from "react";
import ErrorMessage from "utility/ErrorMessage";

interface MatchIndexErrorProps {
  matchError: string | null;
  setMatchError: (message: string) => void;
}
export const MatchIndexError: React.FC<MatchIndexErrorProps> = ({
  matchError,
  setMatchError,
}) => {
  return (
    <div>
      {matchError ? (
        <ErrorMessage
          message={matchError}
          clearError={() => setMatchError("")}
        />
      ) : null}
    </div>
  );
};
