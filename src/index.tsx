import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './pages/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Layout>
      <App />
    </Layout>
  </Router>
);

reportWebVitals();
