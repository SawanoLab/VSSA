import React from "react";
import { useRoutes } from "react-router-dom";
import HomeIndex from "./pages/home";
import MatchIndex from "./pages/match";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import TeamIndex from "./pages/team";

function App() {
  let element = useRoutes([
    { path: "/", element: <HomeIndex /> },
    { path: "/match", element: <MatchIndex /> },
    { path: "/player", element: <PlayerIndex /> },
    { path: "/team", element: <TeamIndex /> },
    { path: "/season", element: <SeasonIndex /> },
  ]);
  return element;
}

export default App;
