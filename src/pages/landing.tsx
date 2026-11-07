import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, Check, ChevronDown, GitMerge, GitPullRequest, Lock,
  ReceiptText, ShieldCheck, Sparkles,
} from 'lucide-react';
import { escrowedTotal, formatMoney, repoName } from '../lib/model';
import { PLATFORM } from '../lib/platform';
import { useApp } from '../lib/store';
import { Avatar, Chip, EASE, Item, Stagger } from '../components/ui';
import {
  AnimatedContent, Aurora, ClickSpark, GlareHover, GradientText,
  Magnet, RotatingText, ScrollProgress, SplitText, StarBorder,
} from '../components/bits';
import { MoltenMetal } from '../components/bits';
import { Lanyard, LogoLoop } from '../components/bits';
import { FanSection, LiveStackSection, SpiralSection, TeamSection } from './sections';

const STEPS = [
  { n: '01', t: 'Enter details', d: 'Select amount, destination, and payout method. Get instant rate quotes powered by Blaaiz.', icon: ShieldCheck },
  { n: '02', t: 'See the rates', d: 'Real-time exchange rates and transparent fees calculated on the Blaaiz API. No surprises.', icon: Lock },
  { n: '03', t: 'Confirm & payout', d: 'Review the details and submit. Payout is created in seconds with a trackable reference.', icon: GitPullRequest },
  { n: '04', t: 'Instant settlement', d: 'Funds settle on their destination currency in minutes. One-click escrow release for contracts.', icon: GitMerge },
];

const TIERS = [
  { level: 'Instant Payout' as const, blurb: 'Get paid in crypto or USD, out in your own currency — bank transfer, mobile money, or ACH, in minutes.' },
  { level: 'Pay Abroad' as const, blurb: 'Holding naira in Lagos but buying in Accra? Pay in what you have — the seller gets their own currency, automatically.' },
  { level: 'Escrow for Hiring' as const, blurb: 'A client funds the job in crypto. Horizon Cash holds it until the work is done, then releases it in one click.' },
];

const FAQS = [
  { q: 'How are exchange rates calculated?', a: "We pull live rates directly from Blaaiz's API, updated in real-time. You always see the true rate with transparent fee breakdown before confirming." },
  { q: 'What are the fees?', a: 'Fees are typically 2% or $0.50 flat, whichever is higher. The exact fee depends on your payout method and destination. You see the full breakdown before sending.' },
  { q: 'How long do payouts take?', a: 'Instant payouts via Blaaiz settle in minutes to the recipient\'s bank account or mobile money. Escrow payouts release immediately once conditions are met.' },
  { q: 'What currencies are supported?', a: 'We support 50+ currency pairs including crypto (USDT, USDC) and fiat (NGN, GHS, KES, ZAR, EUR, GBP, CAD, and more) across multiple blockchains.' },
  { q: 'Is my money safe with escrow?', a: "Yes. Escrow funds are held in an in-memory secure store until release conditions are met. The platform uses Blaaiz's verified payout system." },
  { q: 'Do you require KYC?', a: "KYC is handled through Blaaiz's Signa flow for compliance. Details depend on your jurisdiction and payout amount." },
];

