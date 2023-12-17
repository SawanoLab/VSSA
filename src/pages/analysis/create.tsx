import { useMatch } from "hooks/match/useMatch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "utility/ErrorMessage";

import { TeamPlayers } from "../../api-client/api";
import { AttackerCard } from "../../composents/analysis/AttackerCard";
import { MatchUtilityComponent } from "../../composents/analysis/MatchUtilityComponent";
import { PlayerTableComponent } from "../../composents/analysis/PlayerTableComponent";
import YouTubeVideoComponent from "../../composents/analysis/Video/YouTubeVideoComponent";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useAttackHistory } from "../../hooks/analysis/attack/useAttackHistory";
import { useAuth } from "../../hooks/use-auth";
import {
  home_team_zone_name_column,
  away_team_zone_name_column,
} from "../../types/team_zone_name_column";

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
      if (matchId) {
        try {
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
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchAnalysisData();
    setMatchId(matchId || "");
  }, [matchId, username, setMatchId]);

  const rotateTeamPlayers = (players: TeamPlayers[]) => {
    const zoneCodes = ["Z1", "Z2", "Z3", "Z6", "Z5", "Z4"];
    const getNextZone = (currentZone: string) => {
      const currentIndex = zoneCodes.indexOf(currentZone);
      return currentIndex >= 0
        ? zoneCodes[(currentIndex + 1) % zoneCodes.length]
        : currentZone;
    };

    return players.map((player) => ({
      ...player,
      zone_code: getNextZone(player.zone_code || ""),
    }));
  };

  const teamLotationClick = (team: "home" | "away") => {
    const updatedPlayers = rotateTeamPlayers(
      team === "home" ? homeOnCourtPlayer : awayOnCourtPlayer
    );
    if (team === "home") {
      setHomeOnCourtPlayer(updatedPlayers);
    } else {
      setAwayOnCourtPlayer(updatedPlayers);
    }
  };

  return (
    <div>
      {matchError && (
        <ErrorMessage
          message={matchError}
          clearError={() => setMatchError(null)}
        />
      )}
      {matchLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex">
          <div>
            <YouTubeVideoComponent />
            <MatchUtilityComponent match={match} />
          </div>
          <div>
            <button
              style={{ width: "300px", height: "50px" }}
              className="
              bg-gray-200
              text-gray-700
              hover:bg-gray-300
              font-bold py-2 px-4 rounded"
              onClick={() => teamLotationClick("home")}
            >
              次のローテーション
            </button>
            <table className={`table-auto absolute top-11`}>
              <tbody>
                <PlayerTableComponent
                  type="home"
                  team_zone_name={home_team_zone_name_column}
                  team_on_court={homeOnCourtPlayer}
                />
                <PlayerTableComponent
                  type="away"
                  team_zone_name={away_team_zone_name_column}
                  team_on_court={awayOnCourtPlayer}
                />
              </tbody>
            </table>
            <img
              src="/volleyball-court2.png"
              alt="court"
              style={{ width: "300px", height: "450px" }}
            />
            <button
              style={{ width: "300px", height: "50px" }}
              className="
              bg-gray-200
              text-gray-700
              hover:bg-gray-300
              font-bold py-2 px-4 rounded"
              onClick={() => {
                teamLotationClick("away");
              }}
            >
              次のローテーション
            </button>
          </div>
          <div>
            <AttackerCard
              match={match}
              homeOnCourtPlayer={homeOnCourtPlayer}
              awayOnCourtPlayer={awayOnCourtPlayer}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisCreate;
