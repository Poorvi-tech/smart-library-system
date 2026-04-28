import { useEffect, useMemo, useState } from 'react';
import BookCard from '../components/BookCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';
import { bookAPI } from '../services/api.js';
import { Search, Book, CheckCircle2, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

function BookSearchPage() {
  const [query, setQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const { books, personalizedBooks, reserveBook, currentUser } = useLibrary();

  useEffect(() => {
    let isMounted = true;

    async function runSearch() {
      const normalized = query.trim();
      if (!normalized) {
        setSearchedBooks(personalizedBooks);
        return;
      }

      const result = await bookAPI.searchBooks(normalized, currentUser?.course || '');
      if (isMounted) {
        setSearchedBooks(result.success ? result.books || [] : []);
      }
    }

    runSearch();
    return () => {
      isMounted = false;
    };
  }, [query, currentUser?.course, personalizedBooks]);

  const filteredBooks = useMemo(() => {
    return searchedBooks;
  }, [searchedBooks]);

  const availableCount = books.filter((book) => book.status === 'Available').length;

  return (
    <div className="page-shell book-search-page">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={24} />
              <input
                type="search"
                placeholder="Search by title, author, or ID..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </section>

          <motion.section 
            className="book-grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 }
                }}
              >
                <BookCard
                  book={book}
                  action={
                    book.status === 'Issued' ? (
                      <button className="btn btn-secondary" onClick={() => reserveBook(book.id)} style={{ width: '100%' }}>
                        Reserve
                      </button>
                    ) : null
                  }
                />
              </motion.div>
            ))}
            {filteredBooks.length === 0 && (
              <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                <Search size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.1 }} />
                <h3>No books found</h3>
                <p className="muted">Try adjusting your search terms or filters</p>
              </div>
            )}
          </motion.section>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '2rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', border: 'none' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} />
              Library Status
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.8, display: 'block' }}>Total Collection</span>
                <strong style={{ fontSize: '1.5rem' }}>{books.length} Books</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.8, display: 'block' }}>Available Now</span>
                <strong style={{ fontSize: '1.5rem' }}>{availableCount} Books</strong>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={20} className="accent-text" />
              Quick Filters
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Computer Science', 'Mathematics', 'Physics', 'History', 'Fiction'].map(tag => (
                <button key={tag} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: '#f8fafc' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <Book size={24} className="accent-text" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem' }}>Smart Recommendations</h4>
                <p className="muted" style={{ fontSize: '0.75rem' }}>Based on your {personalizedBooks.length > 0 ? 'course' : 'activity'}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BookSearchPage;
