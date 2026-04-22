import { Link } from 'react-router-dom';
import { MapPin, Info, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

function BookCard({ book, action }) {
  return (
    <motion.div 
      className="card book-card card-gradient-primary"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.4rem', color: '#0f172a', letterSpacing: '-0.01em' }}>{book.title}</h3>
          <p className="muted" style={{ fontSize: '0.95rem', fontWeight: '600' }}>{book.author}</p>
        </div>
        <span className={`status-pill ${book.status === 'Available' ? 'available' : 'issued'}`} style={{ transform: 'scale(0.9)', transformOrigin: 'right top' }}>
          {book.status}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', background: 'rgba(59, 130, 246, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '12px', fontWeight: '700' }}>
          <MapPin size={14} className="accent-text" />
          <span>Shelf {book.shelf}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', background: 'rgba(16, 185, 129, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '12px', fontWeight: '700' }}>
          <Info size={14} className="accent-text" style={{ color: '#10b981' }} />
          <span>Floor {book.floor}</span>
        </div>
      </div>

      <p className="card-description" style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.6' }}>
        {book.description}
      </p>

      <div className="card-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '1rem' }}>
        <Link className="btn btn-secondary" to={`/book/${book.id}`} style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem', fontWeight: '700', borderRadius: '14px' }}>
          View Details
        </Link>
        {action && (
          <div style={{ flex: 1.2 }}>
            {action}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default BookCard;
