import React, { useState, useEffect, createContext, useContext } from 'react';

import { AttackBallType, AttackBase, AttackEvaluationType, AttackGet, AttackSkill } from '../../../api-client/api';
import { attackClient } from '../../../lib/api/main';
import { useAuth } from "../../use-auth";



export interface AttackHistoryContextType {
  history: AttackGet[];
  serveTeamSelect: string | null;
  attackEvalution: AttackEvaluationType | null;
  attackPlayer: string | null;
  attackStartZone: number | null;
  attackBallType: AttackBallType | null;
  attackEndZone: number | null;
  setServeTeamSelect: React.Dispatch<React.SetStateAction<string>>;
  setAttackPlayer: React.Dispatch<React.SetStateAction<string>>;
  setAttackStartZone: React.Dispatch<React.SetStateAction<number>>;
  setAttackEvalution: React.Dispatch<React.SetStateAction<AttackEvaluationType|null>>;
  setAttackBallType: React.Dispatch<React.SetStateAction<AttackBallType|null>>;
  setAttackEndZone: React.Dispatch<React.SetStateAction<number>>;
  setAttackSkill: React.Dispatch<React.SetStateAction<AttackSkill|null>>;
  setMatchId: React.Dispatch<React.SetStateAction<string>>;
  setTeamId: React.Dispatch<React.SetStateAction<string>>;
  setPlayerId: React.Dispatch<React.SetStateAction<string>>;
  deleteAttackData: (attackId: string) => void;
}

const initialContextState: AttackHistoryContextType = {
  history: [],
  serveTeamSelect: null,
  attackEvalution: null,
  attackPlayer: null,
  attackStartZone: null,
  attackBallType: null,
  attackEndZone: null,
  setServeTeamSelect: () => {},
  setAttackEvalution: () => {},
  setAttackPlayer: () => {},
  setAttackStartZone: () => {},
  setAttackBallType: () => {},
  setAttackEndZone: () => {},
  setAttackSkill: () => {},
  setMatchId: () => {},
  setTeamId: () => {},
  setPlayerId: () => {},
  deleteAttackData: () => {}
};

export const AttackHistoryContext = createContext<AttackHistoryContextType>(initialContextState);

export const useAttackHistory = () => useContext(AttackHistoryContext);

export default function AttackHistoryProvider({ children }: { children: React.ReactNode }) {
  const { username } = useAuth();
  const [history, setHistory] = useState<AttackGet[]>([]);
  const [homeTeamScore] = useState<number>(0);
  const [awayTeamScore] = useState<number>(0);
  const [homeTeamSetScore] = useState<number>(0);
  const [awayTeamSetScore] = useState<number>(0);
  const [attackStartZone, setAttackStartZone] = useState<number>(0);
  const [attackEndZone, setAttackEndZone] = useState<number>(0);
  const [attackBallType, setAttackBallType] = useState<AttackBallType|null>(null);
  const [attackSkill, setAttackSkill] = useState<AttackSkill|null>(null);
  const [attackEvalution, setAttackEvalution] = useState<AttackEvaluationType|null>(null)
  const [matchId, setMatchId] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [serveTeamSelect, setServeTeamSelect] = useState<string>("");
  const [attackPlayer, setAttackPlayer] = useState<string>("");

  const addAttackData = (newData: AttackGet) => {
    setHistory(currentHistory => [...currentHistory, newData]);
  };

  const dropAttackData = (attackId: string) => {
    const newHistory = history.filter((item) => item.uuid !== attackId);
    setHistory(newHistory);
  }

  const postAttackData = async (newData: AttackBase) => {
    try {
      const response = await attackClient.createAttackAttacksPost(newData);
      const data = response.data;
      addAttackData(data);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    }
  }

  const deleteAttackData = async (attackId: string) => {
    try {
      const response = await attackClient.deleteAttackAttacksAttackIdDelete(attackId, username);
      const data = response.data;
      dropAttackData(attackId);
      console.log("deleteAttackData", data);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    }
  }

  
  useEffect(() => {
    console.log("matchId", matchId);
    console.log("username", username);
    getAttackData(matchId);
  }, [matchId])
  
  const getAttackData = async (match_id: string
    ) => {
    try {
      const response = await attackClient.getAttacksAttacksGet(username, match_id)
      const data = response.data;
      setHistory(data);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    }
  }

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
        player_id: playerId
      }
    postAttackData(newData);

    setServeTeamSelect("");
    setAttackEvalution(null);
    setAttackPlayer("");
    setAttackStartZone(0);
    setAttackBallType(null);
    setAttackEndZone(0);
    setAttackSkill(null);
  }, [serveTeamSelect, attackPlayer, attackStartZone, attackBallType, attackEvalution, attackEndZone]);

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
        setServeTeamSelect,
        setAttackPlayer,
        setAttackEvalution,
        setAttackStartZone,
        setAttackBallType,
        setAttackEndZone,
        setAttackSkill,
        setPlayerId,
        setMatchId,
        setTeamId,
        deleteAttackData
      }}
    >
      {children}
    </AttackHistoryContext.Provider>
  );
}
