import { Configuration, TeamsApi, SeasonsApi, PlayersApi } from "../../api-client";

const config = new Configuration({ basePath: process.env.REACT_APP_ENTRYPOINT_URL });

export const playerClient = new PlayersApi(config);
export const teamClient = new TeamsApi(config);
export const seasonClient = new SeasonsApi(config);
