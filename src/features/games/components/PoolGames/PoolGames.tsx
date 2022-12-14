import { PoolGamesType } from "../../../../types";
import GameItem from "../GameItem/GameItem";

interface PoolGamesProps {
  pool?: PoolGamesType;
}

const PoolGames = ({ pool }: PoolGamesProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pool?.games?.map((game) => (
                    <GameItem game={game} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolGames;