export function Landing() {
  const { state } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const accepted = state.repos.filter(r => r.status === 'Verified');
  const escrowed = escrowedTotal(state.issues, state.applications);
  const paidOut = state.receipts.reduce((sum, r) => sum + r.amount, 0);
  const top = state.issues.slice().sort((a, b) => b.bounty - a.bounty).slice(0, 3);

  return (
    <ClickSpark>
      <ScrollProgress />

      {/* ------------------------------------------------------------- hero */}
      <section className="hero">
        <MoltenMetal />
        <span className="metal-veil" aria-hidden="true" />
        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <StarBorder className="hero-badge">
              <span className="hero-badge-in">
                <span className="dot-live" />
                Built on Blaaiz • 🎬 Demo Mode
              </span>
            </StarBorder>

            <h1 className="hero-title">
              <SplitText text="Move money," />
              <br />
              <GradientText>anywhere on Earth.</GradientText>
            </h1>

            <p className="hero-sub">
              Get paid in crypto, pay someone abroad in their own currency,
              or hire with escrow protection — one platform, powered
              end-to-end by the Blaaiz API.
            </p>

            <p className="hero-rotate">
              Built on{' '}
              <RotatingText words={['Blaaiz', 'Stellar', 'Soroban', 'USDC']} />
            </p>

            <div className="row wrap hero-cta">
              <Magnet>
                <Link className="btn lg primary glow" to="/explore">
                  <GlareHover><span className="row" style={{ gap: 6 }}>Explore issues<ArrowRight size={15} /></span></GlareHover>
                </Link>
              </Magnet>
              <Link className="btn lg" to="/explore/repos">Browse repositories</Link>
            </div>

            <div className="hero-meta">
              <span><strong>3</strong> use cases</span>
              <span className="sep">·</span>
              <span><strong>50+</strong> currencies</span>
              <span className="sep">·</span>
              <span><strong>Instant</strong> settlement</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          >
            <Lanyard>
              <div className="badge-card">
                <span className="badge-hole" aria-hidden="true" />
                <span className="label badge-eyebrow">Receipt</span>
                <p className="badge-name">Paid on merge</p>
                <p className="badge-role">{PLATFORM.chain} {PLATFORM.network}</p>
                <div className="badge-rows">
                  <div className="badge-row"><span>In escrow</span><span>${formatMoney(escrowed)}</span></div>
                  <div className="badge-row"><span>Funded issues</span><span>{state.issues.length}</span></div>
                  <div className="badge-row"><span>Paid out</span><span>${formatMoney(paidOut)}</span></div>
                </div>
                <div className="badge-strip">drag me</div>
              </div>
            </Lanyard>
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------- payment methods strip */}
      <section className="strip">
        <p className="label strip-label">Supported blockchains & payment methods</p>
        <LogoLoop speed={34}>
          {[
            { name: 'Ethereum', org: 'Chain' },
            { name: 'Binance Smart Chain', org: 'Chain' },
            { name: 'Polygon', org: 'Chain' },
            { name: 'TRON', org: 'Chain' },
            { name: 'Mobile Money', org: 'Payout' },
            { name: 'Bank Transfer', org: 'Payout' },
            { name: 'ACH', org: 'Payout' },
          ].map(item => (
            <div className="strip-item" key={item.name}>
              <div style={{ width: '32px', height: '32px', background: 'var(--acc-soft)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>◆</div>
              <span className="col" style={{ gap: 0, minWidth: 0 }}>
                <span className="row-title">{item.name}</span>
                <span className="row-sub">{item.org}</span>
              </span>
            </div>
          ))}
        </LogoLoop>
      </section>

      {/* ------------------------------------------ bento: two views, one ledger */}
      <section className="band alt">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Three ways to move money</h2>
                <p>Powered end to end by the Blaaiz RaaS API</p>
              </div>
              <Link className="btn" to="/explore">Try the demo<ArrowRight size={14} /></Link>
            </div>
          </AnimatedContent>

          <div className="bento">
            <AnimatedContent className="box w4 tall pad-lg">
              <span className="box-icon"><Lock size={18} /></span>
              <h3>Real-time FX rates</h3>
              <p>
                Live exchange rates pulled straight from Blaaiz, not a markup guess. See transparent fees
                and the exact amount before confirming. No surprises, no hidden charges — just the true rate
                and a clear breakdown of what you'll receive.
              </p>
              <span className="spacer" />
              <div className="box-preview">
                {top.map(issue => {
                  const repo = state.repos.find(r => r.id === issue.repoId);
                  return (
                    <div className="mini-row" key={issue.id}>
                      {repo && <Avatar name={repo.org} org={repo.org} square />}
                      <span className="col" style={{ gap: 1, minWidth: 0, flex: 1 }}>
                        <span className="row-title">{issue.title}</span>
                        <span className="row-sub">{repo ? repoName(repo) : ''}</span>
                      </span>
                      <span className="row-title num hide-sm">${formatMoney(issue.bounty)}</span>
                      <Chip tone="ok">Escrowed</Chip>
                    </div>
                  );
                })}
              </div>
            </AnimatedContent>

            <AnimatedContent className="box w2 tall" delay={0.06}>
              <span className="big-num acc">50+</span>
              <h3>Currency pairs</h3>
              <p>Send crypto, receive fiat. Support across multiple blockchains and payment methods worldwide.</p>
              <span className="spacer" />
              <Link className="btn sm" to="/explore">Try it<ArrowRight size={13} /></Link>
            </AnimatedContent>

            <AnimatedContent className="box w2" delay={0.1}>
              <span className="big-num">2%</span>
              <h3>Transparent fees</h3>
              <p>Or $0.50 flat, whichever is higher. Full breakdown before confirming.</p>
            </AnimatedContent>

            <AnimatedContent className="box w2" delay={0.14}>
              <span className="big-num">✓</span>
              <h3>KYC & compliance</h3>
              <p>Handled through Blaaiz's Signa flow for verified payouts.</p>
            </AnimatedContent>

            <AnimatedContent className="box w2" delay={0.18}>
              <span className="big-num acc">⚡</span>
              <h3>Instant settlement</h3>
              <p>Funds settle in minutes. Escrow releases immediately once conditions are met.</p>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <LiveStackSection issues={state.issues} repos={state.repos} />

      {/* -------------------------------------------------------- open right now */}
      <section className="band">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Features that matter</h2>
                <p>Built on Blaaiz with security and transparency</p>
              </div>
              <Link className="btn" to="/explore">Try the demo<ArrowRight size={14} /></Link>
            </div>
          </AnimatedContent>
          <Stagger className="list">
            {[
              { title: 'Multi-chain crypto', desc: 'USDT or USDC, on Ethereum, BSC, Tron, or Polygon.' },
              { title: 'Real-time FX rates', desc: 'Live exchange rates pulled straight from Blaaiz, not a markup guess.' },
              { title: 'Built-in KYC & compliance', desc: 'Customer verification handled through Blaaiz\'s Signa flow.' },
              { title: 'Transparent fees', desc: 'Full fee breakdown before you confirm — no hidden charges.' },
              { title: 'API-first design', desc: 'Built on the Blaaiz Node SDK, with webhooks driving escrow confirmations.' },
              { title: 'Escrow protection', desc: 'Funds held safely until work is confirmed done, then released instantly.' },
            ].map((feature, idx) => (
              <Item key={idx}>
                <div className="list-row" style={{ cursor: 'default' }}>
                  <span className="mono dim issue-num">✓</span>
                  <span className="col" style={{ gap: 2, minWidth: 0, flex: 1 }}>
                    <span className="row-title">{feature.title}</span>
                    <span className="row-sub">{feature.desc}</span>
                  </span>
                  <Check size={16} style={{ color: 'var(--acc)' }} />
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <FanSection />

      {/* ------------------------------------------------------------ four steps */}
      <section className="band alt">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>From quote to settled</h2>
                <p>Four steps, transparent pricing at every stage</p>
              </div>
            </div>
          </AnimatedContent>
          <div className="bento">
            {STEPS.map((step, i) => (
              <AnimatedContent className="box w3" key={step.n} delay={i * 0.07}>
                <div className="row">
                  <span className="box-icon"><step.icon size={18} /></span>
                  <span className="spacer" />
                  <span className="big-num step-num">{step.n}</span>
                </div>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- bounty tiers */}
      <section className="band">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Three ways to move money</h2>
                <p>Pick the use case that fits your needs</p>
              </div>
              <Link className="btn" to="/explore">Try the demo<ArrowRight size={14} /></Link>
            </div>
          </AnimatedContent>

          <div className="bento">
            {TIERS.map((t, i) => (
              <AnimatedContent className="box w2" key={t.level} delay={i * 0.07}>
                <span className="box-kicker">{t.level}</span>
                <span className="big-num acc">✓</span>
                <p>{t.blurb}</p>
              </AnimatedContent>
            ))}

            <AnimatedContent className="box w6 pad-lg" delay={0.1}>
              <span className="label"><ReceiptText size={12} style={{ verticalAlign: '-2px' }} /> What makes Horizon Cash different</span>
              <div className="formula">
                <span className="formula-part">Multi-chain</span>
                <span className="formula-op">·</span>
                <span className="formula-part">Real-time rates</span>
                <span className="formula-op">·</span>
                <span className="formula-part">Escrow ready</span>
                <span className="formula-op">·</span>
                <span className="formula-part acc">Instant settlement</span>
              </div>
              <ul className="ticks">
                <li><Check size={14} />Send crypto on any chain, receive fiat instantly in your local currency.</li>
                <li><Check size={14} />Escrow protection for hiring — funds held safely until work is confirmed done.</li>
                <li><Check size={14} />Built end-to-end on Blaaiz with transparent rates and verified payouts.</li>
              </ul>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <SpiralSection repos={accepted} />

      {/* ----------------------------------------------------------- maintainers */}
      <section className="band alt">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Built for developers</h2>
                <p>API-first design with Blaaiz Node SDK and webhook-driven escrow confirmations.</p>
              </div>
              <Magnet>
                <Link className="btn primary glow" to="/explore">
                  Try the demo<ArrowRight size={14} />
                </Link>
              </Magnet>
            </div>
          </AnimatedContent>

          <div className="bento">
            <AnimatedContent className="box w3 pad-lg">
              <h3>Multi-chain crypto support</h3>
              <p>
                USDT or USDC on Ethereum, BSC, Tron, or Polygon. Payout to any destination
                instantly. Built on Blaaiz's RaaS infrastructure for reliable, transparent global payouts.
              </p>
              <ul className="ticks">
                {[
                  'Multi-chain crypto: USDT/USDC on major blockchains',
                  'Real-time exchange rates from Blaaiz API',
                  'Built-in KYC & compliance through Signa',
                  'API-first with webhooks for escrow workflows',
                ].map(t => <li key={t}><Check size={14} />{t}</li>)}
              </ul>
            </AnimatedContent>

            <AnimatedContent className="box w3 pad-lg" delay={0.08}>
              <span className="label">Supported currencies</span>
              <div className="box-preview">
                {[
                  { name: 'USDC', org: 'Crypto' },
                  { name: 'USDT', org: 'Crypto' },
                  { name: 'USD', org: 'Fiat' },
                  { name: 'EUR', org: 'Fiat' },
                  { name: 'GBP', org: 'Fiat' },
                ].map(c => (
                  <div className="mini-row" key={c.name}>
                    <span style={{ width: '32px', height: '32px', background: 'var(--acc-soft)', borderRadius: '4px' }} />
                    <span className="col" style={{ gap: 1, minWidth: 0, flex: 1 }}>
                      <span className="row-title">{c.name}</span>
                      <span className="row-sub">{c.org}</span>
                    </span>
                    <Chip tone="ok">Live</Chip>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <TeamSection repos={accepted} />

      {/* ------------------------------------------------------------------ faq */}
      <section className="band">
        <div className="band-inner narrow">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Questions answered</h2>
                <p>How global payouts work</p>
              </div>
            </div>
          </AnimatedContent>
          <div className="faq">
            {FAQS.map((f, i) => (
              <AnimatedContent key={f.q} delay={i * 0.04}>
                <div className={openFaq === i ? 'faq-item open' : 'faq-item'}>
                  <button
                    className="faq-q"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <ChevronDown size={16} className="faq-chev" />
                  </button>
                  <motion.div
                    className="faq-a"
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.26, ease: EASE }}
                  >
                    <p className="muted">{f.a}</p>
                  </motion.div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ final cta */}
      <section className="band cta-band">
        <Aurora className="cta-aurora" />
        <div className="band-inner">
          <AnimatedContent>
            <div className="cta">
              <Chip className="cta-chip"><Sparkles size={11} />Paid on merge, on Blaaiz</Chip>
              <h2 className="cta-title">
                Ready to move money <GradientText>globally?</GradientText>
              </h2>
              <p className="muted">
                Try Horizon Cash now. Three use cases, one platform, end-to-end Blaaiz integration.
              </p>
              <div className="row wrap cta-actions">
                <Magnet>
                  <Link className="btn lg primary glow" to="/explore">
                    <GlareHover><span className="row" style={{ gap: 6 }}>Try the demo<ArrowRight size={15} /></span></GlareHover>
                  </Link>
                </Magnet>
                <Link className="btn lg" to="/explore">How it works</Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <footer className="foot">
        <div className="foot-inner">
          <span className="dim">
            Horizon Cash — Move money, anywhere on Earth. Preview: Demo mode with no real funds connected yet.
          </span>
          <div className="row" style={{ gap: 14 }}>
            <Link className="dim" to="/explore">Try it</Link>
            <Link className="dim" to="/explore">How it works</Link>
          </div>
        </div>
      </footer>
    </ClickSpark>
  );
}
