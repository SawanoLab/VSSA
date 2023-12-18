import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Players } from "types/player";

import { MatchCreateError } from "./MatchCreateError";
import { SelectBox } from "./SelectBox";
import { Match, MatchPostRequest } from "../../api-client";
import LoadingSpinner from "../../composents/LoadingSpinner";
import TeamSelectorTable from "../../composents/match/TeamPlayerSelector";
import { useMatch } from "../../hooks/match/useMatch";
import { usePlayer } from "../../hooks/match/usePlayer";
import { useSeason } from "../../hooks/match/useSeason";
import { useTeam } from "../../hooks/match/useTeam";
import { useAuth } from "../../hooks/use-auth";

const MatchCreate: React.FC = () => {
  const { username } = useAuth();
  const { matchError, setMatchError, setTeamPlayer, getPlayers, postMatch } =
    useMatch();
  const { players, playerLoading, getTeamPlayers, fetchPlayers } = usePlayer();
  const { teams, teamLoading, fetchTeams, getTeamName } = useTeam();
  const {
    seasons,
    seasonLoading,
    seasonError,
    getSeasonNames,
    fetchSeasons,
    setSeasonError,
  } = useSeason();
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
    const fetchDatas = async () => {
      setLoading(true);
      await Promise.all([fetchTeams(), fetchPlayers(), fetchSeasons()]);
      setLoading(false);
    };
    fetchDatas();
  }, []);

  useEffect(() => {
    if (!teamLoading && !playerLoading && !seasonLoading) {
      setLoading(false);
    }
  }, [teamLoading, playerLoading, seasonLoading]);

  useEffect(() => {
    setTeamPlayer(
      "home",
      getTeamName(homeTeamUUID),
      getTeamPlayers(players, homeTeamUUID)
    );
    setTeamPlayer(
      "away",
      getTeamName(awayTeamUUID),
      getTeamPlayers(players, awayTeamUUID)
    );
  }, [homeTeamUUID, awayTeamUUID, teams, players]);

  const handleCreate = () => {
    const allPlayers = getPlayers("home").concat(getPlayers("away"));
    const allPlayerData = Object(allPlayers).map((player: Players) => ({
      player_id: player.PlayerInfo.PlayerInfo.uuid,
      on_court: player.onCourt,
      zone_code: player.zone_code,
      libero: player.libero,
    }));
    const matchData: Match = {
      home_team_id: homeTeamUUID,
      away_team_id: awayTeamUUID,
      user_id: username,
      season_id: seasonUUID,
    };
    const matchPostRequest: MatchPostRequest = {
      Match: matchData,
      PlayerMatchInfo: { ...allPlayerData },
    };
    postMatch(matchPostRequest);
  };

  const seasonNames = getSeasonNames(seasons);

  return (
    <div>
      <MatchCreateError
        matchError={matchError}
        seasonError={seasonError}
        setMatchError={setMatchError}
        setSeasonError={setSeasonError}
      />
      {loading ? <LoadingSpinner /> : null}
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="flex flex-col justify-center items-center">
          <div className="m-2 p-5 border bg-gray-100 border-gray-300 rounded-lg">
            <h1 className="text-2xl text-gray-500">新規の試合を作成</h1>
            <SelectBox
              title="シーズン"
              options={seasonNames.map((season) => ({
                uuid: season.uuid,
                context: season.season_name,
              }))}
              optionDefalut="シーズンを選択"
              selectedValue={seasonUUID}
              onChange={setSeasonUUID}
              error={errors.seasonUUID?.message?.toString()}
            />
            <div className="flex flex-row m-1">
              <SelectBox
                title="ホームチーム"
                options={teams.map((team) => ({
                  uuid: team.uuid,
                  context: team.name,
                }))}
                optionDefalut="ホームチームを選択"
                selectedValue={homeTeamUUID}
                onChange={setHomeTeamUUID}
                error={errors.homeTeamUUID?.message?.toString()}
              />
              <SelectBox
                title="アウェイチーム"
                options={teams.map((team) => ({
                  uuid: team.uuid,
                  context: team.name,
                }))}
                optionDefalut="アウェイチームを選択"
                selectedValue={awayTeamUUID}
                onChange={setAwayTeamUUID}
                error={errors.awayTeamUUID?.message?.toString()}
              />
            </div>
            <div className="flex flex-row m-1">
              <TeamSelectorTable register={register} errors={errors} />
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
    </div>
  );
};

export default MatchCreate;
