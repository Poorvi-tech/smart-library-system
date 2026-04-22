import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext.jsx';

function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [course, setCourse] = useState('CSE');
  const navigate = useNavigate();
  const { login } = useLibrary();

  function handleSubmit(event) {
    event.preventDefault();
    if (!identifier.trim()) return;
    login(identifier.trim(), course);
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
          <label>
            Course / Branch
            <select value={course} onChange={(event) => setCourse(event.target.value)}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MBA">MBA</option>
              <option value="BA">BA</option>
            </select>
          </label>

          <button className="btn btn-primary" type="submit">
            Verify & Continue
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
