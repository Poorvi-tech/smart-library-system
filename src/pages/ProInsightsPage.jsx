import { useLibrary } from '../context/LibraryContext.jsx';

function ProInsightsPage() {
  const { books, issuedBooks, reservations, history } = useLibrary();
  const stats = [
    { title: 'Total Inventory', value: String(books.length) },
    { title: 'Issued Right Now', value: String(issuedBooks.length) },
    { title: 'Reservations', value: String(reservations.length) },
    { title: 'Transactions', value: String(history.length) }
  ];

  return (
    <div className="page-shell page-card-grid">
      <section className="card feature-card">
        <h2>Pro Insights</h2>
        <p className="muted">View smart analytics for library usage, issuing trends, and student engagement.</p>
      </section>

      <section className="card insights-card">
        <div className="insights-grid">
          {stats.map((item) => (
            <div key={item.title} className="insight-card">
              <span>{item.title}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProInsightsPage;
