import ComputerVisionAnalysisCreate from "pages/computerVision/create";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import AttackHistoryContext from "./hooks/analysis/attack/useAttackHistory";
import CardProvider from "./hooks/card/useCardController";
import MatchProvider from "./hooks/match/useMatch";
import PlayerProvider from "./hooks/match/usePlayer";
import SeasonProvider from "./hooks/match/useSeason";
import TeamProvider from "./hooks/match/useTeam";
import MatchValidationProvider from "./hooks/match/useValidation";
import { ProvideAuth } from "./hooks/use-auth";
import AnalysisCreate from "./pages/analysis/create";
import HomeIndex from "./pages/home";
import Layout from "./pages/Layout";
import MatchIndex from "./pages/match";
import MatchCreate from "./pages/match/create";
import PlayerIndex from "./pages/player";
import AttackReportIndex from "./pages/reports/attack/index";
import AttackReportShow from "./pages/reports/attack/show";
import SeasonIndex from "./pages/season";
import { SignIn } from "./pages/SignIn";
import TeamIndex from "./pages/team";
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
                <MatchProvider>
                  <MatchIndex />
                </MatchProvider>
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
            path="analysis/:matchId/cv"
            element={
              <PrivateRoute>
                <MatchProvider>
                  <AttackHistoryContext>
                    <CardProvider>
                      <ComputerVisionAnalysisCreate />
                    </CardProvider>
                  </AttackHistoryContext>
                </MatchProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="analysis/:matchId"
            element={
              <PrivateRoute>
                <MatchProvider>
                  <AttackHistoryContext>
                    <CardProvider>
                      <AnalysisCreate />
                    </CardProvider>
                  </AttackHistoryContext>
                </MatchProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="analysis/reports/match"
            element={
              <PrivateRoute>
                <CardProvider>
                  <AttackReportIndex />
                </CardProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="analysis/reports/match/:matchId"
            element={
              <PrivateRoute>
                <MatchProvider>
                  <AttackHistoryContext>
                    <CardProvider>
                      <AttackReportShow />
                    </CardProvider>
                  </AttackHistoryContext>
                </MatchProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div>
    <ProvideAuth>
      <SeasonProvider>
        <TeamProvider>
          <PlayerProvider>
            <RouteConfig />
          </PlayerProvider>
        </TeamProvider>
      </SeasonProvider>
    </ProvideAuth>
  </div>
);

reportWebVitals();
