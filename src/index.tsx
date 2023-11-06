import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { ProvideAuth } from "./hooks/use-auth";
import SeasonProvider from "./hooks/use-season";
import TeamProvider from "./hooks/use-team";
import PlayerProvider from "./hooks/use-player";
import { SignIn } from "./pages/SignIn";
import HomeIndex from "./pages/home";
import MatchIndex from "./pages/match";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import TeamIndex from "./pages/team";
import PrivateRoute from "./composents/PrivateRoute";
import SeasonCreate from "./pages/season/create";
import TeamCreate from "./pages/team/create";
import PlayerCreate from "./pages/player/create";


function RouteConfig() {
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<HomeIndex />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="dashboard" element={<PrivateRoute />} />
            <Route path="season" element={
            <PrivateRoute>
              <SeasonIndex />
            </PrivateRoute>
            } />
            <Route path="season/create" element={
            <PrivateRoute>
              <SeasonCreate />
            </PrivateRoute>
            }/>
            <Route path="match" element={<MatchIndex />} />
            <Route path="player" element={<PlayerIndex />} />
            <Route path="player/create" element={<PlayerCreate />} />
            <Route path="team" element={
            <PrivateRoute>
              <TeamIndex />
            </PrivateRoute>
            } />
            <Route path="team/create" element={
            <PrivateRoute>
              <TeamCreate />
            </PrivateRoute>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth>
      <SeasonProvider>
        <TeamProvider>
          <PlayerProvider>
            <RouteConfig />
          </PlayerProvider>
        </TeamProvider>
      </SeasonProvider>
    </ProvideAuth>
  </React.StrictMode>
);

reportWebVitals();
