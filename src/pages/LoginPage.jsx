import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext.jsx';
import { authAPI } from '../services/api.js';
import { motion } from 'framer-motion';
import { Library, ArrowRight, ShieldCheck, Zap, QrCode, BookOpen, Sparkles, Globe } from 'lucide-react';

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('CSE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useLibrary();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!identifier.trim()) return;
    if (isSignup && !name.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = isSignup
        ? await authAPI.signup({
            studentId: identifier.trim(),
            name: name.trim(),
            email: email.trim(),
            course
          })
        : await authAPI.login(identifier.trim(), course);

      if (result.success) {
        login(result.user);
        navigate(result.user.isAdmin ? '/admin' : '/dashboard');
      } else {
        setError(result.error || (isSignup ? 'Signup failed' : 'Login failed'));
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  function toggleAuthMode() {
    setIsSignup((prev) => !prev);
    setError('');
  }

  const floatingElements = [
    { icon: <BookOpen size={24} />, top: '10%', left: '15%', delay: 0 },
    { icon: <Sparkles size={20} />, top: '20%', left: '80%', delay: 1 },
    { icon: <Globe size={22} />, top: '70%', left: '10%', delay: 2 },
    { icon: <QrCode size={24} />, top: '80%', left: '85%', delay: 1.5 },
  ];

  return (
    <div className="login-page-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      background: '#f8fafc',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: el.top,
            left: el.left,
            color: 'var(--primary)',
            opacity: 0.15,
            zIndex: 0
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Left Side - Visual Hero */}
      <div className="login-hero" style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="brand" style={{ marginBottom: '3rem' }}>
            <Library size={48} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white' }}>SmartLib</h1>
          </div>
          <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            The next generation of <span style={{ color: '#38bdf8' }}>Library Management</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '500px', marginBottom: '3rem' }}>
            Experience real-time book tracking, instant QR issuing, and advanced analytics all in one place.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                <QrCode size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>QR Ready</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Instant scanning</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Zap size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Real-time</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Live updates</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Circles */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-100px', 
          right: '-100px', 
          width: '400px', 
          height: '400px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)' 
        }} />
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-container" style={{ 
        width: '550px', 
        display: 'grid', 
        placeItems: 'center', 
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 1
      }}>
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            ease: [0.23, 1, 0.32, 1]
          }}
          style={{ width: '100%', maxWidth: '420px', padding: '3rem', borderRadius: '32px', background: 'white', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(0,0,0,0.03)' }}
        >
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              {isSignup ? 'Student Signup' : 'Student Login'}
            </h3>
            <p className="muted">
              {isSignup
                ? 'Create your account to access the smart library.'
                : 'Welcome back! Please enter your details.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            {isSignup && (
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569' }}>Full Name</label>
                <input
                  type="text"
                  required={isSignup}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Priya Sharma"
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569' }}>Student ID / Email</label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="e.g. 2026CSE001"
                style={{ 
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>

            {isSignup && (
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569' }}>Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="e.g. 2026cse001@college.edu"
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569' }}>Select Your Course</label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={course} 
                  onChange={(event) => setCourse(event.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '1rem',
                    appearance: 'none',
                    cursor: 'pointer',
                    background: 'white',
                    outline: 'none'
                  }}
                >
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="ECE">Electronics (ECE)</option>
                  <option value="MBA">Management (MBA)</option>
                  <option value="BA">Arts (BA)</option>
                </select>
                <div style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
                  <ArrowRight size={18} style={{ transform: 'rotate(90deg)' }} />
                </div>
              </div>
            </div>

            <motion.button 
              className="btn btn-primary" 
              type="submit"
              disabled={loading}
              whileHover={{ scale: !loading ? 1.02 : 1, boxShadow: !loading ? '0 20px 25px -5px rgb(0 0 0 / 0.1)' : 'none' }}
              whileTap={{ scale: !loading ? 0.98 : 1 }}
              style={{ 
                padding: '1.25rem', 
                fontSize: '1.1rem', 
                fontWeight: '700',
                marginTop: '1rem',
                borderRadius: '16px',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading
                ? isSignup
                  ? 'Creating account...'
                  : 'Logging in...'
                : isSignup
                ? 'Create Account'
                : 'Access Library'}{' '}
              <ArrowRight size={20} style={{ marginLeft: '10px' }} />
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: '#fee2e2',
                  color: '#991b1b',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid #fecaca'
                }}
              >
                {error}
              </motion.div>
            )}
          </form>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={toggleAuthMode}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--primary)',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '0.75rem'
              }}
            >
              {isSignup ? 'Already have an account? Login' : "New here? Create an account"}
            </button>
            <p className="muted" style={{ fontSize: '0.9rem' }}>
              Need help? <a href="#" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Contact Librarian</a>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .login-hero { display: none; }
          .login-form-container { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
