import {
  CategoryEnumType,
  GameFieldsType,
  TeamsFieldsType,
} from "../api/types";

export type PoolFixtureType = {
  id: string;
  name: string;
  fixture: TeamsFieldsType[];
};

export type CategoryPoolFixtureType = {
  [key in CategoryEnumType]?: PoolFixtureType[];
};

export type PoolGamesType = {
  id: string;
  name: string;
  games: GameFieldsType[];
};

export type CategoryPoolGameType = {
  [key in CategoryEnumType]?: PoolGamesType[];
};
