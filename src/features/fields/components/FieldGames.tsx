import { GameFieldsType } from "../../../api/types";
import GameItem from "../../games/components/GameItem/GameItem";

interface FieldGamesProps {
  games?: GameFieldsType[];
}

const FieldGames = ({ games }: FieldGamesProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200 bg-white">
                  {games?.map((game) => (
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

export default FieldGames;
