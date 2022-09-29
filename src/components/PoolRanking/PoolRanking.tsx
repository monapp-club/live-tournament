import { Pool } from "../../types";
import RankingItem from "../RankingItem/RankingItem";

interface PoolRankingProps {
  pool: Pool;
}

const PoolRanking = ({ pool }: PoolRankingProps) => {
  return (
    <table>
      {pool.ranking.map((ranking) => (
        <RankingItem ranking={ranking} />
      ))}
    </table>
  );
};

export default PoolRanking;
