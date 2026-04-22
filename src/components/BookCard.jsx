import { Link } from 'react-router-dom';

function BookCard({ book, badge, action }) {
  return (
    <div className="card book-card">
      <div className="card-header">
        <div>
          <h3>{book.title}</h3>
          <p className="muted">{book.author}</p>
        </div>
        <span className={`status-pill ${book.status === 'Available' ? 'available' : 'issued'}`}>
          {book.status}
        </span>
      </div>

      <div className="card-meta">
        <span>Shelf: {book.shelf}</span>
        <span>Floor: {book.floor}</span>
        <span>Section: {book.section}</span>
        {book.dueDate && <span>Due: {book.dueDate}</span>}
      </div>

      <p className="card-description">{book.description}</p>

      <div className="card-actions">
        {action}
        <Link className="text-link" to={`/book/${book.id}`}>
          View details
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
