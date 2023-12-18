import { useMatch } from "hooks/match/useMatch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "utility/ErrorMessage";

import { RotateTeamPlayersMap } from "./RotateTeamPlayersMap";
import { TeamPlayers } from "../../api-client/api";
import { AttackerCard } from "../../composents/analysis/AttackerCard";
import { MatchUtilityComponent } from "../../composents/analysis/MatchUtilityComponent";
import YouTubeVideoComponent from "../../composents/analysis/Video/YouTubeVideoComponent";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useAttackHistory } from "../../hooks/analysis/attack/useAttackHistory";
import { useAuth } from "../../hooks/use-auth";

const AnalysisCreate: React.FC = () => {
  const { username } = useAuth();
  const { matchId } = useParams();
  const { match, matchLoading, matchError, setMatchError, fetchMatch } =
    useMatch();
  const { setMatchId } = useAttackHistory();
  const [homeOnCourtPlayer, setHomeOnCourtPlayer] = React.useState<
    TeamPlayers[]
  >([]);
  const [awayOnCourtPlayer, setAwayOnCourtPlayer] = React.useState<
    TeamPlayers[]
  >([]);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!matchId) {
        return;
      }
      const matchData = await fetchMatch(matchId, username);
      if (matchData) {
        setHomeOnCourtPlayer(
          Object.values(matchData.home_team.players).filter(
            (player) => player.onCourt
          )
        );
        setAwayOnCourtPlayer(
          Object.values(matchData.away_team.players).filter(
            (player) => player.onCourt
          )
        );
      }
    };

    fetchAnalysisData();
    setMatchId(matchId || "");
  }, [matchId, username, setMatchId]);

  return (
    <div>
      {matchError ? (
        <ErrorMessage
          message={matchError}
          clearError={() => setMatchError(null)}
        />
      ) : null}
      {matchLoading ? <LoadingSpinner /> : null}
      <div className="grid grid-cols-1 gap-2">
        <YouTubeVideoComponent />
        <div className="grid grid-cols-2 gap-1 justify-items-center">
          <MatchUtilityComponent match={match} />
          <div className="grid grid-cols-2 gap-1 justify-items-center">
            <RotateTeamPlayersMap
              homeOnCourtPlayer={homeOnCourtPlayer}
              awayOnCourtPlayer={awayOnCourtPlayer}
              setHomeOnCourtPlayer={setHomeOnCourtPlayer}
              setAwayOnCourtPlayer={setAwayOnCourtPlayer}
            />
            <AttackerCard
              match={match}
              homeOnCourtPlayer={homeOnCourtPlayer}
              awayOnCourtPlayer={awayOnCourtPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCreate;
