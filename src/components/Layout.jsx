import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

function Layout({ user, onLogout }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout-shell">
      <Sidebar />
      <div className="content-shell">
        <Navbar user={user} onLogout={onLogout} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
