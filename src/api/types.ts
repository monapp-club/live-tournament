export type CategoryEnumType =
  | "U12 - A"
  | "U12 - B"
  | "U12 - C"
  | "U10 - A"
  | "U10 - B"
  | "U10 - C";

export type CategoryFieldsType = {
  id: string;
  name: CategoryEnumType;
};

export type TeamsFieldsType = {
  id: string;
  name: string;
  rank: number;
  pool: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  played: number;
  bonus_off: number;
  bonus_def: number;
  diff: number;
  category: CategoryEnumType;
  club_name: [string];
  club_logo_url: [string];
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
  home_team_name?: [string];
  home_team_logo?: [string];
  away_team_logo?: [string];
  away_team_name?: [string];
};

export type AirtableRecordType<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

export type AirtableResultType<T> = {
  records: AirtableRecordType<T>[];
};

export type AirtableTableType = "categories" | "teams" | "games";
export type AirtableViewType = "list";
