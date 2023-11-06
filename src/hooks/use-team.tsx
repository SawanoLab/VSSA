import React from "react";

interface TeamsData {
  uuid: string;
  name: string;
  code: string;
  director: string;
  doctor: string;
  coach: string;
  trainer: string;
  season_id: string;
  user_id: string;
}

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

export default function TeamProvider({ children }: any) {
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

  return (
    <TeamContext.Provider value={{
      teams,
      addTeam,
      setTeams,
      setTeamsData,
      getTeamNames
      }}>
      {children}
    </TeamContext.Provider>
  );
}
