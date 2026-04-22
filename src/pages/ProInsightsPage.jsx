import { useLibrary } from '../context/LibraryContext.jsx';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Clock, BarChart2 } from 'lucide-react';

function ProInsightsPage() {
  const { books, issuedBooks, reservations, history } = useLibrary();
  
  const stats = [
    { title: 'Total Inventory', value: books.length, icon: <BookOpen />, color: '#3b82f6' },
    { title: 'Issued Now', value: issuedBooks.length, icon: <Clock />, color: '#ef4444' },
    { title: 'Active Reserves', value: reservations.length, icon: <TrendingUp />, color: '#f59e0b' },
    { title: 'Total Members', value: 1240, icon: <Users />, color: '#10b981' }
  ];

  const categories = [
    { name: 'Computer Science', count: 45, percentage: 85 },
    { name: 'Electronics', count: 28, percentage: 65 },
    { name: 'Management', count: 32, percentage: 70 },
    { name: 'Literature', count: 15, percentage: 40 }
  ];

  return (
    <div className="page-shell">
      <div style={{ display: 'grid', gap: '2rem' }}>
        <section className="card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <BarChart2 size={32} style={{ color: '#38bdf8' }} />
            <div>
              <h2 style={{ color: 'white' }}>Pro Library Analytics</h2>
              <p style={{ color: '#94a3b8' }}>Advanced usage trends and student engagement metrics.</p>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {stats.map((item, index) => (
            <motion.div 
              key={item.title} 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: `${item.color}15`, 
                color: item.color,
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 1rem'
              }}>
                {item.icon}
              </div>
              <span className="muted" style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.title}</span>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem' }}>{item.value}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          <section className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Category Distribution</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600' }}>{cat.name}</span>
                    <span className="muted">{cat.count} Books</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: '100%', background: 'var(--primary)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Peak Hours</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '150px', paddingTop: '1rem' }}>
              {[40, 70, 45, 90, 65, 30, 50].map((height, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    style={{ width: '100%', background: i === 3 ? 'var(--primary)' : '#e2e8f0', borderRadius: '4px' }}
                  />
                  <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8' }}>{8 + i * 2}h</span>
                </div>
              ))}
            </div>
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '1.5rem', textAlign: 'center' }}>
              Most activity recorded between <strong>2:00 PM - 4:00 PM</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProInsightsPage;
