import { Link, useParams } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext.jsx';

function BookDetailsPage() {
  const { id } = useParams();
  const { books } = useLibrary();
  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <div className="page-shell card empty-state">
        <h3>Book not found</h3>
        <p>Try returning to the search page for another title.</p>
        <Link to="/search" className="btn btn-secondary">
          Search Books
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell page-card-grid">
      <div className="card detail-card">
        <div className="detail-header">
          <div>
            <h2>{book.title}</h2>
            <p className="muted">{book.author}</p>
          </div>
          <span className={`status-pill ${book.status === 'Available' ? 'available' : 'issued'}`}>
            {book.status}
          </span>
        </div>

        <div className="detail-body">
          <div>
            <p><strong>Book ID:</strong> {book.id}</p>
            <p><strong>Floor:</strong> {book.floor}</p>
            <p><strong>Section:</strong> {book.section}</p>
            <p><strong>Shelf:</strong> {book.shelf}</p>
            {book.dueDate && <p><strong>Due Date:</strong> {book.dueDate}</p>}
          </div>
          <div>
            <p>{book.description}</p>
          </div>
        </div>

        <Link to="/search" className="btn btn-secondary">
          Back to Search
        </Link>
      </div>
    </div>
  );
}

export default BookDetailsPage;
