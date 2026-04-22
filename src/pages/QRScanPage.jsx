import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import BookCard from '../components/BookCard.jsx';
import { books } from '../data/books.js';

function QRScanPage() {
  const [scannedBook, setScannedBook] = useState(null);
  const [alert, setAlert] = useState('');
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scanError, setScanError] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current && isScannerActive) {
        try {
          scannerRef.current.clear();
        } catch (e) {
          console.log('Scanner cleanup error:', e);
        }
      }
    };
  }, [isScannerActive]);

  function startScanning() {
    setScanError('');
    setAlert('');
    setScannedBook(null);
    setIsScannerActive(true);

    // Use setTimeout to ensure DOM is updated first
    setTimeout(() => {
      try {
        const scanner = new Html5QrcodeScanner(
          'qr-reader',
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false
        );

        scannerRef.current = scanner;

        const onScanSuccess = (decodedText) => {
          // Trim and extract book ID from QR code
          const bookId = decodedText.trim().toUpperCase();
          const book = books.find((b) => b.id === bookId);

          if (book) {
            setScannedBook(book);
            setAlert(`${book.title} issued successfully!`);
            scanner.pause();
          } else {
            setScanError(`Book ID ${bookId} not found in library.`);
          }
        };

        const onScanFailure = (error) => {
          // Silent fail - scanning is continuous, so errors are expected
        };

        scanner.render(onScanSuccess, onScanFailure);
      } catch (error) {
        console.error('Scanner initialization error:', error);
        setScanError(`Camera error: ${error.message || 'Failed to access camera. Please check permissions.'}`);
        setIsScannerActive(false);
      }
    }, 0);
  }

  function stopScanning() {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
        setIsScannerActive(false);
      } catch (e) {
        console.log('Stop error:', e);
      }
    }
  }

  const availableCount = books.filter((book) => book.status === 'Available').length;

  return (
    <div className="page-shell scan-page">
      <div className="scan-grid">
        <div className="card scan-card">
          <div className="scan-card-header">
            <div>
              <p className="eyebrow accent-text">Real-Time QR Scan</p>
              <h2>Open your camera and scan book QR codes</h2>
            </div>
            <span className="badge accent">Live scanning</span>
          </div>

          {!isScannerActive ? (
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
                <strong>{availableCount} books</strong>
              </div>
            </div>
          ) : (
            <div id="qr-reader" className="qr-reader-container"></div>
          )}

          <div className="scan-button-group">
            {!isScannerActive ? (
              <button className="btn btn-primary scan-button" onClick={startScanning}>
                Open Camera & Scan
              </button>
            ) : (
              <button className="btn btn-secondary scan-button" onClick={stopScanning}>
                Stop Scanning
              </button>
            )}
          </div>

          {scanError && <div className="alert error-alert">{scanError}</div>}
          {alert && <div className="alert success-alert">{alert}</div>}

          <div className="qr-test-codes">
            <p className="muted">Test codes:</p>
            <div className="code-tags">
              {books.slice(0, 3).map((book) => (
                <span key={book.id} className="code-tag">{book.id}</span>
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
              <p>Enable camera and scan a book QR code. Or use test codes: {books.slice(0, 3).map(b => b.id).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRScanPage;

