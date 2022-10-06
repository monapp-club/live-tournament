export type CategoryEnumType = "U10" | "U12";

export type TeamsFieldsType = {
  id: string;
  name: string;
  rank: number;
  pool: string;
  logo: string;
  points: number;
  wins: number;
  losses: number;
  played: number;
  category: CategoryEnumType;
};

export type GameFieldsType = {
  pool: string;
  home_team: [string];
  date: string;
  started_at: string;
  away_team: [string];
  category: CategoryEnumType;
  home_score: number;
  away_score: number;
  status: "live" | "upcoming" | "done";
  half_time: "first" | "second";
  home_team_name: [string];
  home_team_logo: [string];
  away_team_logo: [string];
  away_team_name: [string];
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
