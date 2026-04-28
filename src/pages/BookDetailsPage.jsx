import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bookAPI } from '../services/api.js';
import { 
  ArrowLeft, 
  Book, 
  MapPin, 
  Layers, 
  Hash, 
  Calendar, 
  Bookmark, 
  Share2,
  Info
} from 'lucide-react';

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchBook() {
      setLoading(true);
      const result = await bookAPI.getBookById(id);
      if (isMounted) {
        setBook(result.success ? result.book : null);
        setLoading(false);
      }
    }

    fetchBook();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p className="muted">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page-shell">
        <motion.div 
          className="card" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '4rem' }}
        >
          <Book size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.1 }} />
          <h3>Book not found</h3>
          <p className="muted" style={{ marginBottom: '2rem' }}>Try returning to the search page for another title.</p>
          <Link to="/search" className="btn btn-primary">
            Search Books
          </Link>
        </motion.div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="page-shell">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gap: '2rem' }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/search" className="btn btn-secondary" style={{ padding: '0.6rem', borderRadius: '12px' }}>
            <ArrowLeft size={20} />
          </Link>
          <span className="muted">Back to Library</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
          <section className="card" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
              <div>
                <span className="eyebrow accent-text" style={{ marginBottom: '0.5rem', display: 'block' }}>{book.category}</span>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>{book.title}</h1>
                <p className="muted" style={{ fontSize: '1.2rem' }}>by {book.author}</p>
              </div>
              <span className={`status-pill ${book.status === 'Available' ? 'available' : 'issued'}`} style={{ fontSize: '0.9rem', padding: '0.6rem 1.25rem' }}>
                {book.status}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Info size={20} className="accent-text" /> Description
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#475569' }}>
                  {book.description || 'No detailed description available for this book yet. Please check back later for more information about the summary and key insights.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><Hash size={20} /></div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Book ID</div>
                  <div style={{ fontWeight: '700' }}>{book.id}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><Layers size={20} /></div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Floor</div>
                  <div style={{ fontWeight: '700' }}>Level {book.floor}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><MapPin size={20} /></div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Shelf</div>
                  <div style={{ fontWeight: '700' }}>{book.shelf}</div>
                </div>
              </div>
            </div>
          </section>

          <aside style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', border: 'none' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Bookmark size={18} /> Reserve This Book
                </button>
                <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Share2 size={18} /> Share Details
                </button>
              </div>
            </div>

            {book.status === 'Issued' && (
              <div className="card" style={{ background: '#fee2e2', border: 'none' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Calendar size={24} style={{ color: '#ef4444' }} />
                  <div>
                    <h4 style={{ color: '#b91c1c' }}>Due Date</h4>
                    <p style={{ color: '#ef4444', fontWeight: '700' }}>{book.dueDate || 'Pending'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                background: '#f1f5f9', 
                borderRadius: '16px', 
                margin: '0 auto 1rem',
                display: 'grid',
                placeItems: 'center'
              }}>
                <Book size={48} className="muted" style={{ opacity: 0.2 }} />
              </div>
              <p className="muted" style={{ fontSize: '0.85rem' }}>Scan the QR code on the book to issue it instantly via your mobile.</p>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}

export default BookDetailsPage;
