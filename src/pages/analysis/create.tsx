import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MatchRequest } from "../../api-client/api";
import LoadingSpinner from "../../composents/LoadingSpinner";
import Table from "../../composents/Table";
import { useAuth } from "../../hooks/use-auth";
import { matchClient } from "../../lib/api/main";

const AnalysisCreate: React.FC = () => {
  const { username } = useAuth();
  const { matchId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [match, setMatch] = React.useState<MatchRequest>();

  useEffect(() => {
    console.log("match", match);
  }, [match]);

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
        // Handle the error appropriately
      }
      setLoading(false);
    };
    fetchData();
  }, [matchId]);

  const getPlayersData = (
    teamPlayers: Record<
      string,
      { PlayerInfo: { name: string; postion: string } }
    >
  ) => {
    return Object.values(teamPlayers).map((player) => ({
      name: player.PlayerInfo.name,
      position: player.PlayerInfo.postion,
    }));
  };

  const header = [
    { header: "ホーム", accessor: "name" },
    { header: "ポジション", accessor: "position" },
  ];

  const homeTableData = match ? getPlayersData(match.home_team.players) : [];
  const awayTableData = match ? getPlayersData(match.away_team.players) : [];

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex">
          <div>
            <iframe
              width="600"
              height="450"
              src="https://www.youtube.com/embed/U_eqhmnowtw"
              title="Cucine Lube Civitanova vs. Allianz Milano - Full Match | SuperLega Playoffs 2022/23"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <p className="text-xl text-gray-500">
              {match?.home_team.team_name} vs {match?.away_team.team_name}
            </p>
            <p className="text-ml text-gray-500">
              スコア: {match?.home_team_score} - {match?.away_team_score}
            </p>
            <div className="flex">
              <div className="text-ml text-gray-500">
                <h2>ホームチーム選手</h2>
                <Table data={homeTableData} columns={header} />
              </div>
              <div className="text-ml text-gray-500">
                <h2>アウェイチーム選手</h2>
                <Table data={awayTableData} columns={header} />
              </div>
            </div>
          </div>
          <div>
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
