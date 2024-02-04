import LoadingSpinner from "components/LoadingSpinner";
import { useMatch } from "hooks/match/useMatch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "utility/ErrorMessage";

import { TeamPlayers } from "../../../api-client/api";
import GameHistory from "../../../components/reports/attack/GameHistory";
import { useAttackHistory } from "../../../hooks/analysis/attack/useAttackHistory";

interface Props {}

const AttackReportShow: React.FC<Props> = () => {
  return <Component />;
};

interface IProps {}

export const Component: React.FC<IProps> = () => {
  const { matchId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const { matchError, matchLoading, setMatchError, fetchMatch } = useMatch();
  const {
    history,
    attackHistoryloading,
    attackHistoryError,
    setAttackHistoryError,
    fetchAttackData,
  } = useAttackHistory();
  const [homeOnCourtPlayer, setHomeOnCourtPlayer] = useState<TeamPlayers[]>([]);
  const [awayOnCourtPlayer, setAwayOnCourtPlayer] = useState<TeamPlayers[]>([]);

  useEffect(() => {
    if (!attackHistoryloading && !matchLoading) {
      setLoading(false);
    }
  }, [attackHistoryloading, matchLoading]);

  const fetchAnalysisData = async () => {
    if (matchId) {
      try {
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    fetchAttackData(matchId ? matchId : "");
    fetchAnalysisData();
  }, [matchId]);

  const getPlayerTeam = (player_id: string) => {
    const home_team_player = homeOnCourtPlayer.find(
      (player) => player.PlayerInfo.uuid === player_id
    );
    if (home_team_player) {
      return "home";
    }
    return "away";
  };

  const getPlayerNumber = (player_id: string) => {
    const home_team_player = homeOnCourtPlayer.find(
      (player) => player.PlayerInfo.uuid === player_id
    );
    if (home_team_player) {
      return home_team_player.PlayerInfo.player_number;
    }
    const away_team_player = awayOnCourtPlayer.find(
      (player) => player.PlayerInfo.uuid === player_id
    );
    if (away_team_player) {
      return away_team_player.PlayerInfo.player_number;
    }
    return 0;
  };

  return (
    <div className="container mx-auto">
      {matchError && (
        <ErrorMessage
          message={matchError}
          clearError={() => setMatchError(null)}
        />
      )}
      {attackHistoryError && (
        <ErrorMessage
          message={attackHistoryError}
          clearError={() => setAttackHistoryError(null)}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <GameHistory
          history={history}
          getPlayerTeam={getPlayerTeam}
          getPlayerNumber={getPlayerNumber}
        />
      )}
    </div>
  );
};

export default AttackReportShow;
