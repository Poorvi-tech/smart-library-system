import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  QrCode, 
  Bell, 
  MapPin, 
  BookOpen, 
  BarChart3,
  Library
} from 'lucide-react';

import { motion } from 'framer-motion';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <motion.div 
        className="brand"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Library size={32} strokeWidth={2.5} />
        <span>SmartLib</span>
      </motion.div>

      <nav className="menu-list">
        {[
          { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { to: '/search', icon: <Search size={20} />, label: 'Book Search' },
          { to: '/qr-scan', icon: <QrCode size={20} />, label: 'QR Scan' },
        ].map((item) => (
          <NavLink 
            key={item.to}
            to={item.to} 
            className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
            style={{ position: 'relative' }}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="active-indicator"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'white',
                      borderRadius: '18px',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: -1
                    }}
                  />
                )}
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                </motion.div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p className="eyebrow" style={{ paddingLeft: '1.25rem', marginBottom: '0.5rem' }}>Features</p>
        <NavLink to="/alerts" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <Bell size={20} />
          <span>Alerts</span>
        </NavLink>
        <NavLink to="/locations" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <MapPin size={20} />
          <span>Locations</span>
        </NavLink>
        <NavLink to="/issue" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <BookOpen size={20} />
          <span>Issue Guide</span>
        </NavLink>
        <NavLink to="/insights" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <BarChart3 size={20} />
          <span>Insights</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
