import PoolRanking from "../PoolRanking/PoolRanking";
import PoolHeader from "../../../../uikit/PoolHeader/PoolHeader";
import { PoolRankingType } from "../../../../types";

interface PoolRankingGridProps {
  pools?: PoolRankingType[];
}

const PoolRankingGrid = ({ pools }: PoolRankingGridProps) => {
  return (
    <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-2">
      {pools?.map((pool) => (
        <div key={pool.id} className="group relative">
          <PoolHeader>{pool.name}</PoolHeader>
          <PoolRanking pool={pool} />
        </div>
      ))}
    </div>
  );
};

export default PoolRankingGrid;
