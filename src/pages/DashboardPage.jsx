import { useLibrary } from '../context/LibraryContext.jsx';

function DashboardPage() {
  const { currentUser, books, issuedBooks, notifications, autoDueAlerts, history, reservations } = useLibrary();
  const latestNotes = [...autoDueAlerts, ...notifications].slice(0, 6);

  return (
    <div className="dashboard-grid">
      <section className="dashboard-hero card hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Smart Library Insights</p>
          <h2>Welcome {currentUser?.id}, track your complete library activity.</h2>
          <p className="hero-copy-text">
            Personalized for {currentUser?.course}: issued books, due alerts, history, and reservation updates.
          </p>
          <div className="hero-stats">
            <div className="stat-box">
              <span>Issued :  {issuedBooks.length}</span>
            </div>
            <div className="stat-box">
              <span>Available : {books.length - issuedBooks.length}</span>
            </div>
            <div className="stat-box">
              <span>Reservations : {reservations.length}</span>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-image hero-image-large" style={{ backgroundImage: 'url(/img1.jpeg)' }} />
          <div className="hero-image hero-image-small" style={{ backgroundImage: 'url(/img2.jpeg)' }} />
        </div>
      </section>

      <section className="card notifications-card">
        <div className="card-header notifications-header">
          <div>
            <h3>Notifications</h3>
            <p className="muted">Live due-date and system alerts.</p>
          </div>
          <span className="badge accent">New</span>
        </div>
        <ul>
          {latestNotes.map((note) => (
            <li key={note.id} className="notification-item">
              <strong>{note.type}:</strong> {note.message}
            </li>
          ))}
        </ul>
      </section>

      <section className="card issued-card">
        <div className="card-header">
          <div>
            <h3>Issued Books</h3>
            <p className="muted">Books currently checked out with due dates.</p>
          </div>
        </div>
        <div className="list-grid issued-list">
          {issuedBooks.map((book) => (
            <div key={book.id} className="mini-card issued-mini-card">
              <div>
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
              <div className="due-pill">
                Due {book.dueDate}
              </div>
            </div>
          ))}
          {issuedBooks.length === 0 && <p className="muted">No books currently issued.</p>}
        </div>
      </section>

      <section className="card issued-card">
        <div className="card-header">
          <div>
            <h3>Issue & Return Tracking</h3>
            <p className="muted">Latest transactions for transparency.</p>
          </div>
        </div>
        <div className="list-grid issued-list">
          {history.slice(0, 5).map((entry) => (
            <div key={entry.id} className="mini-card issued-mini-card">
              <div>
                <h4>{entry.bookTitle}</h4>
                <p>{entry.action}</p>
              </div>
              <div className="due-pill">
                {entry.action === 'Issued' ? `Issue ${entry.issueDate}` : `Return ${entry.returnDate}`}
              </div>
            </div>
          ))}
          {history.length === 0 && <p className="muted">No history yet. Use QR issue/return to create entries.</p>}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
