function AlertsPage() {
  const alerts = [
    { id: 'A1', message: 'Your book return is due in 2 days.', type: 'Due date' },
    { id: 'A2', message: 'New QR issue workflow is active.', type: 'System' },
    { id: 'A3', message: 'Library closes early on Friday.', type: 'Notice' }
  ];

  return (
    <div className="page-shell page-card-grid">
      <section className="card feature-card">
        <h2>Alerts & Notifications</h2>
        <p className="muted">Manage library reminders and system notices from one place.</p>
      </section>

      <section className="card alert-list-card">
        <h3>Recent Alerts</h3>
        <div className="alert-grid">
          {alerts.map((alert) => (
            <div key={alert.id} className="feature-mini-card">
              <span className="alert-type">{alert.type}</span>
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AlertsPage;
