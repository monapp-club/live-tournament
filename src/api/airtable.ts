import { PoolType } from "../types";
import {
  AirtableRecordType,
  AirtableTableType,
  AirtableViewType,
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

export const fetchPools = async (): Promise<PoolType[] | undefined> => {
  try {
    const data = await fetchAirtableRecords<
      AirtableRecordType<TeamsFieldsType>
    >("teams", "list");
    if (data) {
      const pools = data.reduce<PoolType[]>((acc, record) => {
        const { fields } = record;
        if (fields.pool) {
          const pool = acc.find((p) => p.id === fields.pool);
          if (pool) {
            pool.ranking.push(fields);
          } else {
            acc.push({
              id: fields.pool,
              name: fields.pool,
              ranking: [fields],
            });
          }
        }
        return acc;
      }, []);
      return pools;
    }
  } catch (error) {
    console.log(error);
  }
};
