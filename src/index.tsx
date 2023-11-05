import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import Layout from "./pages/Layout";
import { ProvideAuth } from "./hooks/use-auth";
import SeasonProvider from "./hooks/use-season";
import TeamProvider from "./hooks/use-team";
import HomeIndex from "./pages/home";
import MatchIndex from "./pages/match";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import TeamIndex from "./pages/team";
import { SignIn } from "./pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./composents/PrivateRoute";
import SeasonCreate from "./pages/season/create";
import TeamCreate from "./pages/team/create";


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
          <RouteConfig />
        </TeamProvider>
      </SeasonProvider>
    </ProvideAuth>
  </React.StrictMode>
);

reportWebVitals();
