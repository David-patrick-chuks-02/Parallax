import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, Check, ChevronDown, Send, TrendingUp,
  ReceiptText, Zap, Sparkles,
} from 'lucide-react';
import { formatMoney, totalProcessing } from '../lib/model';
import { useApp } from '../lib/store';
import { Chip, EASE } from '../components/ui';
import {
  AnimatedContent, Aurora, ClickSpark, GlareHover, GradientText,
  Magnet, RotatingText, ScrollProgress, SplitText, StarBorder,
} from '../components/bits';
import { MoltenMetal } from '../components/bits';
import { Lanyard, LogoLoop } from '../components/bits';
import { FanSection, LiveStackSection, SpiralSection, TeamSection } from './sections';

const STEPS = [
  { n: '01', t: 'Enter details', d: 'Amount, destination, and payout method. Get instant rate quotes powered by Blaaiz.', icon: Zap },
  { n: '02', t: 'See the rates', d: 'Real-time FX rates and transparent fees from Blaaiz. No surprises, no markup.', icon: TrendingUp },
  { n: '03', t: 'Confirm & send', d: 'Review and submit. Your payout gets a trackable reference instantly.', icon: Send },
  { n: '04', t: 'Track settlement', d: 'Funds settle in destination currency within minutes. See live status.', icon: Check },
];

const FEATURES = [
  { level: 'Instant Payout' as const, blurb: 'Get paid in crypto or USD, cash out to your local currency via bank, mobile money, or ACH in minutes.' },
  { level: 'Pay Abroad' as const, blurb: 'Have USDC in Singapore, paying someone in Lagos? They receive NGN automatically. 50+ corridor pairs.' },
  { level: 'Escrow for Hiring' as const, blurb: 'Client funds the job in crypto. Parallax holds it secure until work is done, then one-click release.' },
];

const FAQS = [
  { q: 'How are exchange rates calculated?', a: "Live from Blaaiz's API, updated in real-time. You see the true rate and fee breakdown before confirming." },
  { q: 'What are the fees?', a: 'Typically 2% or $0.50 flat, whichever is higher. Exact fee depends on destination. Full breakdown shown upfront.' },
  { q: 'How long until settlement?', a: 'Payouts settle in minutes to bank, mobile money, or ACH. Escrow releases immediately once conditions are met.' },
  { q: 'Which currencies are supported?', a: 'Send: USDC, USDT on Ethereum, BSC, Polygon, Tron. Receive: 50+ currencies (USD, EUR, NGN, GHS, KES, ZAR, and more).' },
  { q: 'Is escrow secure?', a: 'Yes. Funds held securely until release conditions are met. Uses Blaaiz verified payout infrastructure.' },
  { q: 'Do I need KYC?', a: 'For some corridors, yes. Handled via Blaaiz Signa flow. Requirements depend on amount and destination.' },
];

