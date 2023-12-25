import {
  Configuration,
  TeamsApi,
  SeasonsApi,
  PlayersApi,
  MatchesApi,
  AttacksApi,
} from "../../api-client";

const bearerToken = localStorage.getItem("jwtToken");

const config = new Configuration({
  basePath: process.env.REACT_APP_ENTRYPOINT_URL,
  accessToken: bearerToken ? bearerToken : "",
});

export const playerClient = new PlayersApi(config);
export const teamClient = new TeamsApi(config);
export const seasonClient = new SeasonsApi(config);
export const matchClient = new MatchesApi(config);
export const attackClient = new AttacksApi(config);
