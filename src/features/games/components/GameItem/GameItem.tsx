import dayjs from "dayjs";
import frLocale from "dayjs/locale/fr";
import { GameFieldsType } from "../../../../api/types";
import i18n from "../../../../i18n";
import { classNames } from "../../../../utils";
import Timer from "../../../../uikit/Timer/Timer";

dayjs.locale(frLocale);

interface GameItemProps {
  game: GameFieldsType;
}

const isTeamIsWinner = (game: GameFieldsType, team: string) => {
  if (game.status === "done" || game.status === "live") {
    if (game.home_team_name[0] === team) {
      return game.home_score > game.away_score;
    } else {
      return game.away_score > game.home_score;
    }
  }
  return false;
};

const GameItem = ({ game }: GameItemProps) => {
  return (
    <tr>
      <td className="whitespace-nowrap pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex flex-row">
            <img
              className="h-10 w-10 rounded object-contain"
              src={game.home_team_logo[0]}
              alt=""
            />
            <img
              className="h-10 w-10 rounded object-contain"
              src={game.away_team_logo[0]}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div
              className={classNames(
                "font-medium font-bold",
                isTeamIsWinner(game, game.home_team_name[0])
                  ? "text-indigo-600"
                  : "text-gray-500"
              )}
            >
              {game.home_team_name[0]}
            </div>
            <div
              className={classNames(
                "font-medium font-bold",
                isTeamIsWinner(game, game.away_team_name[0])
                  ? "text-indigo-600"
                  : "text-gray-500"
              )}
            >
              {game.away_team_name[0]}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3  text-sm text-gray-500">
        <div className="flex flex-row">
          <span
            className={classNames(
              "inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-green-800",
              game.status === "done" ? "bg-green-100" : "bg-gray-100",
              game.status === "live" ? "bg-red-100" : "bg-gray-100"
            )}
          >
            {/** @ts-ignore */}
            {i18n.t(`games:status:${game.status}`)}
          </span>
          {game.status === "live" && <Timer dateTime={game.started_at} />}
        </div>
        {game.status === "live" && (
          <p>
            {/** @ts-ignore */}
            {i18n.t(`games:half_time:${game.half_time}`)}
          </p>
        )}
        {game.status === "upcoming" && (
          <p>{dayjs(game.started_at).format("ddd DD MMM HH:mm")}</p>
        )}
      </td>
      <td className="relative whitespace-nowrap  pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <td className="whitespace-nowrap px-3  text-sm">
          <dd
            className={classNames(
              "mt-1 text-2xl font-semibold tracking-tight ",
              isTeamIsWinner(game, game.home_team_name[0])
                ? "text-indigo-600"
                : "text-gray-500"
            )}
          >
            {game.home_score}
          </dd>
          <dd
            className={classNames(
              "-mt-1 text-xl font-semibold tracking-tight ",
              isTeamIsWinner(game, game.away_team_name[0])
                ? "text-3xl text-indigo-600"
                : "text-2xl text-gray-500"
            )}
          >
            {game.away_score}
          </dd>
        </td>
      </td>
    </tr>
  );
};

export default GameItem;
