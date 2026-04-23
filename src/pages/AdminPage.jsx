import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Book, 
  Clock, 
  AlertCircle, 
  BarChart, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  ArrowUpRight,
  Filter,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const AdminPage = () => {
  const { books, history } = useLibrary();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Derived data for students
  const students = useMemo(() => {
    const studentMap = new Map();
    books.forEach(book => {
      if (book.issuedTo) {
        if (!studentMap.has(book.issuedTo)) {
          studentMap.set(book.issuedTo, {
            id: book.issuedTo,
            name: book.issuedTo.charAt(0).toUpperCase() + book.issuedTo.slice(1),
            course: book.course || 'General',
            booksHeld: [],
            lastActive: 'Today'
          });
        }
        studentMap.get(book.issuedTo).booksHeld.push(book);
      }
    });
    // Add some dummy students who don't have books if the list is short
    if (studentMap.size < 5) {
      ['Rahul', 'Priya', 'Amit'].forEach(name => {
        if (!studentMap.has(name.toLowerCase())) {
          studentMap.set(name.toLowerCase(), {
            id: name.toLowerCase(),
            name,
            course: 'CSE',
            booksHeld: [],
            lastActive: 'Yesterday'
          });
        }
      });
    }
    return Array.from(studentMap.values());
  }, [books]);

  const stats = [
    { label: 'Total Books', value: books.length, icon: <Book size={24} />, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
    { label: 'Active Students', value: students.length, icon: <Users size={24} />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { label: 'Issued Books', value: books.filter(b => b.status === 'Issued').length, icon: <Clock size={24} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { label: 'Overdue', value: books.filter(b => b.dueDate && new Date(b.dueDate) < new Date()).length, icon: <AlertCircle size={24} />, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
  ];

  // Chart data calculation
  const chartData = useMemo(() => {
    const courses = ['CSE', 'ME', 'EE', 'EC', 'Civil'];
    const data = courses.map(course => ({
      name: course,
      count: books.filter(b => b.course === course).length,
      issued: books.filter(b => b.course === course && b.status === 'Issued').length
    }));
    const maxVal = Math.max(...data.map(d => d.count), 1);
    return { data, maxVal };
  }, [books]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="admin-container"
      style={{ 
        padding: '1.5rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem' 
      }}
    >
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="gradient-text" 
            style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}
          >
            Librarian Console
          </motion.h1>
          <p style={{ opacity: 0.6, margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>Smart management & predictive analytics hub</p>
        </div>
        <div className="glass-card" style={{ 
          padding: '0.75rem 1.25rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>System Operational</span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
        {['overview', 'books', 'students', 'analytics'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-main)',
              opacity: activeTab === tab ? 1 : 0.6,
              fontWeight: '600',
              cursor: 'pointer',
              position: 'relative',
              textTransform: 'capitalize',
              transition: 'all 0.3s ease'
            }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="adminTab"
                style={{
                  position: 'absolute',
                  bottom: '-0.5rem',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--primary)',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Stats Grid */}
            <section className="stats-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card"
                  style={{ 
                    padding: '1.75rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '16px', 
                    background: stat.gradient, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: `0 8px 20px -6px ${stat.color}`
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6, margin: 0, fontWeight: '500' }}>{stat.label}</p>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', margin: '0.1rem 0 0 0' }}>{stat.value}</h3>
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Quick Actions & Recent Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
              {/* Custom Bar Chart Card */}
              <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>Books by Department</h3>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '2px' }} />
                      <span style={{ opacity: 0.7 }}>Total</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} />
                      <span style={{ opacity: 0.7 }}>Issued</span>
                    </div>
                  </div>
                </div>
                
                {/* SVG Bar Chart */}
                <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '1rem', paddingBottom: '2rem', position: 'relative' }}>
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                    <div key={tick} style={{ 
                      position: 'absolute', 
                      bottom: `${tick * 100 + 10}%`, 
                      left: 0, 
                      right: 0, 
                      height: '1px', 
                      background: 'rgba(255,255,255,0.05)',
                      zIndex: 0
                    }} />
                  ))}
                  
                  {chartData.data.map((d, i) => (
                    <div key={d.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', zIndex: 1 }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'flex-end', height: '100%' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.count / chartData.maxVal) * 100}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          style={{ 
                            width: '20px', 
                            background: 'var(--primary)', 
                            borderRadius: '6px 6px 0 0',
                            opacity: 0.8,
                            position: 'relative'
                          }}
                        >
                           <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: '600' }}>{d.count}</span>
                        </motion.div>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.issued / chartData.maxVal) * 100}%` }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 1 }}
                          style={{ 
                            width: '20px', 
                            background: '#f59e0b', 
                            borderRadius: '6px 6px 0 0',
                            position: 'relative'
                          }}
                        >
                           <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: '600', color: '#f59e0b' }}>{d.issued}</span>
                        </motion.div>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', opacity: 0.7 }}>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Register New Student', icon: <Users size={18} /> },
                    { label: 'Inventory Audit', icon: <Search size={18} /> },
                    { label: 'Generate Reports', icon: <BarChart size={18} /> },
                    { label: 'System Settings', icon: <ShieldCheck size={18} /> },
                  ].map(action => (
                    <motion.button
                      key={action.label}
                      whileHover={{ x: 5, background: 'rgba(255,255,255,0.1)' }}
                      style={{
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        color: 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}
                    >
                      {action.icon}
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'books' && (
          <motion.div
            key="books"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card"
            style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ margin: 0 }}>Inventory Management</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                  <input 
                    type="text" 
                    placeholder="Search books..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: '0.6rem 1rem 0.6rem 2.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: 'white',
                      width: '250px'
                    }}
                  />
                </div>
                <button className="glass-card" style={{ padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <Filter size={18} /> Filter
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', opacity: 0.6, fontSize: '0.9rem' }}>
                    <th style={{ padding: '1rem' }}>Book Info</th>
                    <th style={{ padding: '1rem' }}>Course</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Issued To</th>
                    <th style={{ padding: '1rem' }}>Due Date</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).map((book, i) => (
                    <motion.tr 
                      key={book.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '40px', height: '56px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Book size={20} opacity={0.5} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600' }}>{book.title}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>ID: {book.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}><span className="tag">{book.course}</span></td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.3rem 0.8rem', 
                          borderRadius: '20px', 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          background: book.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: book.status === 'Available' ? '#10b981' : '#f59e0b',
                          border: `1px solid ${book.status === 'Available' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                        }}>
                          {book.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', opacity: 0.8 }}>{book.issuedTo || '--'}</td>
                      <td style={{ padding: '1rem', opacity: 0.8 }}>{book.dueDate || '--'}</td>
                      <td style={{ padding: '1rem' }}>
                        <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.5, cursor: 'pointer' }}>
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'students' && (
          <motion.div
            key="students"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card"
            style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
          >
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0 }}>Student Directory</h3>
              <button className="glass-card" style={{ padding: '0.7rem 1.2rem', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '600', borderRadius: '12px', cursor: 'pointer' }}>
                Add Student
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {students.map((student, i) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card"
                  style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.2rem', color: 'white' }}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{student.name}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{student.course} • ID: {student.id.toUpperCase()}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>{student.booksHeld.length}</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase' }}>Books</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Currently Holding:</div>
                    {student.booksHeld.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {student.booksHeld.map(b => (
                          <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <CheckCircle2 size={14} color="#10b981" />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85rem', opacity: 0.4, fontStyle: 'italic' }}>No active issues</div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Active: {student.lastActive}</span>
                    <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      View Profile <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <BarChart size={64} style={{ opacity: 0.2, marginBottom: '1.5rem', color: 'var(--primary)' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Advanced Analytics Suite</h2>
              <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.7 }}>
                Leverage AI-driven insights to predict book demand, track student engagement, and optimize library inventory placement.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
                {[
                  { label: 'Circulation Rate', value: '78%', growth: '+12%' },
                  { label: 'Avg. Retention', value: '5.2 Days', growth: '-0.4d' },
                  { label: 'Peak Usage', value: '2 PM - 4 PM', growth: 'Stable' },
                  { label: 'Fine Recovery', value: 'Rs 1,240', growth: '+Rs 450' },
                ].map(metric => (
                  <div key={metric.label} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '0.5rem' }}>{metric.label}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {metric.value}
                      <span style={{ fontSize: '0.75rem', color: metric.growth.startsWith('+') ? '#10b981' : '#f59e0b', fontWeight: '600' }}>
                        {metric.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminPage;
