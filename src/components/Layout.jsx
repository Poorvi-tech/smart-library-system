import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';

function Layout() {
  const { currentUser, logout } = useLibrary();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout-shell">
      <Sidebar />
      <div className="content-shell">
        <Navbar user={currentUser} onLogout={logout} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
