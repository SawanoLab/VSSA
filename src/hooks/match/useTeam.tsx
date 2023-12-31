import { TeamResponse } from "api-client";
import React from "react";

import { TeamBase } from "../../api-client/api";
import { teamClient } from "../../lib/api/main";
import { TeamsData } from "../../types/team";
import { useAuth } from "../use-auth";

interface TeamNames {
  uuid: string;
  name: string;
}

export interface TeamContextType {
  teams: TeamsData[];
  teamLoading: boolean;
  teamError: string | null;
  setTeamError: (error: string | null) => void;
  addTeam: (team: TeamsData) => void;
  setTeams: (teams: TeamsData[]) => void;
  setTeamsData: (teams: TeamsData[]) => void;
  getTeamNames: (teams: TeamsData[]) => TeamNames[];
  getTeamName: (teamId: string) => string;
  createTeams: (team: TeamsData) => void;
  fetchTeams: () => void;
  deleteTeam: (teamUuid: string) => void;
  updateTeam: (teamItem: TeamResponse, teamId: string) => void;
}

const initialContextState: TeamContextType = {
  teams: [],
  teamLoading: true,
  teamError: null,
  setTeamError: () => {
    return;
  },
  addTeam: () => {
    return;
  },
  setTeams: () => {
    return;
  },
  setTeamsData: () => {
    return;
  },
  getTeamNames: () => [],
  getTeamName: () => "",
  createTeams: () => {
    return;
  },
  fetchTeams: () => {
    return;
  },
  deleteTeam: () => {
    return;
  },
  updateTeam: () => {
    return;
  },
};

export const TeamContext =
  React.createContext<TeamContextType>(initialContextState);

export const useTeam = () => React.useContext(TeamContext);

export default function TeamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = useAuth();
  const [teamLoading, setLoading] = React.useState(true);
  const [teamError, setTeamError] = React.useState<string | null>(null);
  const [teams, setTeams] = React.useState<TeamsData[]>([]);
  const addTeam = (team: TeamsData) => {
    setTeams((prevTeams) => [...prevTeams, team]);
  };

  const setTeamsData = (teams: TeamsData[]) => {
    setTeams(teams);
  };

  const getTeamNames = (teams: TeamsData[]) => {
    return teams.map((team) => {
      return {
        uuid: team.uuid,
        name: team.name,
      };
    });
  };

  const getTeamName = (teamId: string) => {
    const selectedTeam = teams.find((team) => team.uuid === teamId);
    return selectedTeam ? selectedTeam.name : "";
  };

  const createTeams = async (team: TeamResponse) => {
    if (!username) return;
    try {
      await teamClient.createTeamApiV1TeamsPost(team);
      setTeams((prevTeams) => [...prevTeams, team]);
    } catch (error) {
      setTeamError("チームの作成中にエラーが発生しました");
    }
  };

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await teamClient.getTeamsApiV1TeamsGet();
      const data = response.data;
      const items = data.map((item: TeamsData) => {
        return {
          uuid: item.uuid,
          name: item.name,
          code: item.code,
          director: item.director,
          doctor: item.doctor,
          coach: item.coach,
          trainer: item.trainer,
          season_id: item.season_id,
          user_id: item.user_id,
        };
      });
      setTeamsData(items);
    } catch (error) {
      setTeamError("チームデータの取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (teamUuid: string) => {
    if (!teamUuid) return;
    try {
      await teamClient.deleteTeamApiV1TeamsTeamIdDelete(teamUuid);
      const newTeams = teams.filter((team) => team.uuid !== teamUuid);
      setTeamsData(newTeams);
    } catch (error) {
      setTeamError("チームデータの削除中にエラーが発生しました");
    }
  };

  const updateTeam = async (teamItem: TeamBase, teamId: string) => {
    try {
      await teamClient.updateTeamApiV1TeamsTeamIdPut(teamId, teamItem);
      const newTeams = teams.map((team) => {
        if (team.uuid === teamId) {
          return {
            uuid: team.uuid,
            name: teamItem.name,
            code: teamItem.code,
            director: teamItem.director,
            doctor: teamItem.doctor,
            coach: teamItem.coach,
            trainer: teamItem.trainer,
            season_id: teamItem.season_id,
            user_id: teamItem.user_id,
          };
        } else {
          return team;
        }
      });
      setTeamsData(newTeams);
    } catch (error) {
      setTeamError("チームデータの更新中にエラーが発生しました");
    }
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        teamLoading,
        teamError,
        setTeamError,
        addTeam,
        setTeams,
        setTeamsData,
        createTeams,
        getTeamNames,
        getTeamName,
        fetchTeams,
        deleteTeam,
        updateTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
