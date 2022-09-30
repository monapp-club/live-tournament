import { Game, PoolType } from "../../types";
import { TeamsFieldsType } from "../types";

const generateTeams = (count: number): TeamsFieldsType[] => {
  const teams = [];
  for (let i = 0; i < count; i++) {
    teams.push({
      id: `team-${i}`,
      name: `Team ${i}`,
      logo: `https://via.placeholder.com/150?text=Team+${i}`,
      rank: i + 1,
      pool: "pool-1",
      points: 0,
      wins: 0,
      losses: 0,
    });
  }
  return teams;
};

const generateRanking = (teams: TeamsFieldsType[]): TeamsFieldsType[] => {
  return teams.map((team, index) => ({
    ...team,
    pool: "pool-1",
    id: `team-${index}`,
    logo: `https://via.placeholder.com/150?text=Team+${index}`,
    name: `Team ${index}`,
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

const generatePool = (id: string): PoolType => ({
  id,
  name: `Pool ${id}`,
  ranking: generateRanking(generateTeams(4)),
});

const pools: PoolType[] = [
  generatePool("1"),
  generatePool("2"),
  generatePool("3"),
  generatePool("4"),
];

export default pools;
