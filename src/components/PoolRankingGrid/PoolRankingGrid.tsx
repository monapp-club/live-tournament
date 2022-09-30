import { PoolType } from "../../types";
import TagLabel from "../TagLabel/TagLabel";
import PoolRanking from "../PoolRanking/PoolRanking";
import "./PoolRankingGrid.css";

interface PoolRankingGridProps {
  pools?: PoolType[];
}

const PoolRankingGrid = ({ pools }: PoolRankingGridProps) => {
  return (
    <div className="pools-container">
      {pools?.map((pool) => (
        <div>
          <TagLabel>{pool.name}</TagLabel>
          <PoolRanking pool={pool} />
        </div>
      ))}
    </div>
  );
};

export default PoolRankingGrid;
