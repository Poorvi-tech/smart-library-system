function ProInsightsPage() {
  const stats = [
    { title: 'Average Issue Time', value: '12 min' },
    { title: 'Active Users', value: '234' },
    { title: 'Books Issued Today', value: '34' }
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
