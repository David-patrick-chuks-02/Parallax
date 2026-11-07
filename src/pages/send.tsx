import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Zap } from 'lucide-react';
import { formatMoney } from '../lib/model';
import { useApp } from '../lib/store';

type PayoutMode = 'payout' | 'abroad' | 'escrow';

const MODES = [
  {
    id: 'payout' as PayoutMode,
    label: 'Instant payout',
    title: 'Get paid for work, from anywhere.',
    subtitle: 'A client funds you in crypto or USD. You get paid out in your own currency — bank transfer, mobile money, or ACH.',
  },
  {
    id: 'abroad' as PayoutMode,
    label: 'Pay abroad',
    title: 'Spend what you have, anywhere.',
    subtitle: 'Pay a seller directly in your own currency — they receive theirs, automatically, no manual conversion.',
  },
  {
    id: 'escrow' as PayoutMode,
    label: 'Escrow',
    title: 'Hire across borders. Pay with confidence.',
    subtitle: 'Funds are held safely until the work is confirmed done, then released instantly to the freelancer.',
  },
];

const CURRENCIES = [
  { code: 'USDC', label: 'USDC', flag: '💱' },
  { code: 'USDT', label: 'USDT', flag: '💱' },
  { code: 'USD', label: 'USD', flag: '🇺🇸' },
];

const DESTINATIONS = [
  { code: 'USD', label: 'USD', flag: '🇺🇸', rate: 0.98 },
  { code: 'NGN', label: 'Nigerian Naira', flag: '🇳🇬', rate: 615.5 },
  { code: 'EUR', label: 'Euro', flag: '🇪🇺', rate: 0.92 },
  { code: 'GHS', label: 'Ghanaian Cedi', flag: '🇬🇭', rate: 14.2 },
  { code: 'KES', label: 'Kenyan Shilling', flag: '🇰🇪', rate: 129.5 },
  { code: 'ZAR', label: 'South African Rand', flag: '🇿🇦', rate: 18.5 },
];

export function Send() {
  const { state, setState } = useApp();
  const [mode, setMode] = useState<PayoutMode>('payout');
  const [step, setStep] = useState(1);

  // Form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USDC');
  const [amount, setAmount] = useState('500');
  const [toCurrency, setToCurrency] = useState('USD');
  const [recipient, setRecipient] = useState('');
  const [result, setResult] = useState<any>(null);

  const active = MODES.find(m => m.id === mode)!;
  const destination = DESTINATIONS.find(d => d.code === toCurrency)!;
  const rate = destination.rate;
  const fee = Number(amount) * 0.02;
  const netAmount = (Number(amount) - fee) * rate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new payout
    const newPayout = {
      id: String(state.payouts.length + 1),
      corridorId: `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`,
      amount: Number(amount),
      fromCurrency,
      toCurrency,
      recipient: recipient || senderName,
      status: 'Confirmed' as const,
      rate,
      fee,
      receiveAmount: netAmount,
      created: new Date().toISOString(),
    };

    setState(s => ({
      ...s,
      payouts: [newPayout, ...s.payouts],
    }));

    setResult({
      payoutId: newPayout.id,
      status: 'Confirmed',
      amount: Number(amount),
      fee,
      receive: netAmount,
      currency: toCurrency,
    });
    setStep(3);
  };

  const handleReset = () => {
    setSenderName('');
    setSenderEmail('');
    setFromCurrency('USDC');
    setAmount('500');
    setToCurrency('USD');
    setRecipient('');
    setResult(null);
    setStep(1);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px', fontSize: '14px' }}>
            <ArrowLeft size={14} /> Back to Parallax
          </Link>

          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '12px 0 8px' }}>
            {active.title}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
            {active.subtitle}
          </p>
        </div>

        {/* Mode Selector */}
        {step === 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'var(--card)', padding: '8px', borderRadius: '999px', border: '1px solid var(--border)' }}>
            {MODES.map(m => (
              <motion.button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: mode === m.id ? 'var(--acc)' : 'transparent',
                  color: mode === m.id ? 'white' : 'var(--muted)',
                  transition: 'all 0.2s',
                }}
              >
                {m.label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Form */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* Sender Section */}
              <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', margin: '0 0 8px 0' }}>Sender</legend>
                <input
                  required
                  placeholder="Full name"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--card)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={senderEmail}
                  onChange={e => setSenderEmail(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--card)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
              </fieldset>

              {/* Pay From */}
              <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', margin: '0 0 8px 0' }}>Pay from</legend>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {CURRENCIES.map(c => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setFromCurrency(c.code)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: `1px solid ${fromCurrency === c.code ? 'var(--acc)' : 'var(--border)'}`,
                        borderRadius: '8px',
                        background: fromCurrency === c.code ? 'var(--acc-soft)' : 'var(--card)',
                        color: 'var(--text)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {c.flag} {c.label}
                    </button>
                  ))}
                </div>
                <input
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--card)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
              </fieldset>

              {/* Pay To */}
              <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', margin: '0 0 8px 0' }}>Pay to</legend>
                <select
                  required
                  value={toCurrency}
                  onChange={e => setToCurrency(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--card)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                >
                  {DESTINATIONS.map(d => (
                    <option key={d.code} value={d.code}>
                      {d.flag} {d.label} ({d.code})
                    </option>
                  ))}
                </select>
                <input
                  required
                  placeholder="Recipient name or account"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--card)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
              </fieldset>

              {/* Rate & Fees */}
              {amount && (
                <div style={{
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  padding: '16px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--muted)' }}>
                    <span>Exchange rate:</span>
                    <span>1 {fromCurrency} = {rate} {toCurrency}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--muted)' }}>
                    <span>Fees (2%):</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>-${formatMoney(fee)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                    <span>Recipient gets:</span>
                    <span style={{ color: 'var(--acc)' }}>{destination.flag} {formatMoney(netAmount)} {toCurrency}</span>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                style={{
                  padding: '12px',
                  background: 'var(--acc)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Zap size={16} /> Confirm & send
              </button>
            </motion.form>
          )}

          {/* Success */}
          {step === 3 && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                border: '1px solid var(--border)',
                background: 'var(--card)',
                padding: '32px',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>Payout confirmed</h2>
              <p style={{ color: 'var(--muted)', margin: '0 0 24px', fontSize: '14px' }}>
                Your payout has been created and is now processing.
              </p>

              <div style={{
                background: 'var(--bg)',
                padding: '16px',
                borderRadius: '12px',
                margin: '24px 0',
                textAlign: 'left',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--muted)' }}>Payout ID</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{result.payoutId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--muted)' }}>Amount</span>
                  <span>${formatMoney(result.amount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--muted)' }}>Fees</span>
                  <span>${formatMoney(result.fee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                  <span>Recipient receives</span>
                  <span style={{ color: 'var(--acc)' }}>{result.currency} {formatMoney(result.receive)}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--acc)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Create another payout
              </button>

              <Link to="/explore" style={{
                display: 'block',
                marginTop: '12px',
                color: 'var(--acc)',
                textDecoration: 'none',
                fontSize: '14px',
              }}>
                View all payouts →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
