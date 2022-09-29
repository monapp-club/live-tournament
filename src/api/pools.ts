import { Game, Pool, Team, TeamRanking } from "../types";

const generateTeams = (count: number): Team[] => {
  const teams = [];
  for (let i = 0; i < count; i++) {
    teams.push({
      id: `team-${i}`,
      name: `Team ${i}`,
      logo: `https://via.placeholder.com/150?text=Team+${i}`,
    });
  }
  return teams;
};

const generateRanking = (teams: Team[]): TeamRanking[] => {
  return teams.map((team, index) => ({
    ...team,
    ranking: index + 1,
    points: 0,
    wins: 0,
    losses: 0,
  }));
};

const generateGames = (count: number): Game[] => {
  const teams = generateTeams(4);
  const games = [];
  for (let i = 0; i < count; i++) {
    games.push({
      id: `game-${i}`,
      homeTeam: teams[i % 4],
      awayTeam: teams[(i + 1) % 4],
      homeScore: 0,
      awayScore: 0,
      date: "2020-01-01",
    });
  }
  return games;
};

const generatePool = (id: string): Pool => ({
  id,
  name: `Pool ${id}`,
  description: `This is pool ${id}`,
  createdAt: "2020-01-01",
  updatedAt: "2020-01-01",
  ranking: generateRanking(generateTeams(4)),
  games: generateGames(12),
});

const pools: Pool[] = [
  generatePool("1"),
  generatePool("2"),
  generatePool("3"),
  generatePool("4"),
];

export default pools;
