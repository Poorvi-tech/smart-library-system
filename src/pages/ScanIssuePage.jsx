function ScanIssuePage() {
  const steps = [
    'Open QR scan camera',
    'Focus on the book QR code',
    'Confirm book details',
    'Issue to student account'
  ];

  return (
    <div className="page-shell page-card-grid">
      <section className="card feature-card">
        <h2>Scan & Issue</h2>
        <p className="muted">A streamlined workflow for issuing books using QR code scanning.</p>
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
