export type PayoutStatus = 'Draft' | 'Confirmed' | 'Processing' | 'Settled' | 'Failed';

export interface Corridor {
  id: string;
  name: string;
  fromCurrency: string;
  toCurrency: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  estimatedTime: string;
  icon: string;
}

export interface Payout {
  id: string;
  corridorId: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  recipient: string;
  status: PayoutStatus;
  rate: number;
  fee: number;
  receiveAmount: number;
  created: string;
  settled?: string;
}

export interface Application {
  payoutId: string;
  message: string;
  status: PayoutStatus;
}

export interface Receipt {
  id: string;
  payoutId: string;
  amount: number;
  fee: number;
  receiveAmount: number;
  rate: number;
  recipient: string;
  paidAt: string;
}

export interface Session {
  user: string | null;
}

export interface State {
  version: 1;
  session: Session;
  payouts: Payout[];
  applications: Application[];
  receipts: Receipt[];
}

export const storageKey = 'parallax-blaaiz-v1';

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amount);

export const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : String(n);

export const dateLabel = (date: string) =>
  new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export function relativeDate(date: string, now = new Date()): string {
  const then = new Date(date + 'T12:00:00');
  const days = Math.round((now.getTime() - then.getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? 'last month' : `${months} months ago`;
}

export const statusTone = (status: PayoutStatus) =>
  status === 'Settled' ? 'ok' : status === 'Failed' ? 'bad' : status === 'Draft' ? '' : 'warn';

export const isSettled = (payoutId: string, receipts: Receipt[]) =>
  receipts.some(r => r.payoutId === payoutId);

export const totalProcessing = (payouts: Payout[]) =>
  payouts.filter(p => ['Processing', 'Confirmed'].includes(p.status)).reduce((sum, p) => sum + p.receiveAmount, 0);

export const nextPayoutId = (payouts: Payout[]) =>
  String(payouts.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1);

export function initialState(): State {
  return {
    version: 1,
    session: { user: null },
    receipts: [],
    applications: [
      { payoutId: '1', status: 'Settled', message: 'Received in account' },
      { payoutId: '2', status: 'Processing', message: 'In transit' },
      { payoutId: '3', status: 'Confirmed', message: 'Waiting for batch settlement' },
    ],
    payouts: [
      { id: '1', corridorId: 'usdc-usd', amount: 1000, fromCurrency: 'USDC', toCurrency: 'USD', recipient: 'alice@example.com', status: 'Settled', rate: 0.98, fee: 20, receiveAmount: 960, created: '2026-10-01', settled: '2026-10-01' },
      { id: '2', corridorId: 'usdt-ngn', amount: 500, fromCurrency: 'USDT', toCurrency: 'NGN', recipient: 'bob@example.com', status: 'Processing', rate: 615.5, fee: 10, receiveAmount: 297_695, created: '2026-10-02' },
      { id: '3', corridorId: 'usdc-eur', amount: 2500, fromCurrency: 'USDC', toCurrency: 'EUR', recipient: 'carlos@example.com', status: 'Confirmed', rate: 0.92, fee: 50, receiveAmount: 2_250, created: '2026-10-03' },
      { id: '4', corridorId: 'usdc-usd', amount: 750, fromCurrency: 'USDC', toCurrency: 'USD', recipient: 'diana@example.com', status: 'Draft', rate: 0.98, fee: 15, receiveAmount: 720, created: '2026-10-04' },
      { id: '5', corridorId: 'usdt-ngn', amount: 1200, fromCurrency: 'USDT', toCurrency: 'NGN', recipient: 'evander@example.com', status: 'Settled', rate: 615.5, fee: 24, receiveAmount: 716_556, created: '2026-09-30', settled: '2026-09-30' },
    ],
  };
}

export function readState(): State {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    const shapeOk = value?.version === 1
      && value.session && typeof value.session === 'object'
      && ['payouts', 'applications', 'receipts'].every(k => Array.isArray(value[k]));
    if (shapeOk) return value;
  } catch { /* Unreadable storage starts fresh */ }
  return initialState();
}
