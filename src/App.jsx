import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BookSearchPage from './pages/BookSearchPage.jsx';
import QRScanPage from './pages/QRScanPage.jsx';
import BookDetailsPage from './pages/BookDetailsPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import BookLocationsPage from './pages/BookLocationsPage.jsx';
import ScanIssuePage from './pages/ScanIssuePage.jsx';
import ProInsightsPage from './pages/ProInsightsPage.jsx';
import { useLibrary } from './context/LibraryContext.jsx';

function App() {
  const { currentUser } = useLibrary();

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="search" element={<BookSearchPage />} />
          <Route path="qr-scan" element={<QRScanPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="locations" element={<BookLocationsPage />} />
          <Route path="issue" element={<ScanIssuePage />} />
          <Route path="insights" element={<ProInsightsPage />} />
          <Route path="book/:id" element={<BookDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
