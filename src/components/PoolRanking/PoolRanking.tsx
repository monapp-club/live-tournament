import { PoolType } from "../../types";
import RankingItem from "../RankingItem/RankingItem";
import "./PoolRanking.css";

interface PoolRankingProps {
  pool: PoolType;
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
