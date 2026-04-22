import { useState } from 'react';
import BookCard from '../components/BookCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';

function QRScanPage() {
  const { books, issueBook, returnBook, availableBooks } = useLibrary();
  const [scannedBook, setScannedBook] = useState(null);
  const [alert, setAlert] = useState('');
  const [scanError, setScanError] = useState('');
  const [scanMode, setScanMode] = useState('issue');
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id ?? '');

  function simulateScan() {
    const bookId = selectedBookId.trim().toUpperCase();
    const target = books.find((book) => book.id === bookId);
    setAlert('');
    setScanError('');
    if (!target) {
      setScanError(`Book ID ${bookId} not found.`);
      return;
    }

    const success = scanMode === 'issue' ? issueBook(bookId) : returnBook(bookId);
    if (!success) {
      setScanError(
        scanMode === 'issue'
          ? 'Book is already issued. Use Return mode or Reserve from search.'
          : 'Book is already available. Return is not needed.'
      );
      return;
    }

    const latest = {
      ...target,
      status: scanMode === 'issue' ? 'Issued' : 'Available'
    };
    setScannedBook(latest);
    setAlert(scanMode === 'issue' ? 'Book Issued Successfully' : 'Book Returned Successfully');
  }

  return (
    <div className="page-shell scan-page">
      <div className="scan-grid">
        <div className="card scan-card">
          <div className="scan-card-header">
            <div>
              <p className="eyebrow accent-text">Real-Time QR Scan</p>
              <h2>Scan QR to issue or return instantly</h2>
            </div>
          </div>

          <div className="scan-display">
            <div className="qr-frame">
              <div className="qr-dot top-left" />
              <div className="qr-dot top-right" />
              <div className="qr-dot bottom-left" />
              <div className="qr-center">
                <span>SCAN</span>
              </div>
            </div>
            <div className="scan-details">
              <p className="muted">Available books ready for issue</p>
              <strong>{availableBooks.length} books</strong>
            </div>
          </div>

          <div className="scan-button-group">
            <select value={scanMode} onChange={(event) => setScanMode(event.target.value)}>
              <option value="issue">Issue</option>
              <option value="return">Return</option>
            </select>
            <select value={selectedBookId} onChange={(event) => setSelectedBookId(event.target.value)}>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.id} - {book.title}
                </option>
              ))}
            </select>
            <button className="btn btn-primary scan-button" onClick={simulateScan}>
              Scan
            </button>
          </div>

          {scanError && <div className="alert error-alert">{scanError}</div>}
          {alert && <div className="alert success-alert">{alert}</div>}

          <div className="qr-test-codes">
            <p className="muted">Test codes:</p>
            <div className="code-tags">
              {books.slice(0, 3).map((book) => (
                <span key={book.id} className="code-tag">
                  {book.id}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card scan-result">
          <h3>{scannedBook ? 'Scanned Book' : 'Ready to Scan'}</h3>
          {scannedBook ? (
            <BookCard book={scannedBook} />
          ) : (
            <div className="scan-placeholder">
              <p>Choose mode, select a book QR ID, then click scan to update issue/return instantly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRScanPage;

