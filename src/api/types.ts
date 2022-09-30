export type TeamsFieldsType = {
  id: string;
  name: string;
  rank: number;
  pool: string;
  logo: string;
  points: number;
  wins: number;
  losses: number;
};

export type AirtableRecordType<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

export type AirtableResultType<T> = {
  records: AirtableRecordType<T>[];
};

export type AirtableTableType = "teams" | "games";
export type AirtableViewType = "list" | "grid";
