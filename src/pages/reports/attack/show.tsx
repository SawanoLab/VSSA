import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { TeamPlayers } from "../../../api-client/api";
import GameHistory from "../../../composents/reports/attack/GameHistory";
import { useAttackHistory } from "../../../hooks/analysis/attack/useAttackHistory";
import { useAuth } from "../../../hooks/use-auth";
import { matchClient } from "../../../lib/api/main";

interface Props {}

const AttackReportShow: React.FC<Props> = () => {
  return <Component />;
};

interface IProps {}

export const Component: React.FC<IProps> = () => {
  const { username } = useAuth();
  const { matchId } = useParams();
  const { history, getAttackData } = useAttackHistory();
  const [homeOnCourtPlayer, setHomeOnCourtPlayer] = React.useState<
    TeamPlayers[]
  >([]);
  const [awayOnCourtPlayer, setAwayOnCourtPlayer] = React.useState<
    TeamPlayers[]
  >([]);

  const fetchAnalysis = async (matchId: string) => {
    const response = await matchClient.getMatchMatchesMatchIdGet(
      matchId,
      username
    );
    return response.data;
  };

  const fetchAnalysisData = async (matchId: string) => {
    try {
      const response = await fetchAnalysis(matchId);
      setHomeOnCourtPlayer(
        Object.values(response.home_team.players).filter(
          (player) => player.onCourt === true
        )
      );
      setAwayOnCourtPlayer(
        Object.values(response.away_team.players).filter(
          (player) => player.onCourt === true
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAttackData(matchId ? matchId : "");
    fetchAnalysisData(matchId ? matchId : "");
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
    <GameHistory
      history={history}
      getPlayerTeam={getPlayerTeam}
      getPlayerNumber={getPlayerNumber}
    />
  );
};

export default AttackReportShow;
