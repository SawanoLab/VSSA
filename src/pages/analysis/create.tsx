import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MatchRequest, TeamPlayers } from "../../api-client/api";
import { CourtPlayerDisplayComponet } from "../../composents/analysis/CourtPlayerDisplayComponet";
import { MatchUtilityComponent } from "../../composents/analysis/MatchUtilityComponent";
import YouTubeVideoComponent from "../../composents/analysis/YouTubeVideoComponent";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useAuth } from "../../hooks/use-auth";
import { matchClient } from "../../lib/api/main";
import {
  home_team_zone_name_column,
  away_team_zone_name_column,
} from "../../types/team_zone_name_column";

const AnalysisCreate: React.FC = () => {
  const { username } = useAuth();
  const { matchId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [match, setMatch] = React.useState<MatchRequest>();

  const fetchAnalysis = async (matchId: string) => {
    const response = await matchClient.getMatchMatchesMatchIdGet(
      matchId,
      username
    );
    return response.data;
  };

  useEffect(() => {
    setLoading(true);
    if (!matchId) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetchAnalysis(matchId);
        setMatch(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [matchId]);

  const getOnCourtPlayers = (teamPlayers: Record<string, TeamPlayers>) => {
    console.log("teamPlayers", teamPlayers);
    return Object.values(teamPlayers).filter(
      (player) => player.onCourt === true
    );
  };

  const getPlayer = (team: "home" | "away", zone: string) => {
    let playerInfo;
    if (team === "home") {
      playerInfo = homeTeamOnCourt.find((player) => player.zone_code === zone);
    } else {
      playerInfo = awayTeamOnCourt.find((player) => player.zone_code === zone);
    }
    if (!playerInfo) {
      return { name: "不明", player_number: "?" };
    }
    return playerInfo.PlayerInfo;
  };

  const homeTeamOnCourt = match
    ? getOnCourtPlayers(match.home_team.players)
    : [];
  const awayTeamOnCourt = match
    ? getOnCourtPlayers(match.away_team.players)
    : [];

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex">
          <div>
            <YouTubeVideoComponent />
            <MatchUtilityComponent match={match} />
          </div>
          <div>
            <CourtPlayerDisplayComponet
              home_team_zone_name={home_team_zone_name_column}
              away_team_zone_name={away_team_zone_name_column}
              getPlayer={getPlayer}
            />
            <img
              src="/volleyball-court2.png"
              alt="court"
              style={{ width: "300px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisCreate;
