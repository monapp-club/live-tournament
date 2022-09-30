import { PoolType } from "../../types";
import GameItem from "../GameItem/GameItem";

interface PoolGamesProps {
  pool: PoolType;
}

const PoolGames = ({ pool }: PoolGamesProps) => {
  return (
    <div>
      {/* {pool.games.map((game) => (
        <GameItem game={game} />
      ))} */}
    </div>
  );
};

export default PoolGames;
