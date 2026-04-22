import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import MobileNav from './MobileNav.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function Layout() {
  const { currentUser, logout } = useLibrary();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout-shell">
      <Sidebar />
      <div className="content-shell" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar user={currentUser} onLogout={logout} />
        <main className="page-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

export default Layout;
