function ScanIssuePage() {
  const steps = [
    'Use existing printed QR code on the book',
    'Open Scan QR page and select issue or return',
    'Click Scan to process instantly',
    'Inventory and dashboard update'
  ];

  return (
    <div className="page-shell page-card-grid">
      <section className="card feature-card">
        <h2>Scan & Issue</h2>
        <p className="muted">Integrated with existing library QR process. No system replacement needed, only smart web enhancement.</p>
      </section>

      <section className="card issue-card">
        <h3>How it works</h3>
        <div className="issue-step-list">
          {steps.map((step, index) => (
            <div key={step} className="issue-step-card">
              <span className="step-badge">Step {index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ScanIssuePage;
