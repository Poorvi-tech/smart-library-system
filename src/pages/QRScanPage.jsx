import { useState, useEffect, useRef } from 'react';
import BookCard from '../components/BookCard.jsx';
import { useLibrary } from '../context/LibraryContext.jsx';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Library, Camera, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="page-shell">
      <motion.div 
        className="scan-page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
      >
        <div className="card scan-card card-gradient-primary" style={{ padding: '2.5rem' }}>
          <div className="scan-card-header" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                <QrCode size={32} className="accent-text" />
              </div>
              <div>
                <h2 style={{ marginBottom: 0 }}>Smart Scanner</h2>
                <p className="muted">Point your camera to issue or return instantly.</p>
              </div>
            </div>
          </div>

          <div className="scan-display" style={{ marginBottom: '2rem' }}>
            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div 
                  key="scanner"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  id="reader" 
                  style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}
                ></motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="qr-frame" 
                  style={{ 
                    background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', 
                    height: '350px', 
                    borderRadius: '24px', 
                    display: 'grid', 
                    placeItems: 'center',
                    border: '2px dashed rgba(59, 130, 246, 0.2)',
                    position: 'relative'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%', 
                      background: 'white', 
                      display: 'grid', 
                      placeItems: 'center',
                      margin: '0 auto 1.5rem',
                      boxShadow: 'var(--shadow-lg)'
                    }}>
                      <Camera size={32} className="muted" />
                    </div>
                    <span style={{ fontWeight: '800', letterSpacing: '0.1em', color: '#64748b' }}>
                      {scannedBook ? 'READY FOR NEXT' : 'CAMERA READY'}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="scan-button-group" style={{ display: 'flex', gap: '1rem' }}>
            {!isScanning ? (
              <button className="btn btn-primary" onClick={startScan} style={{ flex: 1, padding: '1.25rem' }}>
                <Camera size={20} /> {scannedBook ? 'Scan Another Book' : 'Start Scanning Now'}
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={() => setIsScanning(false)} style={{ flex: 1, padding: '1.25rem', color: '#ef4444' }}>
                <XCircle size={20} /> Cancel Scanning
              </button>
            )}
          </div>

          <AnimatePresence>
            {scanError && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert error-alert" 
                style={{ marginTop: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <AlertCircle size={20} /> {scanError}
              </motion.div>
            )}
            {alert && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert success-alert" 
                style={{ marginTop: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <CheckCircle2 size={20} /> {alert}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="qr-test-codes" style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '24px' }}>
            <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: '600' }}>Quick Test IDs (Click to simulate):</p>
            <div className="code-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {books.slice(0, 5).map((book) => (
                <motion.span 
                  key={book.id} 
                  whileHover={{ scale: 1.05, background: 'white', boxShadow: 'var(--shadow-md)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookFound(book.id)} 
                  style={{ 
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.6)',
                    padding: '0.6rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    color: 'var(--primary)'
                  }}
                >
                  {book.id}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div className="card scan-result card-gradient-success" style={{ height: 'fit-content', padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>{scannedBook ? 'Scan Result' : 'Scan a Book'}</h3>
          <AnimatePresence mode="wait">
            {scannedBook ? (
              <motion.div 
                key={scannedBook.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="scanned-book-container"
              >
                <BookCard book={scannedBook} />
                <div className="action-buttons mt-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '2rem' }}>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleIssue}
                    disabled={scannedBook.status === 'Issued'}
                    style={{ padding: '1.1rem' }}
                  >
                    Issue This Book
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleReturn}
                    disabled={scannedBook.status === 'Available'}
                    style={{ padding: '1.1rem' }}
                  >
                    Return This Book
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="scan-placeholder" 
                style={{ padding: '6rem 2rem', textAlign: 'center' }}
              >
                <Library size={80} style={{ margin: '0 auto 2rem', opacity: 0.05 }} />
                <p className="muted" style={{ fontSize: '1.1rem' }}>The book details will appear here once scanned.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default QRScanPage;
