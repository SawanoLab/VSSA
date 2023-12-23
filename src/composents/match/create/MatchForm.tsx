import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { PlayerSelects } from "./PlayerSelects";
import { SeasonSelect } from "./SeasonSelect";
import TeamSelect from "./TeamSelect";
import { VideoInput } from "./VideoInput";
import { Match, MatchPostRequest, TeamPlayers } from "../../../api-client";
import { useMatch } from "../../../hooks/match/useMatch";
import { useAuth } from "../../../hooks/use-auth";

interface MatchFormProps {}

export const MatchForm: React.FC<MatchFormProps> = () => {
  const { username } = useAuth();
  const { getPlayers, postMatch } = useMatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [seasonUUID, setSeasonUUID] = useState<string>("");
  const [homeTeamUUID, setHomeTeamUUID] = useState<string>("");
  const [awayTeamUUID, setAwayTeamUUID] = useState<string>("");

  const handleCreate = () => {
    const allPlayers = getPlayers("home").concat(getPlayers("away"));
    console.log("create");
    console.log(JSON.stringify(allPlayers));
    
    const allPlayerData = Object(allPlayers).map((player: TeamPlayers) => ({
      player_id: player.PlayerInfo.uuid,
      on_court: player.onCourt,
      zone_code: player.zone_code,
      libero: player.libero,
    }));
    const matchData: Match = {
      home_team_id: homeTeamUUID,
      away_team_id: awayTeamUUID,
      user_id: username,
      season_id: seasonUUID,
      youtube_url: youtubeUrl,
    };
    const matchPostRequest: MatchPostRequest = {
      Match: matchData,
      PlayerMatchInfo: { ...allPlayerData },
    };
    postMatch(matchPostRequest);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="flex flex-col gap-4 w-[700px] border border-gray-300 rounded-lg p-5">
          <h1 className="text-2xl text-gray-500">新規の試合を作成</h1>
          <VideoInput
            errors={errors}
            register={register}
            youtubeUrl={youtubeUrl}
            setYoutubeUrl={setYoutubeUrl}
          />
          <SeasonSelect
            errors={errors}
            register={register}
            seasonUUID={seasonUUID}
            setSeasonUUID={setSeasonUUID}
          />
          <TeamSelect
            errors={errors}
            register={register}
            homeTeamUUID={homeTeamUUID}
            awayTeamUUID={awayTeamUUID}
            setHomeTeamUUID={setHomeTeamUUID}
            setAwayTeamUUID={setAwayTeamUUID}
          />

          <PlayerSelects
            errors={errors}
            register={register}
            homeTeamUUID={homeTeamUUID}
            awayTeamUUID={awayTeamUUID}
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
};
