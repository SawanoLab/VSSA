import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./composents/PrivateRoute";
import MatchProvider from "./hooks/match/matchProvider";
import PlayerProvider from "./hooks/match/use-player";
import SeasonProvider from "./hooks/match/use-season";
import TeamProvider from "./hooks/match/use-team";
import MatchValidationProvider from "./hooks/match/use-validation";
import { ProvideAuth } from "./hooks/use-auth";
import HomeIndex from "./pages/home";
import Layout from "./pages/Layout";
import MatchIndex from "./pages/match";
import MatchCreate from "./pages/match/create";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import { SignIn } from "./pages/SignIn";
import TeamIndex from "./pages/team";
import TeamCreate from "./pages/team/create";
import reportWebVitals from "./reportWebVitals";

function RouteConfig() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<HomeIndex />} />
          <Route path="signin" element={<SignIn />} />
          <Route
            path="season"
            element={
              <PrivateRoute>
                <SeasonIndex />
              </PrivateRoute>
            }
          />
          <Route
            path="match"
            element={
              <PrivateRoute>
                <MatchIndex />
              </PrivateRoute>
            }
          />
          <Route
            path="match/create"
            element={
              <PrivateRoute>
                <MatchValidationProvider>
                  <MatchProvider>
                    <MatchCreate />
                  </MatchProvider>
                </MatchValidationProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="player"
            element={
              <PrivateRoute>
                <PlayerIndex />
              </PrivateRoute>
            }
          />
          <Route
            path="team"
            element={
              <PrivateRoute>
                <TeamIndex />
              </PrivateRoute>
            }
          />
          <Route
            path="team/create"
            element={
              <PrivateRoute>
                <TeamCreate />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ProvideAuth>
      <SeasonProvider>
        <TeamProvider>
          <PlayerProvider>
            <RouteConfig />
          </PlayerProvider>
        </TeamProvider>
      </SeasonProvider>
    </ProvideAuth>
  </>
);

reportWebVitals();
