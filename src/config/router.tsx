import { createBrowserRouter, RouteObject, To } from "react-router-dom";
import i18n from "../i18n";
import GamesPage from "../features/games/screens/GamesPage";
import RankingPage from "../features/ranking/screens/RankingPage";
import LandingPage from "../features/landing/pages/LandingPage";

export const getRoutes = (): (RouteObject & { path: To; title: string })[] => [
  {
    id: "landing",
    path: "/",
    element: <LandingPage />,
    title: i18n.t("navigation:landing:title"),
  },
  {
    id: "ranking",
    path: "/ranking",
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
