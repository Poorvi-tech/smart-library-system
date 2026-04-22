import { useLibrary } from '../context/LibraryContext.jsx';
import { motion } from 'framer-motion';
import { Bell, Info, AlertTriangle, CheckCircle2, Clock, Trash2 } from 'lucide-react';

function AlertsPage() {
  const { notifications, autoDueAlerts } = useLibrary();
  const alerts = [...autoDueAlerts, ...notifications];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'Reminder': return <Clock size={20} className="text-amber-500" />;
      case 'System': return <Info size={20} className="text-blue-500" />;
      case 'Urgent': return <AlertTriangle size={20} className="text-red-500" />;
      default: return <Bell size={20} className="muted" />;
    }
  };

  return (
    <div className="page-shell">
      <motion.div 
        className="alerts-container"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gap: '2rem' }}
      >
        <section className="card hero-card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1.25rem', borderRadius: '20px' }}>
              <Bell size={40} style={{ color: '#38bdf8' }} />
            </div>
            <div>
              <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Notifications Center</h2>
              <p style={{ color: '#94a3b8' }}>Stay updated with your library activity, due dates, and system announcements.</p>
            </div>
          </div>
        </section>

        <section className="alert-list-section" style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Recent Alerts</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              <Trash2 size={16} /> Clear All
            </button>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {alerts.map((alert, index) => (
              <motion.div 
                key={alert.id || index}
                variants={item}
                className={`card alert-card ${
                  alert.type === 'Reminder' ? 'card-gradient-warning' : 
                  alert.type === 'System' ? 'card-gradient-primary' : 
                  'card-gradient-danger'
                }`}
                whileHover={{ scale: 1.01, borderColor: 'var(--primary)' }}
                style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  alignItems: 'center', 
                  padding: '1.25rem',
                  borderLeft: `4px solid ${alert.type === 'Reminder' ? '#f59e0b' : alert.type === 'System' ? '#3b82f6' : '#ef4444'}`
                }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '14px', 
                  background: '#f8fafc', 
                  display: 'grid', 
                  placeItems: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {getAlertIcon(alert.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em',
                      color: alert.type === 'Reminder' ? '#d97706' : alert.type === 'System' ? '#2563eb' : '#dc2626'
                    }}>
                      {alert.type}
                    </span>
                    <span className="muted" style={{ fontSize: '0.75rem' }}>Just now</span>
                  </div>
                  <p style={{ fontWeight: '500', color: '#1e293b' }}>{alert.message}</p>
                </div>
                <button className="btn btn-ghost" style={{ padding: '0.5rem', color: '#94a3b8' }}>
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
            
            {alerts.length === 0 && (
              <motion.div 
                variants={item}
                className="card" 
                style={{ textAlign: 'center', padding: '4rem' }}
              >
                <CheckCircle2 size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.1, color: 'var(--accent)' }} />
                <h3>All caught up!</h3>
                <p className="muted">No new notifications or reminders at the moment.</p>
              </motion.div>
            )}
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default AlertsPage;
