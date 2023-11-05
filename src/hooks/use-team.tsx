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

export interface TeamContextType {
  teams: TeamsData[];
  addTeam: (team: TeamsData) => void;
  setTeams: (teams: TeamsData[]) => void;
  setTeamsData: (teams: TeamsData[]) => void;
}

const initialContextState: TeamContextType = {
  teams: [],
  addTeam: () => {},
  setTeams: () => {},
  setTeamsData: () => {},
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

  return (
    <TeamContext.Provider value={{ teams, addTeam, setTeams, setTeamsData }}>
      {children}
    </TeamContext.Provider>
  );
}
