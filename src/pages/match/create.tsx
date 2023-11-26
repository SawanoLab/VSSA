import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import { Match, MatchPostRequest } from "../../api-client";
import LoadingSpinner from "../../composents/LoadingSpinner";
import TeamSelectorTable from "../../composents/match/TeamPlayerSelector";
import { useMatch } from "../../hooks/match/matchProvider";
import { usePlayer } from "../../hooks/match/use-player";
import { useSeason } from "../../hooks/match/use-season";
import { useTeam } from "../../hooks/match/use-team";
import { useAuth } from "../../hooks/use-auth";
import { matchClient } from "../../lib/api/main";
import { Player } from "../../types/player";
import { typeOfTeam } from "../../types/team";

const MatchCreate: React.FC = () => {
  const { username } = useAuth();
  const { setTeamPlayer, getPlayers } = useMatch();
  const { fetchTeams, teams, teamLoading } = useTeam();
  const { getSeasonNames, fetchSeasons, seasons, seasonLoading } = useSeason();
  const { getTeamPlayers, fetchPlayers, players, playerLoading } = usePlayer();
  const [loading, setLoading] = useState(true);
  const [homeTeamUUID, setHomeTeamUUID] = useState<string>("");
  const [awayTeamUUID, setAwayTeamUUID] = useState<string>("");
  const [seasonUUID, setSeasonUUID] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchTeams();
    fetchPlayers();
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (teamLoading || playerLoading || seasonLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [teamLoading, playerLoading, seasonLoading]);


  const getTeamName = useCallback(
    (teamId: string) => {
      const selectedTeam = teams.find((team) => team.uuid === teamId);
      return selectedTeam ? selectedTeam.name : "";
    },
    [teams]
  );

  useEffect(() => {
    const teamNameHome = getTeamName(homeTeamUUID);
    const homePlayers = getTeamPlayers(players, homeTeamUUID);
    setTeamPlayer(typeOfTeam.home, teamNameHome, homePlayers);
  }, [homeTeamUUID]);

  useEffect(() => {
    const teamNameAway = getTeamName(awayTeamUUID);
    const awayPlayers = getTeamPlayers(players, awayTeamUUID);
    setTeamPlayer(typeOfTeam.away, teamNameAway, awayPlayers);
  }, [awayTeamUUID]);

  const handleCreate = () => {
    const homePlayerData = Object(getPlayers(typeOfTeam.home)).map(
      (player: Player) => ({
        player_id: player.PlayerInfo.uuid,
        on_court: player.onCourt,
        zone_code: player.zone_code,
        libero: player.libero,
      })
    );

    const awayPlayerData = Object(getPlayers(typeOfTeam.away)).map(
      (player: Player) => ({
        player_id: player.PlayerInfo.uuid,
        on_court: player.onCourt,
        zone_code: player.zone_code,
        libero: player.libero,
      })
    );

    const matchData: Match = {
      home_team_id: homeTeamUUID,
      away_team_id: awayTeamUUID,
      user_id: username,
      season_id: seasonUUID,
    };

    const matchPostRequest: MatchPostRequest = {
      Match: matchData,
      PlayerMatchInfo: {
        ...homePlayerData,
        ...awayPlayerData,
      },
    };

    matchClient.createMatchMatchesPost(matchPostRequest).catch((err) => {
      console.log(err);
    });
  };

  const seasonNames = getSeasonNames(seasons);

  return (
    <div>
      {loading ? ( <LoadingSpinner />) : (
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="flex flex-col justify-center items-center">
          <div className="m-2 p-5 border bg-gray-100 border-gray-300 rounded-lg">
            <h1 className="text-2xl text-gray-500">新規の試合を作成</h1>
            <div className="flex flex-row m-1">
              <select
                {...register("seasonUUID", {
                  required: "シーズンを選択してください。",
                })}
                className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
                onChange={(e) => setSeasonUUID(e.target.value)}
              >
                <option value="">シーズンを選択</option>
                {seasonNames.map((seasonName) => (
                  <option key={seasonName.uuid} value={seasonName.uuid}>
                    {seasonName.season_name}
                  </option>
                ))}
              </select>
              {errors.seasonUUID && (
                <p className="text-red-500">
                  シーズンを選択してください。
                </p>
              )}
            </div>
            <div className="flex flex-row m-1">
              <div>
                <p className="text-sm text-gray-500 p-1 w-80">ホームチーム</p>
                <select
                  {
                    ...register("homeTeamUUID", {
                      required: "ホームチームを選択してください。",
                    })
                  }
                  className="text-sm text-gray-500 border border-spacing-5 p-1 w-80 ml-2"
                  onChange={(e) => setHomeTeamUUID(e.target.value)}
                  value={homeTeamUUID}
                >
                  <option value="">ホームチームを選択</option>
                  {teams.map((team) => (
                    <option key={team.uuid} value={team.uuid}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {errors.homeTeamUUID && (
                  <p className="text-red-500">ホームチームを選択してください。</p>
                  )}
              </div>
              <div>
                <p className="text-sm text-gray-500 p-1 w-80">アウェイチーム</p>
                <select
                  {
                    ...register("awayTeamUUID", {
                      required: "アウェイチームを選択してください。",
                    })
                  }
                  className="text-sm text-gray-500 border border-spacing-5 p-1 w-80 ml-2"
                  onChange={(e) => setAwayTeamUUID(e.target.value)}
                  value={awayTeamUUID}
                >
                  <option value="">アウェイチームを選択</option>
                  {teams.map((team) => (
                    <option key={team.uuid} value={team.uuid}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {errors.awayTeamUUID && (
                  <p className="text-red-500">アウェイチームを選択してください。</p>
                )}
              </div>
            </div>
            <div className="flex flex-row m-1">
              <TeamSelectorTable
                register={register}
                errors={errors}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
            >
              作成
            </button>
            <button className="bg-gray-200 hover:text-gray-600 text-gray-500 py-1 px-4 rounded">
              キャンセル
            </button>
          </div>
        </div>
      </form>
      )}
    </div>
  );
};

export default MatchCreate;
