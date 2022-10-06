import {
  CategoryEnumType,
  GameFieldsType,
  TeamsFieldsType,
} from "../api/types";

export type PoolRankingType = {
  id: string;
  name: string;
  ranking: TeamsFieldsType[];
};

export type CategoryPoolRankingType = {
  [key in CategoryEnumType]?: PoolRankingType[];
};

export type PoolGamesType = {
  id: string;
  name: string;
  games: GameFieldsType[];
};

export type CategoryPoolGameType = {
  [key in CategoryEnumType]?: PoolGamesType[];
};
