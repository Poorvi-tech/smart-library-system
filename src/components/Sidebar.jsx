import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-main">
        <div className="sidebar-title">Navigation</div>
        <nav className="menu-list">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
            Dashboard
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
            Book Search
          </NavLink>
          <NavLink to="/qr-scan" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
            QR Scan
          </NavLink>
        </nav>
      </div>
      <div className="sidebar-card quick-actions-card">
        <p className="muted">Quick actions</p>
        <div className="quick-actions-grid">
          <NavLink to="/alerts" className={({ isActive }) => isActive ? 'quick-feature action-button active' : 'quick-feature action-button'}>
            <strong>Alerts</strong>
            <span>Instant library notices & reminders</span>
          </NavLink>
          <NavLink to="/locations" className={({ isActive }) => isActive ? 'quick-feature action-button active' : 'quick-feature action-button'}>
            <strong>Book Locations</strong>
            <span>Find shelf positions quickly</span>
          </NavLink>
          <NavLink to="/issue" className={({ isActive }) => isActive ? 'quick-feature action-button active' : 'quick-feature action-button'}>
            <strong>Scan & Issue</strong>
            <span>Fast QR issue workflow</span>
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => isActive ? 'quick-feature action-button active' : 'quick-feature action-button'}>
            <strong>Pro Insights</strong>
            <span>Usage trends and student analytics</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
