import { createBrowserRouter, RouteObject, To } from "react-router-dom";
import i18n from "../i18n";
import GamesPage from "../features/games/screens/GamesPage";
import RankingPage from "../features/ranking/screens/RankingPage";

export const getRoutes = (): (RouteObject & { path: To; title: string })[] => [
  {
    id: "ranking",
    path: "/",
    element: <RankingPage />,
    title: i18n.t("navigation:ranking:title"),
  },
  {
    id: "games",
    path: "/games",
    element: <GamesPage />,
    title: i18n.t("navigation:games:title"),
  },
];

export default createBrowserRouter(getRoutes());
