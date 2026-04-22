import { useState, useEffect, useRef } from 'react';
import BookCard from '../components/BookCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanPage() {
  const { books, issueBook, returnBook, availableBooks } = useLibrary();
  const [scannedBookId, setScannedBookId] = useState(null);
  const [alert, setAlert] = useState('');
  const [scanError, setScanError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  const scannedBook = books.find(b => b.id === scannedBookId);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(onScanSuccess, onScanFailure);

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner", error);
        });
      }
    };
  }, [isScanning]);

  function onScanSuccess(decodedText, decodedResult) {
    // Stop scanning once we have a result
    if (scannerRef.current) {
      scannerRef.current.clear().then(() => {
        setIsScanning(false);
        handleBookFound(decodedText);
      }).catch(error => {
        console.error("Failed to clear scanner", error);
        setIsScanning(false);
        handleBookFound(decodedText);
      });
    }
  }

  function onScanFailure(error) {
    // console.warn(`Code scan error = ${error}`);
  }

  function handleBookFound(bookId) {
    const normalizedId = bookId.toUpperCase();
    const target = books.find((book) => book.id === normalizedId);
    setAlert('');
    setScanError('');
    if (!target) {
      setScanError(`Book ID ${normalizedId} not found.`);
      setScannedBookId(null);
      return;
    }
    setScannedBookId(normalizedId);
  }

  function handleIssue() {
    if (!scannedBookId) return;
    const success = issueBook(scannedBookId);
    if (success) {
      setAlert('Book Issued Successfully');
      setScanError('');
    } else {
      setScanError('Book is already issued.');
      setAlert('');
    }
  }

  function handleReturn() {
    if (!scannedBookId) return;
    const success = returnBook(scannedBookId);
    if (success) {
      setAlert('Book Returned Successfully');
      setScanError('');
    } else {
      setScanError('Book is already available.');
      setAlert('');
    }
  }

  function startScan() {
    setScannedBookId(null);
    setAlert('');
    setScanError('');
    setIsScanning(true);
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
            {isScanning ? (
              <div id="reader" style={{ width: '100%' }}></div>
            ) : (
              <div className="qr-frame">
                <div className="qr-dot top-left" />
                <div className="qr-dot top-right" />
                <div className="qr-dot bottom-left" />
                <div className="qr-center">
                  <span>{scannedBook ? 'READY' : 'SCAN'}</span>
                </div>
              </div>
            )}
            <div className="scan-details">
              <p className="muted">Available books ready for issue</p>
              <strong>{availableBooks.length} books</strong>
            </div>
          </div>

          <div className="scan-button-group">
            {!isScanning && (
              <button className="btn btn-primary scan-button" onClick={startScan}>
                {scannedBook ? 'Scan Another' : 'Start Scanning'}
              </button>
            )}
            {isScanning && (
              <button className="btn btn-secondary scan-button" onClick={() => setIsScanning(false)}>
                Cancel
              </button>
            )}
          </div>

          {scanError && <div className="alert error-alert">{scanError}</div>}
          {alert && <div className="alert success-alert">{alert}</div>}

          <div className="qr-test-codes">
            <p className="muted">Test IDs (for manual input or printing):</p>
            <div className="code-tags">
              {books.slice(0, 5).map((book) => (
                <span key={book.id} className="code-tag" onClick={() => handleBookFound(book.id)} style={{ cursor: 'pointer' }}>
                  {book.id}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card scan-result">
          <h3>{scannedBook ? 'Scanned Book' : 'Ready to Scan'}</h3>
          {scannedBook ? (
            <div className="scanned-book-container">
              <BookCard book={scannedBook} />
              <div className="action-buttons mt-4">
                <button 
                  className="btn btn-primary mr-2" 
                  onClick={handleIssue}
                  disabled={scannedBook.status === 'Issued'}
                >
                  Issue Book
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleReturn}
                  disabled={scannedBook.status === 'Available'}
                >
                  Return Book
                </button>
              </div>
            </div>
          ) : (
            <div className="scan-placeholder">
              <p>Click "Start Scanning" and point your camera at a book's QR code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRScanPage;

