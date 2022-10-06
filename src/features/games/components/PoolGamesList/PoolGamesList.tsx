import { PoolGamesType } from "../../../../types";
import PoolHeader from "../../../../uikit/PoolHeader/PoolHeader";
import { classNames } from "../../../../utils";
import PoolGames from "../PoolGames/PoolGames";

interface PoolGameListProps {
  pools?: PoolGamesType[];
  selectedPool?: string;
}

const PoolGameList = ({ pools, selectedPool }: PoolGameListProps) => {
  const poolSelected = pools?.find((pool) => pool.name === selectedPool);
  const renderPool = (pool: PoolGamesType) => {
    if (!pool) {
      return null;
    }

    return (
      <div key={pool.id} className="group relative">
        <PoolHeader>{pool.name}</PoolHeader>
        <PoolGames pool={pool} />
      </div>
    );
  };

  return (
    <div
      className={classNames(
        "mt-6 gap-y-10 gap-x-6 ",
        !poolSelected
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-2"
          : ""
      )}
    >
      {poolSelected ? renderPool(poolSelected) : pools?.map(renderPool)}
    </div>
  );
};

export default PoolGameList;
