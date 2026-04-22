import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  RefreshCcw, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';

function ScanIssuePage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Find Your Book',
      description: 'Locate your desired book using our Interactive Map or Search features. Every book has a unique QR code attached to its back cover or spine.',
      icon: <BookOpen size={40} />,
      color: '#3b82f6',
      details: ['Check shelf location in app', 'Verify book ID (e.g. B101)', 'Ensure QR code is visible']
    },
    {
      title: 'Open Smart Scanner',
      description: 'Navigate to the QR Scan page on your mobile or laptop. Grant camera permissions when prompted to enable the real-time recognition engine.',
      icon: <Smartphone size={40} />,
      color: '#8b5cf6',
      details: ['Click "Start Scanning"', 'Align QR in the frame', 'Works on any device']
    },
    {
      title: 'Instant Processing',
      description: 'Our system identifies the book instantly. Choose whether you want to "Issue" for borrowing or "Return" a book you currently have.',
      icon: <QrCode size={40} />,
      color: '#10b981',
      details: ['Auto-recognition', 'Status verification', 'One-click actions']
    },
    {
      title: 'Real-time Updates',
      description: 'Once processed, your personal dashboard, library inventory, and notification center are updated immediately across all devices.',
      icon: <RefreshCcw size={40} />,
      color: '#f59e0b',
      details: ['Live dashboard sync', 'Instant alerts', 'Transaction history']
    }
  ];

  const nextStep = () => setActiveStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="page-shell">
      <div style={{ display: 'grid', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card hero-card" 
          style={{ 
            padding: '3rem', 
            textAlign: 'center', 
            display: 'block',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: 'white',
            border: 'none'
          }}
        >
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'rgba(56, 189, 248, 0.1)', 
            borderRadius: '20px', 
            display: 'grid', 
            placeItems: 'center',
            margin: '0 auto 1.5rem',
            color: '#38bdf8'
          }}>
            <Sparkles size={32} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '1rem' }}>Scan & Issue Guide</h2>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Master the art of seamless library transactions with our step-by-step interactive guide.
          </p>
        </motion.section>

        {/* Interactive Stepper */}
        <section className="card" style={{ padding: '3rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {steps.map((_, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(index)}
                style={{ 
                  width: '40px', 
                  height: '4px', 
                  borderRadius: '2px', 
                  background: index === activeStep ? 'var(--primary)' : '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '32px', 
                  background: `${steps[activeStep].color}15`, 
                  color: steps[activeStep].color,
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 2rem',
                  boxShadow: `0 20px 40px -10px ${steps[activeStep].color}30`
                }}>
                  {steps[activeStep].icon}
                </div>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '999px', 
                  background: '#f1f5f9', 
                  color: '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  marginBottom: '1rem'
                }}>
                  STEP {activeStep + 1} OF 4
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{steps[activeStep].title}</h3>
                  <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.6', marginBottom: '2rem' }}>
                    {steps[activeStep].description}
                  </p>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {steps[activeStep].details.map((detail, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                        <CheckCircle2 size={18} style={{ color: steps[activeStep].color }} />
                        {detail}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={prevStep}
                  style={{ padding: '0.8rem' }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={nextStep}
                  style={{ flex: 1, padding: '0.8rem' }}
                >
                  {activeStep === steps.length - 1 ? 'Start Again' : 'Next Step'} <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {[
            { icon: <Zap />, title: 'Lightning Fast', desc: 'Process books in under 2 seconds', color: '#38bdf8' },
            { icon: <ShieldCheck />, title: 'Highly Secure', desc: 'Encrypted transaction logging', color: '#10b981' },
            { icon: <RefreshCcw />, title: 'Auto Sync', desc: 'Always updated across devices', color: '#8b5cf6' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="card"
              style={{ textAlign: 'center', padding: '2rem' }}
            >
              <div style={{ color: feature.color, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {feature.icon}
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>{feature.title}</h4>
              <p className="muted" style={{ fontSize: '0.85rem' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScanIssuePage;
