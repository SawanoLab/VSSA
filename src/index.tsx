import ReactDOM from "react-dom/client";
import "./index.css";
import Route from "./Route";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ProvideAuth } from "./hooks/use-auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ProvideAuth>
        <Route />
    </ProvideAuth>
  </Router>
);

reportWebVitals();
