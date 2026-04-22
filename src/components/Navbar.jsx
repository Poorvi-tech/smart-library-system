import { Link } from 'react-router-dom';

function Navbar({ onLogout, user }) {
  return (
    <header className="topbar">
      <div className="brand">Smart Library System</div>
      <div className="topbar-actions">
        {user && <span className="user-label">Signed in as <strong>{user}</strong></span>}
        <button className="btn btn-ghost" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
