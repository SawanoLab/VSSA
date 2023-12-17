import React from "react";

import { teamClient } from "../../lib/api/main";
import { TeamsData } from "../../types/team";
import { useAuth } from "../use-auth";


interface TeamNames {
  uuid: string;
  name: string;
}

export interface TeamContextType {
  teams: TeamsData[];
  addTeam: (team: TeamsData) => void;
  setTeams: (teams: TeamsData[]) => void;
  setTeamsData: (teams: TeamsData[]) => void;
  getTeamNames: (teams: TeamsData[]) => TeamNames[];
  getTeamName: (teamId: string) => string;
  fetchTeams: () => void;
  teamLoading: boolean;
}

const initialContextState: TeamContextType = {
  teams: [],
  addTeam: () => {
    return
  },
  setTeams: () => {
    return
  },
  setTeamsData: () => {
    return
  },
  getTeamNames: () => [],
  getTeamName: () => "",
  fetchTeams: () => {
    return
  },
  teamLoading: true,
};

export const TeamContext =
  React.createContext<TeamContextType>(initialContextState);

export const useTeam = () => React.useContext(TeamContext);

export default function TeamProvider({ children }: { children: React.ReactNode }) {
  const { username } = useAuth();
  const [teamLoading, setLoading] = React.useState(true);
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

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await teamClient.getTeamsTeamsGet(username);
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
      console.error("データの取得中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        teamLoading,
        addTeam,
        setTeams,
        setTeamsData,
        getTeamNames,
        getTeamName,
        fetchTeams,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
