export type Team = {
  id: string;
  name: string;
  logo: string;
};

export type TeamRanking = Team & {
  ranking: number;
  points: number;
  wins: number;
  losses: number;
};

export type Game = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  date: string;
};

export type Pool = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ranking: TeamRanking[];
  games: Game[];
};
