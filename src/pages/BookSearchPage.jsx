import { useMemo, useState } from 'react';
import BookCard from '../components/BookCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';

function BookSearchPage() {
  const [query, setQuery] = useState('');
  const { books, personalizedBooks, reserveBook } = useLibrary();

  const filteredBooks = useMemo(() => {
    const normalized = query.toLowerCase();
    return personalizedBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(normalized) ||
        book.author.toLowerCase().includes(normalized) ||
        book.id.toLowerCase().includes(normalized)
    );
  }, [query, personalizedBooks]);

  const availableCount = books.filter((book) => book.status === 'Available').length;

  return (
    <div className="page-shell page-card-grid book-search-page">
      <section className="search-summary card">
        <div>
          <p className="eyebrow accent-text">Smart Search</p>
          <h2>Explore books with instant search.</h2>
          <p className="muted">
            Search by title, author or book ID and view availability with floor-section shelf location.
          </p>
        </div>
        <div className="search-stats">
          <div className="stat-box gradient-box blue-box">
            <span>Total Books</span>
            <strong>{books.length}</strong>
          </div>
          <div className="stat-box gradient-box green-box">
            <span>Available</span>
            <strong>{availableCount}</strong>
          </div>
        </div>
      </section>

      <section className="search-bar card search-card">
        <div className="search-card-header">
          <h2>Search library books</h2>
          <span className="badge accent">Live search</span>
        </div>
        <input
          type="search"
          placeholder="Search by title, author, or ID"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="book-list">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            action={
              book.status === 'Issued' ? (
                <button className="btn btn-secondary" onClick={() => reserveBook(book.id)}>
                  Reserve
                </button>
              ) : null
            }
          />
        ))}
        {filteredBooks.length === 0 && (
          <div className="empty-state card">
            <p>No matching books found. Try another keyword or author.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default BookSearchPage;
