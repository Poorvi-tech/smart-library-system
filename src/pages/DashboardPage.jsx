import { useLibrary } from '../context/LibraryContext.jsx';
import { motion } from 'framer-motion';
import { 
  BookMarked, 
  Library, 
  Calendar, 
  Bell, 
  History,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

function DashboardPage() {
  const { currentUser, books, issuedBooks, notifications, autoDueAlerts, history, reservations } = useLibrary();
  const latestNotes = [...autoDueAlerts, ...notifications].slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="dashboard-grid"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.section variants={item} className="dashboard-hero card hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Smart Library Insights</span>
          <h2>Welcome back,<br />{currentUser?.id.split('@')[0]}!</h2>
          <p className="hero-copy-text">
            Your personalized library hub for {currentUser?.course}. Keep track of your reading journey and never miss a deadline.
          </p>
          
          <div className="stats-grid" style={{ marginTop: '2.5rem' }}>
            <motion.div whileHover={{ y: -5 }} className="card stat-card card-gradient-primary" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.03)' }}>
              <span className="stat-value" style={{ color: 'var(--primary)', textShadow: 'none' }}>{issuedBooks.length}</span>
              <span className="stat-label" style={{ color: '#64748b', letterSpacing: '0.1em' }}>ISSUED BOOKS</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="card stat-card card-gradient-success" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.03)' }}>
              <span className="stat-value" style={{ color: '#10b981', textShadow: 'none' }}>{books.length - issuedBooks.length}</span>
              <span className="stat-label" style={{ color: '#64748b', letterSpacing: '0.1em' }}>AVAILABLE NOW</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="card stat-card card-gradient-warning" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.03)' }}>
              <span className="stat-value" style={{ color: '#f59e0b', textShadow: 'none' }}>{reservations.length}</span>
              <span className="stat-label" style={{ color: '#64748b', letterSpacing: '0.1em' }}>RESERVATIONS</span>
            </motion.div>
          </div>
        </div>

        <div className="hero-media" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative', 
          minWidth: '450px',
          padding: '2rem'
        }}>
          <motion.div 
            className="hero-image floating" 
            style={{ 
              backgroundImage: 'url(/img1.jpeg)',
              width: '360px',
              height: '220px',
              borderRadius: '32px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 40px 80px -15px rgba(0, 0, 0, 0.2)',
              border: '8px solid white',
              zIndex: 2,
              rotate: -4
            }} 
          />
          <motion.div 
            className="hero-image floating" 
            style={{ 
              backgroundImage: 'url(/img2.jpeg)',
              width: '320px',
              height: '180px',
              borderRadius: '28px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animationDelay: '1.5s',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)',
              border: '8px solid white',
              marginTop: '-80px',
              marginLeft: '140px',
              zIndex: 1,
              rotate: 6
            }} 
          />
        </div>
      </motion.section>

      <motion.section variants={item} className="card notifications-card">
        <div className="card-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '12px' }}>
              <Bell className="accent-text" size={24} />
            </div>
            <div>
              <h3>Recent Alerts</h3>
              <p className="muted">Live updates & reminders</p>
            </div>
          </div>
          <span className="badge accent" style={{ background: '#dcfce7', color: '#15803d' }}>Live</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {latestNotes.map((note) => (
            <div key={note.id} className="notification-item card-gradient-primary" style={{ borderLeft: '4px solid var(--primary)', background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{note.type}</strong>
                <span className="muted" style={{ fontSize: '0.75rem' }}><Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Just now</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>{note.message}</p>
            </div>
          ))}
          {latestNotes.length === 0 && <p className="muted">No new notifications.</p>}
        </div>
      </motion.section>

      <motion.section variants={item} className="card">
        <div className="card-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '12px' }}>
              <BookMarked style={{ color: '#10b981' }} size={24} />
            </div>
            <div>
              <h3>Currently Reading</h3>
              <p className="muted">Your issued collection</p>
            </div>
          </div>
        </div>
        <div className="issued-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {issuedBooks.map((book) => (
            <div key={book.id} className="card stat-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '60px', background: '#f1f5f9', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
                  <Library size={20} className="muted" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>{book.title}</h4>
                  <p className="muted" style={{ fontSize: '0.8rem' }}>{book.author}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ef4444' }}>DUE DATE</div>
                <div style={{ fontWeight: '700' }}>{book.dueDate}</div>
              </div>
            </div>
          ))}
          {issuedBooks.length === 0 && (
            <div className="muted" style={{ textAlign: 'center', padding: '2rem' }}>
              <Library size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>No books issued yet.</p>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section variants={item} className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-header" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#faf5ff', padding: '0.75rem', borderRadius: '12px' }}>
              <History style={{ color: '#a855f7' }} size={24} />
            </div>
            <div>
              <h3>Activity Timeline</h3>
              <p className="muted">Your library interaction history</p>
            </div>
          </div>
          <button className="btn btn-secondary">View All <ArrowRight size={16} /></button>
        </div>
        <div className="history-timeline" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', background: '#f1f5f9' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {history.slice(0, 4).map((entry) => (
              <div key={entry.id} style={{ display: 'flex', gap: '1.5rem', position: 'relative', paddingLeft: '45px' }}>
                <div style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '0', 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  background: entry.action === 'Issued' ? '#3b82f6' : '#10b981',
                  border: '4px solid white',
                  boxShadow: 'var(--shadow-sm)'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem' }}>{entry.bookTitle}</h4>
                    <span className={`status-pill ${entry.action === 'Issued' ? 'issued' : 'available'}`} style={{ fontSize: '0.65rem' }}>{entry.action}</span>
                  </div>
                  <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {entry.action === 'Issued' ? `Borrowed on ${entry.issueDate}` : `Returned on ${entry.returnDate}`}
                  </p>
                </div>
              </div>
            ))}
            {history.length === 0 && <p className="muted" style={{ textAlign: 'center' }}>No recent activity found.</p>}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default DashboardPage;
