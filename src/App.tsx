import React from "react";
import { useRoutes } from "react-router-dom";
import AboutIndex from "./pages/about";
import HomeIndex from "./pages/home";

function App() {
  let element = useRoutes([
    { path: "/", element: <HomeIndex /> },
    { path: "about", element: <AboutIndex />},
  ]);
  return element;
}

export default App;
