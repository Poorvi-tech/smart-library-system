import { useLibrary } from '../context/LibraryContext.jsx';
import { motion } from 'framer-motion';
import { Map, MapPin, Navigation, Info, BookOpen, Layers } from 'lucide-react';

function BookLocationsPage() {
  const { books } = useLibrary();
  const floors = [
    {
      id: '1',
      title: 'Ground Floor',
      subtitle: 'Technology & Design',
      mapSrc: '/floor-1-map.jpg',
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Second Floor',
      subtitle: 'Analytics & QR Systems',
      mapSrc: '/floor-2-map.avif',
      color: '#10b981'
    },
    {
      id: '3',
      title: 'Third Floor',
      subtitle: 'Management & Student Life',
      mapSrc: '/floor-3-map.jpg',
      color: '#f59e0b'
    },
    {
      id: '4',
      title: 'Digital Hub & E-Library',
      subtitle: 'Computer Lab & Digital Research',
      mapSrc: '/floor-4-map.webp',
      color: '#8b5cf6'
    }
  ];

  const grouped = books.reduce((acc, book) => {
    if (!acc[book.floor]) acc[book.floor] = [];
    acc[book.floor].push(book);
    return acc;
  }, {});

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-shell">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gap: '2.5rem' }}
      >
        {/* Header Section */}
        <section className="card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '16px' }}>
              <Navigation size={32} style={{ color: '#38bdf8' }} />
            </div>
            <div>
              <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Interactive Library Map</h2>
              <p style={{ color: '#94a3b8' }}>Navigate through floors and find your favorite books with precision shelf tracking.</p>
            </div>
          </div>
        </section>

        {/* Floor Maps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {floors.map((floor) => (
            <motion.div 
              key={floor.id} 
              variants={item}
              className={`card ${
                floor.id === '1' ? 'card-gradient-primary' :
                floor.id === '2' ? 'card-gradient-success' :
                floor.id === '3' ? 'card-gradient-warning' :
                'card-gradient-primary'
              }`}
              whileHover={{ scale: 1.02 }}
              style={{ padding: '1rem' }}
            >
              <div style={{ position: 'relative', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                <img 
                  src={floor.mapSrc} 
                  alt={floor.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  background: 'white', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  boxShadow: 'var(--shadow-md)',
                  color: floor.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <Layers size={14} />
                  FLOOR {floor.id}
                </div>
              </div>
              <div style={{ padding: '0 0.5rem 0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{floor.title}</h3>
                <p className="muted" style={{ fontSize: '0.85rem' }}>{floor.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shelf Directory Section */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <MapPin className="accent-text" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Shelf Directory</h3>
          </div>

          <div className="book-location-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: '2rem' }}>
            {Object.entries(grouped).map(([floor, floorBooks], floorIdx) => (
              <motion.div 
                key={floor} 
                variants={item}
                className={`card ${
                  floor === '1' ? 'card-gradient-primary' :
                  floor === '2' ? 'card-gradient-success' :
                  floor === '3' ? 'card-gradient-warning' :
                  'card-gradient-primary'
                }`}
                style={{ height: 'fit-content' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: floors[floorIdx]?.color || 'var(--primary)' }} />
                    <h4 style={{ fontSize: '1.25rem' }}>Level {floor}</h4>
                  </div>
                  <span className="badge accent" style={{ background: '#f1f5f9', color: '#64748b' }}>{floorBooks.length} Collections</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {floorBooks.map((book) => (
                    <div 
                      key={book.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '1rem', 
                        background: '#f8fafc', 
                        borderRadius: '16px',
                        border: '1px solid transparent',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '10px', 
                          background: 'white', 
                          display: 'grid', 
                          placeItems: 'center',
                          color: 'var(--primary)',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          <BookOpen size={18} />
                        </div>
                        <div>
                          <h5 style={{ fontSize: '0.95rem', marginBottom: '0.1rem' }}>{book.title}</h5>
                          <p className="muted" style={{ fontSize: '0.8rem' }}>{book.category} • {book.section}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.05em' }}>SHELF</div>
                        <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{book.shelf}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default BookLocationsPage;
