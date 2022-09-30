import { TeamsFieldsType } from "../api/types";

export type Game = {
  id: string;
  homeTeam: TeamsFieldsType;
  awayTeam: TeamsFieldsType;
  homeScore: number;
  awayScore: number;
  date: string;
};

export type PoolType = {
  id: string;
  name: string;
  ranking: TeamsFieldsType[];
};
