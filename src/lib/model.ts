export type Complexity = 'Trivial' | 'Medium' | 'High';
export type ApplicationStatus = 'Applied' | 'Assigned' | 'PR submitted' | 'Paid' | 'Rejected';
export type RepoStatus = 'Pending' | 'Verified' | 'Rejected';

export interface Repo {
  id: string;
  org: string;
  name: string;
  description: string;
  languages: string[];
  stars: number;
  forks: number;
  /** Directory metadata, so a listing reads like a real repository entry. */
  topics?: string[];
  license?: string;
  updated?: string;
  /** Maintainer handle that connected this repository. Seeded repos have none. */
  ownerId?: string;
  /** A repository can only fund issues — and only gets a dashboard — once ownership is verified. */
  status: RepoStatus;
  submitted?: string;
  reviewNote?: string;
}

export interface Issue {
  id: string;
  repoId: string;
  title: string;
  description: string;
  criteria: string[];
  complexity: Complexity;
  /** Fixed bounty in the platform asset, escrowed when the issue is posted. */
  bounty: number;
  created: string;
}

export interface Application {
  issueId: string;
  message: string;
  status: ApplicationStatus;
  pr?: string;
  /** Sample contributor. Absent means the signed-in contributor. */
  applicant?: string;
}

/** Record of a payment. On-chain once integrated; local in the preview. */
export interface Receipt {
  id: string;
  issueId: string;
  repoId: string;
  contributor: string;
  /** Crypto wallet address the payout was sent to. */
  address: string | null;
  amount: number;
  pr: string;
  paidAt: string;
}

/** Contributor and maintainer are separate sessions — signing into one never grants the other. */
export interface Session {
  contributor: string | null;
  maintainer: string | null;
}

export interface State {
  version: 1;
  session: Session;
  /** The signed-in contributor's crypto wallet address. */
  payoutAddress: string | null;
  repos: Repo[];
  issues: Issue[];
  applications: Application[];
  receipts: Receipt[];
}

export const storageKey = 'parallax-preview-v1';

/** Suggested bounty for a complexity level. Maintainers can set any amount. */
export const suggestedBounty = (complexity: Complexity) =>
  ({ Trivial: 150, Medium: 400, High: 900 })[complexity];

/** Crypto wallet address validation. */
export const isStellarAddress = (value: string) => /^0x[a-fA-F0-9]{40}$|^G[A-Z2-7]{55}$/.test(value);

export const shortAddress = (value: string) => `${value.slice(0, 4)}…${value.slice(-4)}`;

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount);

export const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : String(n);

export const dateLabel = (date: string) =>
  new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** "3 days ago" style relative label for repository freshness. */
