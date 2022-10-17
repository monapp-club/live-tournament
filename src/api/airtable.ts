import {
  CategoryPoolRankingType,
  CategoryPoolGameType,
  PoolRankingType,
  PoolGamesType,
} from "../types";
import { groupBy } from "../utils";
import {
  AirtableRecordType,
  AirtableTableType,
  AirtableViewType,
  CategoryEnumType,
  CategoryFieldsType,
  GameFieldsType,
  SponsorsFieldsType,
  TeamsFieldsType,
} from "./types";

const config = {
  base: process.env.REACT_APP_AIRTABLE_BASE,
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
  maxRecords: process.env.REACT_APP_AIRTABLE_MAX_RECORDS, // 100 is the max
};

const getRequest = (
  table: AirtableTableType,
  view: AirtableViewType,
  filterByFormula?: string
) => {
  const params = new URLSearchParams({
    api_key: config.apiKey ?? "",
    maxRecords: config.maxRecords ?? "",
    view,
    ...(filterByFormula && { filterByFormula }),
  });

  return new Request(
    `https://api.airtable.com/v0/${config.base}/${table}?${params}`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${config.apiKey}`,
      }),
    }
  );
};

const fetchAirtableRecords = async <T>(
  table: AirtableTableType,
  view: AirtableViewType,
  filterByFormula?: string
) => {
  try {
    const resp = (await fetch(getRequest(table, view, filterByFormula)).catch(
      (err) => {
        console.log(err);
      }
    )) as Response;
    if (resp.status >= 200 && resp.status < 300) {
      const json = await resp.json();
      const { records } = json;
      return records as T[];
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () => {
  try {
    const records = await fetchAirtableRecords<
      AirtableRecordType<CategoryFieldsType>
    >("categories", "list");
    return records?.map((record) => record.fields);
  } catch (error) {
    console.log(error);
  }
};

export const fetchRankingByCategory = async (
  category: CategoryEnumType,
  dayPart: "am" | "pm"
): Promise<CategoryPoolRankingType | undefined> => {
  try {
    const data = await fetchAirtableRecords<
      AirtableRecordType<TeamsFieldsType>
    >(
      dayPart === "am" ? "ranking" : "ranking_pm",
      "list",
      `{category}="${category}"`
    );
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

export const fetchGamesByCategories = async (
  category: CategoryEnumType,
  dayPart: "am" | "pm"
): Promise<CategoryPoolGameType | undefined> => {
  try {
    const data = await fetchAirtableRecords<AirtableRecordType<GameFieldsType>>(
      dayPart === "am" ? "games" : "games_pm",
      "list",
      `{category}="${category}"`
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

export const fetchSponsors = async (): Promise<
  SponsorsFieldsType[] | undefined
> => {
  try {
    const data = await fetchAirtableRecords<
      AirtableRecordType<SponsorsFieldsType>
    >("sponsors", "list");
    if (data) {
      return data.map((sponsor) => sponsor.fields);
    }
  } catch (error) {
    console.log(error);
  }
};