export function Landing() {
  const { state } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const processing = totalProcessing(state.payouts);
  const paidOut = state.receipts.reduce((sum, r) => sum + r.receiveAmount, 0);
  const recentPayouts = state.payouts.slice(0, 3);

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
              Send crypto, get real FX rates, receive fiat instantly. Parallax is the payout tracker
              for global teams, freelancers, and remote hiring — powered end-to-end by Blaaiz.
            </p>

            <p className="hero-rotate">
              The Build hackathon{' '}
              <RotatingText words={['Blaaiz', 'Real Rates', 'Real Payouts', 'Real Impact']} />
            </p>

            <div className="row wrap hero-cta">
              <Magnet>
                <Link className="btn lg primary glow" to="/explore">
                  <GlareHover><span className="row" style={{ gap: 6 }}>Create payout<ArrowRight size={15} /></span></GlareHover>
                </Link>
              </Magnet>
              <Link className="btn lg" to="/explore">View payouts</Link>
            </div>

            <div className="hero-meta">
              <span><strong>50+</strong> corridors</span>
              <span className="sep">·</span>
              <span><strong>${formatMoney(processing)}</strong> processing</span>
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
                <span className="label badge-eyebrow">Payout Receipt</span>
                <p className="badge-name">Real rates, real payout</p>
                <p className="badge-role">Powered by Blaaiz</p>
                <div className="badge-rows">
                  <div className="badge-row"><span>Processing</span><span>${formatMoney(processing)}</span></div>
                  <div className="badge-row"><span>Total payouts</span><span>{state.payouts.length}</span></div>
                  <div className="badge-row"><span>Settled</span><span>${formatMoney(paidOut)}</span></div>
                </div>
                <div className="badge-strip">drag me</div>
              </div>
            </Lanyard>
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------- corridor strip */}
      <section className="strip">
        <p className="label strip-label">Supported corridors</p>
        <LogoLoop speed={34}>
          {[
            { name: 'USDC → USD', path: 'Send USDC, Receive USD' },
            { name: 'USDT → NGN', path: 'Send USDT, Receive Naira' },
            { name: 'USDC → EUR', path: 'Send USDC, Receive Euro' },
            { name: 'USDC → ZAR', path: 'Send USDC, Receive Rand' },
            { name: 'USDT → GHS', path: 'Send USDT, Receive Cedi' },
            { name: 'USDC → KES', path: 'Send USDC, Receive Shilling' },
          ].map(corridor => (
            <div className="strip-item" key={corridor.name}>
              <div style={{ width: '32px', height: '32px', background: 'var(--acc-soft)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>💱</div>
              <span className="col" style={{ gap: 0, minWidth: 0 }}>
                <span className="row-title">{corridor.name}</span>
                <span className="row-sub">{corridor.path}</span>
              </span>
            </div>
          ))}
        </LogoLoop>
      </section>

      {/* ------------------------------------------ bento: how it works */}
      <section className="band alt">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>How Parallax works</h2>
                <p>Real rates, transparent fees, instant settlement — all powered by Blaaiz.</p>
              </div>
              <Link className="btn" to="/explore">Start payout<ArrowRight size={14} /></Link>
            </div>
          </AnimatedContent>

          <div className="bento">
            <AnimatedContent className="box w4 tall pad-lg">
              <span className="box-icon"><Send size={18} /></span>
              <h3>Real-time rates</h3>
              <p>
                Every FX rate is live from Blaaiz, updated constantly. No guesses, no markups.
                See exactly what your payout costs before you confirm.
              </p>
              <span className="spacer" />
              <div className="box-preview">
                {recentPayouts.map(payout => (
                  <div className="mini-row" key={payout.id}>
                    <div style={{ width: '28px', height: '28px', background: 'var(--acc-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>💱</div>
                    <span className="col" style={{ gap: 1, minWidth: 0, flex: 1 }}>
                      <span className="row-title">{payout.fromCurrency} → {payout.toCurrency}</span>
                      <span className="row-sub">Rate: {payout.rate}</span>
                    </span>
                    <span className="row-title num hide-sm">${formatMoney(payout.amount)}</span>
                    <Chip tone={payout.status === 'Settled' ? 'ok' : 'warn'}>{payout.status}</Chip>
                  </div>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent className="box w2 tall" delay={0.06}>
              <span className="big-num acc">50+</span>
              <h3>Corridors</h3>
              <p>Send crypto on any major chain, receive fiat anywhere.</p>
              <span className="spacer" />
              <Link className="btn sm" to="/explore">Browse<ArrowRight size={13} /></Link>
            </AnimatedContent>

            <AnimatedContent className="box w2" delay={0.1}>
              <span className="big-num">⚡</span>
              <h3>Minutes</h3>
              <p>Settlement in minutes, not days. Real-time payout tracking.</p>
            </AnimatedContent>

            <AnimatedContent className="box w2" delay={0.14}>
              <span className="big-num">✓</span>
              <h3>Transparent</h3>
              <p>All fees shown upfront. No hidden charges or surprises.</p>
            </AnimatedContent>

            <AnimatedContent className="box w2" delay={0.18}>
              <span className="big-num acc">🔐</span>
              <h3>Escrow ready</h3>
              <p>Secure conditional release for hiring and contracts.</p>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <LiveStackSection payouts={state.payouts} />

      {/* -------------------------------------------------------- four steps */}
      <section className="band alt">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>From amount to settlement</h2>
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

      {/* ---------------------------------------------------------- features */}
      <section className="band">
        <div className="band-inner">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Three real flows</h2>
                <p>Whatever your use case, Parallax handles the currency conversion.</p>
              </div>
              <Link className="btn" to="/explore">Create payout<ArrowRight size={14} /></Link>
            </div>
          </AnimatedContent>

          <div className="bento">
            {FEATURES.map((f, i) => (
              <AnimatedContent className="box w2" key={f.level} delay={i * 0.07}>
                <span className="box-kicker">{f.level}</span>
                <span className="big-num acc">✓</span>
                <p>{f.blurb}</p>
              </AnimatedContent>
            ))}

            <AnimatedContent className="box w6 pad-lg" delay={0.1}>
              <span className="label"><ReceiptText size={12} style={{ verticalAlign: '-2px' }} /> Why Parallax + Blaaiz</span>
              <div className="formula">
                <span className="formula-part">Real rates</span>
                <span className="formula-op">·</span>
                <span className="formula-part">Transparent fees</span>
                <span className="formula-op">·</span>
                <span className="formula-part">Instant settlement</span>
                <span className="formula-op">·</span>
                <span className="formula-part acc">Escrow protection</span>
              </div>
              <ul className="ticks">
                <li><Check size={14} />Live FX rates from Blaaiz API — no guesses.</li>
                <li><Check size={14} />See fees before you confirm — full transparency.</li>
                <li><Check size={14} />Multi-chain support — send USDC/USDT from any major chain.</li>
              </ul>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <FanSection />
      <SpiralSection />
      <TeamSection />

      {/* ------------------------------------------------------------------ faq */}
      <section className="band">
        <div className="band-inner narrow">
          <AnimatedContent>
            <div className="sec">
              <div>
                <h2>Questions</h2>
                <p>How Parallax payouts work, powered by Blaaiz.</p>
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
              <Chip className="cta-chip"><Sparkles size={11} />For The Build Hackathon</Chip>
              <h2 className="cta-title">
                Create a payout, <GradientText>see it settle.</GradientText>
              </h2>
              <p className="muted">
                Real Blaaiz integration. Real rates. Real global payouts.
              </p>
              <div className="row wrap cta-actions">
                <Magnet>
                  <Link className="btn lg primary glow" to="/explore">
                    <GlareHover><span className="row" style={{ gap: 6 }}>Try it now<ArrowRight size={15} /></span></GlareHover>
                  </Link>
                </Magnet>
                <Link className="btn lg" to="/explore">View payouts</Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <footer className="foot">
        <div className="foot-inner">
          <span className="dim">
            Parallax — Move money, anywhere on Earth. Powered by Blaaiz. Built for The Build Hackathon.
          </span>
          <div className="row" style={{ gap: 14 }}>
            <Link className="dim" to="/explore">Create payout</Link>
            <Link className="dim" to="/explore">View payouts</Link>
          </div>
        </div>
      </footer>
    </ClickSpark>
  );
}
