import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!identifier.trim()) return;
    onLogin(identifier.trim());
    navigate('/dashboard');
  }

  return (
    <div className="page-shell login-page">
      <div className="auth-card">
        <div className="brand-block">
          <span className="brand-icon">📚</span>
          <div>
            <h1>Smart Library Login</h1>
            <p>Enter your college ID or email to continue and access your library dashboard.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            College ID / Email
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="e.g. 2026CSE001 or p@example.edu"
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Continue
          </button>
        </form>

        <div className="login-hints">
          <div className="hint-chip">Fast access</div>
          <div className="hint-chip">Secure campus login</div>
          <div className="hint-chip">QR-ready features</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
