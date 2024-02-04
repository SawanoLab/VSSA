import { MatchUtilityComponent } from "components/analysis_old/MatchUtilityComponent";
import { useMatch } from "hooks/match/useMatch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "utility/ErrorMessage";
import ShowYouTubeVideo from "utility/ShowYouTubeVideo";

import { TeamPlayers } from "../../api-client/api";
import { AnalysisInputForm } from "../../components/analysis/AnalysisInputForm";
import { Layout } from "../../components/analysis/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
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
      const matchData = await fetchMatch(matchId);
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
      <Layout
        videoComponent={
          <ShowYouTubeVideo
            url={match.youtube_url}
            width={600}
            height={230}
            time={0}
          />
        }
        analysisInputForm={
          <AnalysisInputForm
            match={match}
            homeOnCourtPlayer={homeOnCourtPlayer}
            awayOnCourtPlayer={awayOnCourtPlayer}
            setHomeOnCourtPlayer={setHomeOnCourtPlayer}
            setAwayOnCourtPlayer={setAwayOnCourtPlayer}
          />
        }
        matchUtilityComponent={<MatchUtilityComponent match={match} />}
      />
    </div>
  );
};

export default AnalysisCreate;