export function relativeDate(date: string, now = new Date()): string {
  const then = new Date(date + 'T12:00:00');
  const days = Math.round((now.getTime() - then.getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? 'last month' : `${months} months ago`;
}

export const repoName = (repo: Repo) => `${repo.org}/${repo.name}`;

export const isOwnApplication = (a: Application) => !a.applicant;
export const applicantName = (a: Application, profile: string) => a.applicant ?? profile;

export const statusTone = (status: ApplicationStatus) =>
  status === 'Paid' ? 'ok' : status === 'Rejected' ? 'bad' : status === 'Applied' ? '' : 'warn';

/** An issue is settled once its bounty has been released. */
export const isPaid = (issueId: string, applications: Application[]) =>
  applications.some(a => a.issueId === issueId && a.status === 'Paid');

/** Bounties still held in escrow: every posted issue that has not paid out. */
export const escrowedTotal = (issues: Issue[], applications: Application[]) =>
  issues.filter(i => !isPaid(i.id, applications)).reduce((sum, i) => sum + i.bounty, 0);

/** Repositories the signed-in maintainer connected. */
export const reposOwnedBy = (repos: Repo[], maintainer: string | null) =>
  maintainer ? repos.filter(r => r.ownerId === maintainer) : [];

/** The gate: a repo dashboard opens only for a verified repo owned by this maintainer. */
export const canOpenRepoDashboard = (repo: Repo | undefined, maintainer: string | null) =>
  !!repo && !!maintainer && repo.ownerId === maintainer && repo.status === 'Verified';

/** Next free numeric issue id, so posted issues read like GitHub numbers. */
export const nextIssueId = (issues: Issue[]) =>
  String(issues.reduce((max, i) => Math.max(max, Number(i.id) || 0), 0) + 1);

export function initialState(): State {
  return {
    version: 1,
    session: { contributor: null, maintainer: null },
    payoutAddress: null,
    receipts: [],
    applications: [
      { issueId: '842', applicant: 'nadia.dev', status: 'Applied', message: 'I have 3 years working with ACH integrations. My plan: integrate Stripe ACH Instant, add account type detection, and build end-to-end tests covering both personal and business accounts.' },
      { issueId: '842', applicant: 'kwame-o', status: 'Applied', message: 'I can handle this. I would start with provider integration, then add account validation, test across regions, and document the setup flow clearly.' },
      { issueId: '215', applicant: 'lucia-m', status: 'Applied', message: 'I work in fintech in Nigeria. I will implement carrier detection by parsing the number, build abstractions for each carrier API, and set up a test suite with real carriers.' },
      { issueId: '301', applicant: 'tobi.k', status: 'Applied', message: 'I built Redis modules before. I will implement TTL-based caching with eviction, add cache headers to responses, and set up monitoring to track hit rates.' },
    ],
    repos: [
      { id: 'usdc-usd', org: 'Blaaiz', name: 'USDC → USD Bank', description: 'Send USDC on Ethereum, BSC, or Polygon. Receive USD in US bank account.', languages: ['Crypto', 'Bank'], stars: 2450, forks: 890, topics: ['usdc', 'bank', 'instant'], license: 'MIT', updated: '2026-10-03', status: 'Verified' },
      { id: 'usdt-ngn', org: 'Blaaiz', name: 'USDT → NGN Mobile', description: 'Send USDT on any chain. Receive Nigerian Naira via mobile money in minutes.', languages: ['Crypto', 'Mobile'], stars: 1680, forks: 620, topics: ['usdt', 'ngn', 'africa'], license: 'MIT', updated: '2026-10-02', status: 'Verified' },
      { id: 'usdc-eur', org: 'Blaaiz', name: 'USDC → EUR Bank', description: 'Send USDC, receive EUR in European bank account or SEPA transfer.', languages: ['Crypto', 'Bank'], stars: 1890, forks: 540, topics: ['usdc', 'europe', 'sepa'], license: 'MIT', updated: '2026-10-01', status: 'Verified' },
      { id: 'escrow-sdk', org: 'Blaaiz', name: 'Escrow Contracts', description: 'Smart contracts for conditional fund release. Perfect for hiring and freelance work.', languages: ['Solidity', 'Rust'], stars: 950, forks: 440, topics: ['escrow', 'contracts', 'hiring'], license: 'Apache-2.0', updated: '2026-09-30', status: 'Verified' },
      { id: 'rate-api', org: 'Blaaiz', name: 'Real-time FX API', description: 'Live exchange rates, fee calculation, and quote generation for all supported corridors.', languages: ['TypeScript', 'Go'], stars: 1240, forks: 380, topics: ['api', 'rates', 'payments'], license: 'Apache-2.0', updated: '2026-09-29', status: 'Verified' },
      { id: 'compliance', org: 'Blaaiz', name: 'KYC & Compliance', description: 'Automated KYC verification through Signa flow. AML checks and regulatory compliance.', languages: ['TypeScript', 'Python'], stars: 780, forks: 260, topics: ['kyc', 'compliance', 'aml'], license: 'MIT', updated: '2026-09-28', status: 'Verified' },
    ],
    issues: [
      { id: '842', repoId: 'usdc-usd', title: 'Add instant ACH withdrawals', description: 'Enable users to receive USD via ACH in under 1 hour instead of the current 24-hour standard.', criteria: ['Integrate with ACH instant rail provider.', 'Support both business and personal accounts.', 'Display estimated arrival time before confirm.'], complexity: 'High', bounty: 2500, created: '2026-10-02' },
      { id: '215', repoId: 'usdt-ngn', title: 'Add Airtime top-up as payout method', description: 'Allow recipients to receive Nigerian Airtime credit instead of cash. Direct top-up to any carrier.', criteria: ['Support MTN, Airtel, Glo, 9mobile.', 'Automatic carrier detection by phone number.', 'Real-time top-up confirmation.'], complexity: 'High', bounty: 1850, created: '2026-10-01' },
      { id: '301', repoId: 'rate-api', title: 'Cache exchange rates with TTL', description: 'Cache FX rates for 30 seconds to reduce API calls while maintaining real-time accuracy.', criteria: ['Implement Redis cache with 30s TTL.', 'Fall back to API if cache miss.', 'Monitor cache hit rate.'], complexity: 'Medium', bounty: 1200, created: '2026-09-30' },
      { id: '512', repoId: 'escrow-sdk', title: 'Add milestone-based escrow release', description: 'Allow escrow holders to set multiple milestones with conditional releases instead of all-or-nothing.', criteria: ['Support 2-5 sequential milestones.', 'Require approval for each release.', 'Log release history on-chain.'], complexity: 'High', bounty: 1950, created: '2026-09-29' },
      { id: '77', repoId: 'compliance', title: 'Reduce KYC verification time to 5 minutes', description: 'Optimize document verification and liveness check to complete in under 5 minutes.', criteria: ['Parallel document and liveness checks.', 'Auto-pass low-risk profiles.', 'Average verification time < 5 mins.'], complexity: 'Medium', bounty: 950, created: '2026-09-28' },
      { id: '128', repoId: 'usdc-eur', title: 'Add SEPA Instant support', description: 'Enable SEPA Instant transfers for EUR payouts (arrives within 10 seconds).', criteria: ['Integrate SEPA Instant provider.', 'Support all EU banks.', 'Show instant badge in UI.'], complexity: 'Medium', bounty: 1650, created: '2026-09-27' },
      { id: '843', repoId: 'rate-api', title: 'Display historical rate chart', description: 'Show 7-day and 30-day rate history for each corridor so users see price trends.', criteria: ['Fetch historical rates from Blaaiz.', 'Render candlestick or line chart.', 'Allow date range selection.'], complexity: 'Medium', bounty: 980, created: '2026-09-26' },
    ],
  };
}

export function readState(): State {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    const shapeOk = value?.version === 1
      && value.session && typeof value.session === 'object'
      && ['repos', 'issues', 'applications', 'receipts'].every(k => Array.isArray(value[k]));
    if (shapeOk) return value;
  } catch { /* Unreadable storage starts a fresh preview. */ }
  return initialState();
}
