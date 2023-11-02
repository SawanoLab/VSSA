import HomeIndex from "./pages/home";
import MatchIndex from "./pages/match";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import TeamIndex from "./pages/team";
import { SignIn } from "./pages/SignIn";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";
import PrivateRoute from "./composents/PrivateRoute";

const Route = () => {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <HomeIndex />
        </PrivateRoute>
      ),
    },
    {
      path: "/season",
      element: (
        <PrivateRoute>
          <SeasonIndex />
        </PrivateRoute>
      ),
    },
    {
      path: "/match",
      element: (
        <PrivateRoute>
          <MatchIndex />
        </PrivateRoute>
      ),
    },
    {
      path: "/player",
      element: (
        <PrivateRoute>
          <PlayerIndex />
        </PrivateRoute>
      ),
    },
    {
      path: "/team",
      element: (
        <PrivateRoute>
          <TeamIndex />
        </PrivateRoute>
      ),
    },
    { path: "/signin", element: <SignIn /> },
  ]);
  return <Layout>{element}</Layout>;
};

export default Route;
