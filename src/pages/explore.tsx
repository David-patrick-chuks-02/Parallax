import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, X } from 'lucide-react';
import { formatMoney, statusTone } from '../lib/model';
import { useApp } from '../lib/store';
import { Chip, EASE, Page, Segmented } from '../components/ui';

type Tab = 'payouts' | 'corridors' | 'stats';

const TABS = [
  { value: 'payouts' as const, label: 'Payouts' },
  { value: 'corridors' as const, label: 'Corridors' },
  { value: 'stats' as const, label: 'Stats' },
];

const CORRIDORS = [
  { id: 'usdc-usd', from: 'USDC', to: 'USD', rate: 0.98, volume: 2750 },
  { id: 'usdt-ngn', from: 'USDT', to: 'NGN', rate: 615.5, volume: 2014251 },
  { id: 'usdc-eur', from: 'USDC', to: 'EUR', rate: 0.92, volume: 2250 },
  { id: 'usdc-ghs', from: 'USDC', to: 'GHS', rate: 14.2, volume: 0 },
  { id: 'usdt-kes', from: 'USDT', to: 'KES', rate: 129.5, volume: 0 },
  { id: 'usdc-zar', from: 'USDC', to: 'ZAR', rate: 18.5, volume: 0 },
];

export function Explore({ tab: initialTab }: { tab: Tab }) {
  const { state } = useApp();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [q, setQ] = useState(params.get('q') ?? '');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (params.get('focus')) {
      searchRef.current?.focus();
      const next = new URLSearchParams(params);
      next.delete('focus');
      setParams(next, { replace: true });
    }
  }, [params, setParams]);

  const needle = q.trim().toLowerCase();

  const payouts = useMemo(() => {
    if (!needle) return state.payouts;
    return state.payouts.filter(p =>
      p.recipient.toLowerCase().includes(needle)
      || p.id.includes(needle)
      || `${p.fromCurrency}-${p.toCurrency}`.toLowerCase().includes(needle)
    );
  }, [state.payouts, needle]);

  const corridors = useMemo(() => {
    if (!needle) return CORRIDORS;
    return CORRIDORS.filter(c =>
      `${c.from} ${c.to} ${c.from}-${c.to}`.toLowerCase().includes(needle)
    );
  }, [needle]);

  const stats = [
    { label: 'Total payouts', value: state.payouts.length },
    { label: 'Processing', value: `$${formatMoney(state.payouts.filter(p => p.status === 'Processing' || p.status === 'Confirmed').reduce((sum, p) => sum + p.receiveAmount, 0))}` },
    { label: 'Settled', value: `$${formatMoney(state.receipts.reduce((sum, r) => sum + r.receiveAmount, 0))}` },
    { label: 'Total volume', value: `$${formatMoney(state.payouts.reduce((sum, p) => sum + p.amount, 0))}` },
  ];

  return (
    <Page className="explore">
      <div className="explore-inner">
        <header className="explore-head">
          <div>
            <h1>Explore Payouts</h1>
            <p className="muted">Track global payouts in real-time. See live corridors, rates, and settlement status powered by Blaaiz.</p>
          </div>
        </header>

        <div className="explore-bar">
          <Segmented
            idPrefix="explore"
            value={tab}
            options={TABS}
            onChange={v => {
              setTab(v);
              navigate(v === 'payouts' ? '/explore' : `/explore/${v}`);
            }}
          />
          <label className="search explore-search">
            <Search size={14} />
            <input
              ref={searchRef}
              aria-label="Search"
              placeholder={tab === 'payouts' ? 'Recipient, ID, corridor...' : tab === 'corridors' ? 'Currency pair...' : 'Search'}
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            {q && <button type="button" className="btn ghost icon xs" onClick={() => setQ('')}><X size={12} /></button>}
          </label>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'payouts' && (
            <motion.div
              key="payouts"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              {payouts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                  <p style={{ fontSize: '14px', margin: 0 }}>No payouts found</p>
                </div>
              ) : (
                <div className="explore-list">
                  {payouts.map(payout => (
                    <motion.div
                      key={payout.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="explore-item"
                    >
                      <div className="explore-row">
                        <div style={{ flex: 1 }}>
                          <div className="explore-title">
                            {payout.fromCurrency} → {payout.toCurrency}
                          </div>
                          <div className="explore-sub">
                            To: {payout.recipient} • ID: {payout.id}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 600, marginBottom: '4px' }}>${formatMoney(payout.amount)}</div>
                          <Chip tone={statusTone(payout.status)}>{payout.status}</Chip>
                        </div>
                      </div>
                      <div className="explore-row" style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
                        <span>Rate: {payout.rate} • Fee: ${formatMoney(payout.fee)}</span>
                        <span>Receives: ${formatMoney(payout.receiveAmount)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'corridors' && (
            <motion.div
              key="corridors"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              {corridors.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                  <p style={{ fontSize: '14px', margin: 0 }}>No corridors found</p>
                </div>
              ) : (
                <div className="explore-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginTop: '24px' }}>
                  {corridors.map(corridor => {
                    const payoutCount = state.payouts.filter(p => p.corridorId === corridor.id).length;
                    return (
                      <motion.div
                        key={corridor.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          border: '1px solid var(--border)',
                          borderRadius: '12px',
                          padding: '16px',
                          background: 'var(--card)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div style={{ fontSize: '16px', fontWeight: 700 }}>
                            {corridor.from} → {corridor.to}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                            {payoutCount} payouts
                          </div>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px' }}>
                          <div>Rate: 1 {corridor.from} = {corridor.rate} {corridor.to}</div>
                          <div>Volume: ${formatMoney(corridor.volume)}</div>
                        </div>
                        <Link
                          to="/send"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            color: 'var(--acc)',
                            textDecoration: 'none',
                          }}
                        >
                          Create payout <ArrowRight size={12} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{ marginTop: '24px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {stats.map(stat => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '20px',
                      background: 'var(--card)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--acc)' }}>
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {state.payouts.slice(0, 5).map(payout => (
                    <div key={payout.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                      <span>{payout.fromCurrency} → {payout.toCurrency}: ${formatMoney(payout.amount)}</span>
                      <Chip tone={statusTone(payout.status)}>{payout.status}</Chip>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '40px', textAlign: 'center', paddingBottom: '40px' }}>
          <Link to="/send" className="btn primary">Create a new payout</Link>
        </div>
      </div>
    </Page>
  );
}
