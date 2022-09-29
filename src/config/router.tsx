import { createBrowserRouter, RouteObject, To } from "react-router-dom";
import i18n from "../i18n";
import FieldsPage from "../pages/FieldsPage";
import GamesPage from "../pages/GamesPage";
import PlayOffPage from "../pages/PlayOffPage";
import RankingPage from "../pages/RankingPage";

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
  {
    id: "fields",
    path: "/fields",
    element: <FieldsPage />,
    title: i18n.t("navigation:fields:title"),
  },
  {
    id: "play-off",
    path: "/play-off",
    element: <PlayOffPage />,
    title: i18n.t("navigation:playOff:title"),
  },
];

export default createBrowserRouter(getRoutes());
