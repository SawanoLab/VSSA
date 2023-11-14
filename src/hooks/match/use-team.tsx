import React, { useEffect } from "react";
import { TeamsData } from "../../types/team";
import { getTeams } from "../../lib/api/api";
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
}

const initialContextState: TeamContextType = {
  teams: [],
  addTeam: () => {},
  setTeams: () => {},
  setTeamsData: () => {},
  getTeamNames: () => [],
};

export const TeamContext =
  React.createContext<TeamContextType>(initialContextState);

export const useTeam = () => React.useContext(TeamContext);

const getInitialTeamData = async (username: string) => {
  try {
    const data = await getTeams(username);
    return data;
  } catch (error) {
    alert("Error fetching team data");
    return [];
  }
};

export default function TeamProvider({ children }: any) {
  const { username } = useAuth();
  const [teams, setTeams] = React.useState<TeamsData[]>([]);

  useEffect(() => {
    if (!username) {
      return;
    }
    const fetchData = async () => {
      try {
        const teamData = await getInitialTeamData(username);
        setTeams(teamData);
      } catch (error) {
        console.error("Error fetching team data", error);
      }
    };
    fetchData();
  }, [username]);

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

  return (
    <TeamContext.Provider
      value={{
        teams,
        addTeam,
        setTeams,
        setTeamsData,
        getTeamNames,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
