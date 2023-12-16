import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MatchRequest, TeamPlayers } from "../../api-client/api";
import { AttackerCard } from "../../composents/analysis/AttackerCard";
import { MatchUtilityComponent } from "../../composents/analysis/MatchUtilityComponent";
import { PlayerTableComponent } from "../../composents/analysis/PlayerTableComponent";
import YouTubeVideoComponent from "../../composents/analysis/Video/YouTubeVideoComponent";
import LoadingSpinner from "../../composents/LoadingSpinner";
import { useAttackHistory } from "../../hooks/analysis/attack/use-attackHistory";
import { useAuth } from "../../hooks/use-auth";
import { matchClient } from "../../lib/api/main";
import {
  home_team_zone_name_column,
  away_team_zone_name_column,
} from "../../types/team_zone_name_column";

const AnalysisCreate: React.FC = () => {
  const { username } = useAuth();
  const { matchId } = useParams();
  const { setMatchId } = useAttackHistory();
  const [loading, setLoading] = React.useState(true);
  const [match, setMatch] = React.useState<MatchRequest>();
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

  const fetchAnalysisData = async () => {
    if (!matchId) {
      return;
    }
    try {
      const response = await fetchAnalysis(matchId);
      setMatch(response);
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
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchAnalysisData();
    setMatchId(matchId? matchId : "");
  }, [matchId]);

  const homeTeamLotationClick = () => {
    const updatedHomePlayers = homeOnCourtPlayer.map((player) => {
      let newZone;
      switch (player.zone_code) {
        case "Z1":
          newZone = "Z2";
          break;
        case "Z2":
          newZone = "Z3";
          break;
        case "Z3":
          newZone = "Z6";
          break;
        case "Z6":
          newZone = "Z5";
          break;
        case "Z5":
          newZone = "Z4";
          break;
        case "Z4":
          newZone = "Z1";
          break;
        default:
          newZone = player.zone_code;
      }
      return { ...player, zone_code: newZone };
    });
    setHomeOnCourtPlayer(updatedHomePlayers);
  };

  const awayTeamLotationClick = () => {
    const updatedAwayPlayers = awayOnCourtPlayer.map((player) => {
      let newZone;
      switch (player.zone_code) {
        case "Z1":
          newZone = "Z2";
          break;
        case "Z2":
          newZone = "Z3";
          break;
        case "Z3":
          newZone = "Z6";
          break;
        case "Z6":
          newZone = "Z5";
          break;
        case "Z5":
          newZone = "Z4";
          break;
        case "Z4":
          newZone = "Z1";
          break;
        default:
          newZone = player.zone_code;
      }
      return { ...player, zone_code: newZone };
    });
    setAwayOnCourtPlayer(updatedAwayPlayers);
  };

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
            <button
              style={{ width: "300px", height: "50px" }}
              className="
              bg-gray-200
              text-gray-700
              hover:bg-gray-300
              font-bold py-2 px-4 rounded"
              onClick={() => homeTeamLotationClick()}
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
                awayTeamLotationClick();
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
