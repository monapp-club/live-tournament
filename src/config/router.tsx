import { createBrowserRouter, RouteObject, To } from "react-router-dom";
import i18n from "../i18n";
import GamesPage from "../features/games/pages/GamesPage";
import RankingPage from "../features/ranking/pages/RankingPage";
import LandingPage from "../features/landing/pages/LandingPage";
import StatsPage from "../features/stats/pages/StatsPage";
import Page404 from "../uikit/Pages/Page404";
import FieldsPage from "../features/fields/pages/FieldsPage";

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
  {
    id: "stats",
    path: "/stats",
    element: <StatsPage />,
    title: i18n.t("navigation:stats:title"),
  },
  {
    id: "fields",
    path: "/fields",
    element: <FieldsPage />,
    title: i18n.t("navigation:fields:title"),
  },
  {
    id: "404",
    path: "*",
    element: <Page404 />,
    title: i18n.t("navigation:404:title"),
  },
];

export const NAVIGATION_BLACKLIST = ["404"];
export const getNavigationRoutes = () =>
  getRoutes().filter(
    (route) => route.id && !NAVIGATION_BLACKLIST.includes(route.id)
  );

export default createBrowserRouter(getRoutes());
