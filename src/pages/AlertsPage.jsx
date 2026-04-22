import { useLibrary } from '../context/LibraryContext.jsx';

function AlertsPage() {
  const { notifications, autoDueAlerts } = useLibrary();
  const alerts = [...autoDueAlerts, ...notifications];

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
          {alerts.length === 0 && <p className="muted">No alerts right now.</p>}
        </div>
      </section>
    </div>
  );
}

export default AlertsPage;
