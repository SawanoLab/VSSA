import React, { useState, useEffect, createContext, useContext } from "react";

import {
  AttackBallType,
  AttackBase,
  AttackEvaluationType,
  AttackResponse,
  AttackSkill,
} from "../../../api-client/api";
import { attackClient } from "../../../lib/api/main";
import { useAuth } from "../../use-auth";

export interface AttackHistoryContextType {
  history: AttackResponse[];
  serveTeamSelect: string | null;
  attackEvalution: AttackEvaluationType | null;
  attackPlayer: string | null;
  attackStartZone: number | null;
  attackBallType: AttackBallType | null;
  attackEndZone: number | null;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeamSetScore: number;
  awayTeamSetScore: number;
  attackHistoryloading: boolean;
  attackHistoryError: string | null;
  fetchAttackData: (match_id: string) => void;
  setAttackTeamSelect: React.Dispatch<React.SetStateAction<string>>;
  setAttackPlayer: React.Dispatch<React.SetStateAction<string>>;
  setAttackStartZone: React.Dispatch<React.SetStateAction<number>>;
  setAttackEvalution: React.Dispatch<
    React.SetStateAction<AttackEvaluationType | null>
  >;
  setAttackBallType: React.Dispatch<
    React.SetStateAction<AttackBallType | null>
  >;
  setAttackEndZone: React.Dispatch<React.SetStateAction<number>>;
  setAttackSkill: React.Dispatch<React.SetStateAction<AttackSkill | null>>;
  setMatchId: React.Dispatch<React.SetStateAction<string>>;
  setTeamId: React.Dispatch<React.SetStateAction<string>>;
  setPlayerId: React.Dispatch<React.SetStateAction<string>>;
  deleteAttackData: (attackId: string) => void;
  setHomeTeamScore: React.Dispatch<React.SetStateAction<number>>;
  setAwayTeamScore: React.Dispatch<React.SetStateAction<number>>;
  setHomeTeamSetScore: React.Dispatch<React.SetStateAction<number>>;
  setAwayTeamSetScore: React.Dispatch<React.SetStateAction<number>>;
  setAttackHistoryError: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialContextState: AttackHistoryContextType = {
  history: [],
  serveTeamSelect: null,
  attackEvalution: null,
  attackPlayer: null,
  attackStartZone: null,
  attackBallType: null,
  attackEndZone: null,
  homeTeamScore: 0,
  awayTeamScore: 0,
  homeTeamSetScore: 0,
  awayTeamSetScore: 0,
  attackHistoryloading: false,
  attackHistoryError: null,
  fetchAttackData: () => {},
  setAttackTeamSelect: () => {},
  setAttackEvalution: () => {},
  setAttackPlayer: () => {},
  setAttackStartZone: () => {},
  setAttackBallType: () => {},
  setAttackEndZone: () => {},
  setAttackSkill: () => {},
  setMatchId: () => {},
  setTeamId: () => {},
  setPlayerId: () => {},
  deleteAttackData: () => {},
  setHomeTeamScore: () => {},
  setAwayTeamScore: () => {},
  setHomeTeamSetScore: () => {},
  setAwayTeamSetScore: () => {},
  setAttackHistoryError: () => {},
};

export const AttackHistoryContext =
  createContext<AttackHistoryContextType>(initialContextState);

export const useAttackHistory = () => useContext(AttackHistoryContext);

export default function AttackHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = useAuth();
  const [history, setHistory] = useState<AttackResponse[]>([]);
  const [homeTeamScore, setHomeTeamScore] = useState<number>(0);
  const [awayTeamScore, setAwayTeamScore] = useState<number>(0);
  const [homeTeamSetScore, setHomeTeamSetScore] = useState<number>(0);
  const [awayTeamSetScore, setAwayTeamSetScore] = useState<number>(0);
  const [attackStartZone, setAttackStartZone] = useState<number>(0);
  const [attackEndZone, setAttackEndZone] = useState<number>(0);
  const [attackBallType, setAttackBallType] = useState<AttackBallType | null>(
    null
  );
  const [attackSkill, setAttackSkill] = useState<AttackSkill | null>(null);
  const [attackEvalution, setAttackEvalution] =
    useState<AttackEvaluationType | null>(null);
  const [matchId, setMatchId] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [serveTeamSelect, setAttackTeamSelect] = useState<string>("");
  const [attackPlayer, setAttackPlayer] = useState<string>("");
  const [attackHistoryError, setAttackHistoryError] = useState<string | null>(null);
  const [attackHistoryloading, setAttackHistoryLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAttackData(matchId);
  }, [matchId]);

  useEffect(() => {
    sortSetScoreAndScoreHistory(history);
  }, [history]);

  useEffect(() => {
    if (!serveTeamSelect) return;
    if (!attackEvalution) return;
    if (!attackPlayer) return;
    if (!attackStartZone) return;
    if (!attackBallType) return;
    if (!attackEndZone) return;
    if (!attackSkill) return;
    const newData = {
      home_team_score: homeTeamScore,
      away_team_score: awayTeamScore,
      home_team_set_score: homeTeamSetScore,
      away_team_set_score: awayTeamSetScore,
      attack_start_zone: attackStartZone,
      attack_end_zone: attackEndZone,
      attack_ball_type: attackBallType,
      attack_skill: attackSkill,
      attack_evaluation: attackEvalution,
      match_id: matchId,
      user_id: username,
      team_id: teamId,
      player_id: playerId,
    };
    postAttackData(newData);
    setAttackTeamSelect("");
    setAttackEvalution(null);
    setAttackPlayer("");
    setAttackStartZone(0);
    setAttackBallType(null);
    setAttackEndZone(0);
    setAttackSkill(null);
  }, [
    serveTeamSelect,
    attackPlayer,
    attackStartZone,
    attackBallType,
    attackEvalution,
    attackEndZone,
  ]);

  const sortSetScoreAndScoreHistory = (history: AttackResponse[]) => {
    return history.sort((a, b) => {
      const totalSetScoreA = a.home_team_set_score + a.away_team_set_score;
      const totalSetScoreB = b.home_team_set_score + b.away_team_set_score;

      if (totalSetScoreA !== totalSetScoreB) {
        return totalSetScoreB - totalSetScoreA;
      }
      const totalScoreA = a.home_team_score + a.away_team_score;
      const totalScoreB = b.home_team_score + b.away_team_score;
      return totalScoreB - totalScoreA;
    });
  };

  const addAttackData = (newData: AttackResponse) => {
    setHistory((currentHistory) => {
      const updatedHistory = [...currentHistory, newData];
      return sortSetScoreAndScoreHistory(updatedHistory);
    });
  };

  const dropAttackData = (attackId: string) => {
    const newHistory = history.filter((item) => item.uuid !== attackId);
    setHistory(newHistory);
  };

  const postAttackData = async (newData: AttackBase) => {
    setAttackHistoryLoading(true);
    try {
      const response = await attackClient.createAttackAttacksPost(newData);
      const data = response.data;
      addAttackData(data);
    } catch (error) {
      setAttackHistoryError("データの登録にエラーが発生しました");
    }
    setAttackHistoryLoading(false);
  };

  const deleteAttackData = async (attackId: string) => {
    if (!attackId) return;
    setAttackHistoryLoading(true);
    try {
      const response = await attackClient.deleteAttackAttacksAttackIdDelete(
        attackId,
        username
      );
      const data = response.data;
      dropAttackData(attackId);
      console.log("deleteAttackData", data);
    } catch (error) {
      setAttackHistoryError("データの削除にエラーが発生しました");
    } finally {
      setAttackHistoryLoading(false);
    }
  };

  const fetchAttackData = async (match_id: string) => {
    if (!match_id) return;
    setAttackHistoryLoading(true);
    try {
      const response = await attackClient.getAttacksAttacksGet(
        username,
        match_id
      );
      const data = response.data;
      const sortedData = sortSetScoreAndScoreHistory(data);
      setHistory(sortedData);
      setHomeTeamScore(sortedData[0].home_team_score);
      setAwayTeamScore(sortedData[0].away_team_score);
      setHomeTeamSetScore(sortedData[0].home_team_set_score);
      setAwayTeamSetScore(sortedData[0].away_team_set_score);
    } catch (error) {
      setAttackHistoryError("データの取得にエラーが発生しました");
    } finally {
      setAttackHistoryLoading(false);
    }
  };

  return (
    <AttackHistoryContext.Provider
      value={{
        history,
        serveTeamSelect,
        attackPlayer,
        attackStartZone,
        attackEvalution,
        attackBallType,
        attackEndZone,
        homeTeamScore,
        awayTeamScore,
        homeTeamSetScore,
        awayTeamSetScore,
        attackHistoryloading,
        attackHistoryError,
        fetchAttackData,
        setAttackTeamSelect,
        setAttackPlayer,
        setAttackEvalution,
        setAttackStartZone,
        setAttackBallType,
        setAttackEndZone,
        setAttackSkill,
        setPlayerId,
        setMatchId,
        setTeamId,
        deleteAttackData,
        setHomeTeamScore,
        setAwayTeamScore,
        setHomeTeamSetScore,
        setAwayTeamSetScore,
        setAttackHistoryError,
      }}
    >
      {children}
    </AttackHistoryContext.Provider>
  );
}
