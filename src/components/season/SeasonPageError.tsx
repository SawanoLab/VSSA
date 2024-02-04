import React from "react";
import ErrorMessage from "utility/ErrorMessage";

interface SeasonPageErrorProps {
  seasonError: string | null;
  setSeasonError: (message: string) => void;
}
export const SeasonPageError: React.FC<SeasonPageErrorProps> = ({
  seasonError,
  setSeasonError,
}) => {
  return (
    <div>
      {seasonError ? (
        <ErrorMessage
          message={seasonError}
          clearError={() => setSeasonError("")}
        />
      ) : null}
    </div>
  );
};
