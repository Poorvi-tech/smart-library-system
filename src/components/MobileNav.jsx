import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  QrCode, 
  Bell, 
  MapPin 
} from 'lucide-react';
import { motion } from 'framer-motion';

function MobileNav() {
  const menuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={24} />, label: 'Home' },
    { to: '/search', icon: <Search size={24} />, label: 'Search' },
    { to: '/qr-scan', icon: <QrCode size={24} />, label: 'Scan' },
    { to: '/alerts', icon: <Bell size={24} />, label: 'Alerts' },
    { to: '/locations', icon: <MapPin size={24} />, label: 'Map' },
  ];

  return (
    <nav className="mobile-nav">
      {menuItems.map((item) => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div 
                  layoutId="mobileActive"
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '30px',
                    height: '3px',
                    background: 'var(--primary)',
                    borderRadius: '0 0 4px 4px'
                  }}
                />
              )}
              {item.icon}
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;
