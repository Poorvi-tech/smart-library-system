import { books } from '../data/books.js';

function DashboardPage() {
  const issued = books.filter((book) => book.status === 'Issued');
  const notifications = [
    'New QR-based issue workflow now live.',
    'Reminder: return books before due date to avoid fines.',
    'Campus library open until 9 PM today.'
  ];

  return (
    <div className="dashboard-grid">
      <section className="dashboard-hero card hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Smart Library Insights</p>
          <h2>Keep track of your books and campus updates.</h2>
          <p className="hero-copy-text">
            View issued books, due dates and notifications with a modern, responsive dashboard built for student workflows.
          </p>
          <div className="hero-stats">
            <div className="stat-box">
              <span>Issued</span>
              <strong>{issued.length}</strong>
            </div>
            <div className="stat-box">
              <span>Available</span>
              <strong>{books.length - issued.length}</strong>
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
            <p className="muted">Stay updated with library alerts and reminders.</p>
          </div>
          <span className="badge accent">New</span>
        </div>
        <ul>
          {notifications.map((note) => (
            <li key={note} className="notification-item">
              {note}
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
          {issued.map((book) => (
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
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
