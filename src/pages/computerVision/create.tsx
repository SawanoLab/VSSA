import { useMatch } from "hooks/match/useMatch";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from "utility/ErrorMessage";

import { TeamPlayers } from "../../api-client/api";
import { AttackerCard } from "../../components/analysis_old/Cards/AttackCard/AttackerCard";
import { DisplayYoutubeVideo } from "../../components/analysis_old/ComputerVision/DisplayYoutubeVideo";
import { RotateTeamPlayersMap } from "../../components/analysis_old/ComputerVision/RotateTeamPlayersMap";
import { MatchUtilityComponent } from "../../components/analysis_old/MatchUtilityComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAttackHistory } from "../../hooks/analysis/attack/useAttackHistory";
import { useAuth } from "../../hooks/use-auth";

interface headerProps {
  matchId: string;
}

const Header: React.FC<headerProps> = ({ matchId }) => {
  return (
    <div>
      <Link
        to={`/analysis/${matchId}`}
        className="border border-gray-300 hover:bg-slate-50 rounded text-blue-950 hover:text-gray-500 w-28 py-2 text-center"
      >
        戻る
      </Link>
    </div>
  );
};

const ComputerVision: React.FC = () => {
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
  // const imgurl = `https://volleyappimge.s3.ap-northeast-1.amazonaws.com/b23723_%E6%A3%AE.png`;

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
        <Header matchId={matchId || ""} />
        <DisplayYoutubeVideo />
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
        {/* <img src={imgurl} alt="analysis" /> */}
      </div>
    </div>
  );
};

export default ComputerVision;
