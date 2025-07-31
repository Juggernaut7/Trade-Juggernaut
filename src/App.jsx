import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CryptoDetailPage from './pages/CryptoDetailPage'; // NEW: Import the new detail page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* NEW: Route for individual crypto details */}
        <Route path="/crypto/:id" element={<CryptoDetailPage />} />
        {/* Add more routes here as your app grows */}
      </Routes>
    </Router>
  );
}

export default App;