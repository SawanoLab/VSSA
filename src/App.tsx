import HomeIndex from "./pages/home";
import MatchIndex from "./pages/match";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import TeamIndex from "./pages/team";
import { SignIn } from "./pages/SignIn";
import { useRoutes } from "react-router-dom";

const Route = () => {
  let element = useRoutes([
    { path: "/", element: <HomeIndex /> },
    { path: "/season", element: <SeasonIndex /> },

  ]);
  return element;
};

export default Route;
