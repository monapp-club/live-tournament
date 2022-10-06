import {
  CategoryPoolGameType,
  CategoryPoolRankingType,
  PoolGamesType,
  PoolRankingType,
} from "../types";
import { groupBy } from "../utils";
import {
  AirtableRecordType,
  AirtableTableType,
  AirtableViewType,
  GameFieldsType,
  TeamsFieldsType,
} from "./types";

const config = {
  base: process.env.REACT_APP_AIRTABLE_BASE,
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
  maxRecords: process.env.REACT_APP_AIRTABLE_MAX_RECORDS,
};

const getRequest = (table: AirtableTableType, view: AirtableViewType) =>
  new Request(
    `https://api.airtable.com/v0/${config.base}/${table}?maxRecords=${config.maxRecords}&view=${view}`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${config.apiKey}`,
      }),
    }
  );

const fetchAirtableRecords = async <T>(
  table: AirtableTableType,
  view: AirtableViewType
) => {
  try {
    const resp = (await fetch(getRequest(table, view)).catch((err) => {
      console.log(err);
    })) as Response;
    if (resp.status >= 200 && resp.status < 300) {
      const json = await resp.json();
      const { records } = json;
      return records as T[];
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchRankingByCategories = async (): Promise<
  CategoryPoolRankingType | undefined
> => {
  try {
    const data = await fetchAirtableRecords<
      AirtableRecordType<TeamsFieldsType>
    >("teams", "list");
    if (data) {
      const categories = groupBy(data, (team) => team.fields.category);
      const poolsByCategories = Object.keys(
        categories
      ).reduce<CategoryPoolRankingType>((acc, category) => {
        const pools = groupBy(categories[category], (team) => team.fields.pool);
        const poolsArray: PoolRankingType[] = Object.keys(pools).map(
          (pool) => ({
            id: pool,
            name: pool,
            ranking: pools[pool].map((team) => team.fields),
          })
        );
        return {
          ...acc,
          [category]: poolsArray,
        };
      }, {});
      return poolsByCategories;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchGamesByCategories = async (): Promise<
  CategoryPoolGameType | undefined
> => {
  try {
    const data = await fetchAirtableRecords<AirtableRecordType<GameFieldsType>>(
      "games",
      "list"
    );
    if (data) {
      const categories = groupBy(data, (game) => game.fields.category);
      const poolsByCategories = Object.keys(
        categories
      ).reduce<CategoryPoolGameType>((acc, category) => {
        const pools = groupBy(categories[category], (game) => game.fields.pool);
        const poolsArray: PoolGamesType[] = Object.keys(pools).map((pool) => ({
          id: pool,
          name: pool,
          games: pools[pool].map((game) => game.fields),
        }));
        return {
          ...acc,
          [category]: poolsArray,
        };
      }, {});
      return poolsByCategories;
    }
  } catch (error) {
    console.log(error);
  }
};
