import { useMatch } from "hooks/match/useMatch";
import { useSeason } from "hooks/match/useSeason";
import React from "react";
import ErrorMessage from "utility/ErrorMessage";

interface MatchCreatePageErrorProps {}
export const MatchCreateError: React.FC<MatchCreatePageErrorProps> = () => {
  const { matchError, setMatchError } = useMatch();
  const { seasonError, setSeasonError } = useSeason();
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
