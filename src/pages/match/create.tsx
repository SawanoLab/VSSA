import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useSeason } from "../../hooks/use-season";
import { useTeam } from "../../hooks/use-team";
import { usePlayer } from "../../hooks/use-player";
import TeamSelectorTable from "../../composents/match/TeamSelectorTable";

interface PlayerData {
  uuid: string;
  name: string;
  player_number: number;
  code: string;
  postion: string;
  weight: number;
  height: number;
  user_id: string;
  team_id: string;
  season_id: string;
}

const MatchCreate: React.FC = () => {
  const { getSeasonNames, seasons } = useSeason();
  const { getTeamNames, teams } = useTeam();
  const { getTeamPlayers, players } = usePlayer();

  const seasonNames = getSeasonNames(seasons);
  const teamNames = getTeamNames(teams);

  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [homeTeamPlayers, setHomeTeamPlayers] = useState<PlayerData[]>([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const homeTeamPlayers = getTeamPlayers(players, homeTeam);
    setHomeTeamPlayers(homeTeamPlayers);
    const awayTeamPlayers = getTeamPlayers(players, awayTeam);
    setAwayTeamPlayers(awayTeamPlayers);
  }, [homeTeam, awayTeam]);

  const handleSubmit = async () => {
    // Add your form submission logic here
  };

  return (
    // 中間揃え
    <div className="flex flex-col justify-center items-center
    ">
      <div className="
      m-2 bg-blue-50 p-5 rounded-lg
      ">
        <h1
          className="
          text-2xl text-gray-500
          "
        >新規の試合を作成</h1>
        <div className="flex flex-row m-1">
          <select
            className="text-sm text-gray-500 border border-spacing-5 p-1 w-80"
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="">シーズンを選択</option>
            {seasonNames.map((seasonName) => (
              <option key={seasonName.uuid} value={seasonName.uuid}>
                {seasonName.season_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row m-1">
        <div>
        <p className="text-sm text-gray-500  p-1 w-80">ホームチーム</p>
        <select
          className="text-sm text-gray-500 border border-spacing-5 p-1 w-80 ml-2"
          onChange={(e) => setHomeTeam(e.target.value)}
          >
          <option value="">ホームチームを選択</option>
          {teams.map((team) => (
            <option key={team.uuid} value={team.uuid}>
              {team.name}
            </option>
          ))}
        </select>
        </div>
        <div>
        <p className="text-sm text-gray-500  p-1 w-80">アウェイチーム</p>
        <select
          className="text-sm text-gray-500 border border-spacing-5 p-1 w-80 ml-2"
          onChange={(e) => setAwayTeam(e.target.value)}
        >
          <option value="">アウェイチームを選択</option>
          {teams.map((team) => (
            <option key={team.uuid} value={team.uuid}>
              {team.name}
            </option>
          ))}
        </select>
        </div>
        </div>

        <div className="flex flex-row m-1">
          <TeamSelectorTable
            teams={teamNames}
            players={players}
            selectedHomeTeam={homeTeam}
            setSelectedHomeTeam={setHomeTeam}
            selectAwayTeam={awayTeam}
            setSelectedAwayTeam={setAwayTeam}
          />
        </div>
        <Link
          to="/season"
          className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
          onClick={handleSubmit}
        >
          作成
        </Link>
        <Link
          to="/player"
          className="bg-gray-200 hover:text-gray-600 text-gray-500 py-1 px-4 rounded"
        >
          キャンセル
        </Link>
      </div>
    </div>
  );
};

export default MatchCreate;
