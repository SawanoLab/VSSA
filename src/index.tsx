import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import Layout from "./pages/Layout";
import { ProvideAuth } from "./hooks/use-auth";
import HomeIndex from "./pages/home";
import MatchIndex from "./pages/match";
import PlayerIndex from "./pages/player";
import SeasonIndex from "./pages/season";
import TeamIndex from "./pages/team";
import { SignIn } from "./pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./composents/PrivateRoute";
import SeasonCreate from "./pages/season/create";


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
            <Route path="team" element={<TeamIndex />} />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth>
      <RouteConfig />
    </ProvideAuth>
  </React.StrictMode>
);

reportWebVitals();
