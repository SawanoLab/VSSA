import { Configuration, TeamsApi, SeasonsApi, PlayersApi, MatchesApi, AttacksApi } from "../../api-client";

const config = new Configuration({ basePath: process.env.REACT_APP_ENTRYPOINT_URL });

export const playerClient = new PlayersApi(config);
export const teamClient = new TeamsApi(config);
export const seasonClient = new SeasonsApi(config);
export const matchClient = new MatchesApi(config);
export const attackClient = new AttacksApi(config);
