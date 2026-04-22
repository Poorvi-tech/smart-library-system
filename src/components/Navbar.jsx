import { User, LogOut, Search, Bell } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({ onLogout, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    switch(path) {
      case 'dashboard': return 'Dashboard';
      case 'search': return 'Book Search';
      case 'qr-scan': return 'QR Scanner';
      case 'alerts': return 'Notifications';
      case 'locations': return 'Library Map';
      case 'issue': return 'Scan & Issue';
      case 'insights': return 'Analytics';
      default: return 'SmartLib';
    }
  };

  return (
    <header className="topbar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1.5rem 0',
      marginBottom: '1rem',
      background: 'transparent'
    }}>
      <div className="page-info">
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>
          {getPageTitle()}
        </h1>
        <p className="muted" style={{ fontSize: '0.85rem' }}>Welcome back to your library dashboard</p>
      </div>

      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div 
          className="search-trigger" 
          onClick={() => navigate('/search')}
          style={{ 
            background: 'white', 
            padding: '0.6rem', 
            borderRadius: '12px', 
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            color: '#64748b'
          }}
        >
          <Search size={20} />
        </div>
        
        <div 
          className="notif-trigger" 
          onClick={() => navigate('/alerts')}
          style={{ 
            background: 'white', 
            padding: '0.6rem', 
            borderRadius: '12px', 
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            color: '#64748b',
            position: 'relative'
          }}
        >
          <Bell size={20} />
          <span style={{ 
            position: 'absolute', 
            top: '-4px', 
            right: '-4px', 
            width: '10px', 
            height: '10px', 
            background: '#ef4444', 
            borderRadius: '50%', 
            border: '2px solid white' 
          }} />
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.05)', margin: '0 0.5rem' }} />

        {user && (
          <div className="user-badge" style={{ padding: '0.4rem 0.4rem 0.4rem 1.25rem' }}>
            <div className="user-label" style={{ marginRight: '0.75rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.1' }}>
                {user.id.split('@')[0]}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
                {user.course}
              </div>
            </div>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'grid',
              placeItems: 'center',
              color: 'white'
            }}>
              <User size={20} />
            </div>
          </div>
        )}

        <button 
          className="btn btn-secondary" 
          onClick={onLogout} 
          style={{ 
            padding: '0.6rem', 
            borderRadius: '12px',
            background: '#fee2e2',
            color: '#ef4444',
            border: 'none',
            boxShadow: 'none'
          }}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
