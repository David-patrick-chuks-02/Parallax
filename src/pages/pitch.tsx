import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Send, TrendingUp, Zap, Check } from 'lucide-react';
import { EASE } from '../components/ui';
import { AnimatedContent, GradientText, StarBorder, Magnet, GlareHover } from '../components/bits';

const SLIDES = [
  {
    id: 1,
    type: 'hero',
    title: 'Move money,',
    highlight: 'anywhere on Earth.',
    subtitle: 'Send crypto, get real FX rates, receive fiat instantly. Parallax is the payout tracker for global teams, freelancers, and remote hiring — powered end-to-end by Blaaiz.',
  },
  {
    id: 2,
    type: 'problem',
    badge: 'The Problem',
    title: 'Why crypto payouts are broken',
    points: [
      { icon: '💸', title: 'No clean off-ramp', desc: 'Exchanges charge 2-5%, have high minimums, and are slow. It\'s worse in emerging markets.' },
      { icon: '🌍', title: 'No trustless escrow', desc: 'Clients and contractors have no way to secure payments — it\'s all faith or expensive intermediaries.' },
    ],
  },
  {
    id: 3,
    type: 'solution',
    badge: 'The Solution',
    title: 'Parallax, powered by Blaaiz',
    subtitle: 'Real infrastructure for real payouts. Live FX rates. Transparent fees. Instant settlement. Escrow protection.',
  },
  {
    id: 4,
    type: 'features',
    badge: 'Three Real Flows',
    title: 'Three ways to move money',
    features: [
      { level: 'Instant Payout', blurb: 'Get paid in crypto or USD, cash out to your local currency via bank, mobile money, or ACH in minutes.' },
      { level: 'Pay Abroad', blurb: 'Have USDC in Singapore, paying someone in Lagos? They receive NGN automatically. 50+ corridor pairs.' },
      { level: 'Escrow for Hiring', blurb: 'Client funds the job in crypto. Parallax holds it secure until work is done, then one-click release.' },
    ],
  },
  {
    id: 5,
    type: 'tech',
    badge: 'The Tech',
    title: 'Built on Blaaiz',
    features: [
      { icon: <TrendingUp size={18} />, title: 'Real FX Rates', desc: 'Live from Blaaiz API, updated constantly. No guesses, no markups.' },
      { icon: <Check size={18} />, title: 'Transparent Fees', desc: 'See fees before you confirm. Full breakdown, no hidden charges.' },
      { icon: <Zap size={18} />, title: 'Instant Settlement', desc: 'Minutes, not days. Real-time payout tracking.' },
      { icon: <Send size={18} />, title: 'Multi-chain', desc: 'USDC/USDT from Ethereum, BSC, Polygon, Tron, Solana.' },
    ],
  },
  {
    id: 6,
    type: 'market',
    badge: 'Why Now?',
    title: 'The market is ready',
    stats: [
      { num: '300M+', text: 'Freelancers need instant payouts' },
      { num: '$2T+', text: 'In remote salaries with no payment rails' },
      { num: '100M+', text: 'Crypto holders seeking real-world use' },
    ],
  },
  {
    id: 7,
    type: 'cta',
    title: 'Create a payout,',
    highlight: 'see it settle.',
    subtitle: 'Real Blaaiz integration. Real rates. Real global payouts.',
  },
];

export function Pitch() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const progress = ((current + 1) / SLIDES.length) * 100;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current]);

  const go = (delta: number) => {
    setCurrent((prev) => Math.max(0, Math.min(SLIDES.length - 1, prev + delta)));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflow: 'hidden' }}>
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--acc), var(--acc))',
          width: `${progress}%`,
          zIndex: 10,
          transition: 'width 0.4s ease',
        }}
      />

      {/* Navigation zones */}
      <div onClick={() => go(-1)} style={{ position: 'fixed', left: 0, top: 0, width: '20%', height: '100%', cursor: 'pointer', zIndex: 5 }} />
      <div onClick={() => go(1)} style={{ position: 'fixed', right: 0, top: 0, width: '20%', height: '100%', cursor: 'pointer', zIndex: 5 }} />

      {/* Main content */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: EASE }} style={{ maxWidth: '900px', width: '100%' }}>
            {slide.type === 'hero' && (
              <div style={{ textAlign: 'center' }}>
                <StarBorder className="hero-badge">
                  <span className="hero-badge-in">
                    <span className="dot-live" />
                    Built on Blaaiz • Demo Mode
                  </span>
                </StarBorder>

                <h1 className="hero-title" style={{ marginTop: '24px', marginBottom: '16px' }}>
                  {slide.title} <GradientText>{slide.highlight}</GradientText>
                </h1>

                <p className="hero-sub" style={{ marginBottom: '40px' }}>
                  {slide.subtitle}
                </p>

                <div className="row wrap hero-cta">
                  <Magnet>
                    <Link className="btn lg primary glow" to="/send">
                      <GlareHover><span className="row" style={{ gap: 6 }}>Create payout<ArrowRight size={15} /></span></GlareHover>
                    </Link>
                  </Magnet>
                  <Link className="btn lg" to="/explore">View payouts</Link>
                </div>
              </div>
            )}

            {slide.type === 'problem' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <AnimatedContent>
                  <div className="sec">
                    <div>
                      <div className="label" style={{ marginBottom: '12px' }}>
                        <span className="dot-live" style={{ marginRight: '6px' }} />
                        {slide.badge}
                      </div>
                      <h2 className="sec-h">{slide.title}</h2>
                      <p className="muted band-copy">Why crypto payouts are broken for freelancers and teams.</p>
                    </div>
                  </div>
                </AnimatedContent>

                <div className="bento" style={{ marginTop: '40px' }}>
                  {slide.points?.map((point, i) => (
                    <AnimatedContent key={i} className="box w6" delay={i * 0.1}>
                      <span style={{ fontSize: '28px', marginBottom: '12px', display: 'block' }}>{point.icon}</span>
                      <h3>{point.title}</h3>
                      <p>{point.desc}</p>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'solution' && (
              <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                <AnimatedContent>
                  <div className="sec centered-sec">
                    <div>
                      <div className="label" style={{ marginBottom: '12px', justifyContent: 'center' }}>
                        <span className="dot-live" style={{ marginRight: '6px' }} />
                        {slide.badge}
                      </div>
                      <h2 className="sec-h">{slide.title}</h2>
                      <p className="muted">{slide.subtitle}</p>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            )}

            {slide.type === 'features' && 'features' in slide && (
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <AnimatedContent>
                  <div className="sec centered-sec">
                    <div>
                      <div className="label" style={{ marginBottom: '12px', justifyContent: 'center' }}>
                        <span className="dot-live" style={{ marginRight: '6px' }} />
                        {slide.badge}
                      </div>
                      <h2 className="sec-h">{slide.title}</h2>
                    </div>
                  </div>
                </AnimatedContent>

                <div className="bento" style={{ marginTop: '40px' }}>
                  {slide.features?.map((f: any, i: number) => (
                    <AnimatedContent key={i} className="box w2" delay={i * 0.07}>
                      <span className="box-kicker">{f.level}</span>
                      <span className="big-num acc">✓</span>
                      <p>{f.blurb}</p>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'tech' && 'features' in slide && (
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <AnimatedContent>
                  <div className="sec centered-sec">
                    <div>
                      <div className="label" style={{ marginBottom: '12px', justifyContent: 'center' }}>
                        <span className="dot-live" style={{ marginRight: '6px' }} />
                        {slide.badge}
                      </div>
                      <h2 className="sec-h">Built on Blaaiz</h2>
                      <p className="muted">Real infrastructure for real payouts.</p>
                    </div>
                  </div>
                </AnimatedContent>

                <div className="bento" style={{ marginTop: '40px' }}>
                  {slide.features?.map((f: any, i: number) => (
                    <AnimatedContent key={i} className="box w2" delay={i * 0.07}>
                      <span className="box-icon">{f.icon}</span>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'market' && (
              <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                <AnimatedContent>
                  <div className="sec centered-sec">
                    <div>
                      <div className="label" style={{ marginBottom: '12px', justifyContent: 'center' }}>
                        <span className="dot-live" style={{ marginRight: '6px' }} />
                        {slide.badge}
                      </div>
                      <h2 className="sec-h">{slide.title}</h2>
                    </div>
                  </div>
                </AnimatedContent>

                <div className="stats-row" style={{ marginTop: '40px' }}>
                  {slide.stats?.map((stat, i) => (
                    <AnimatedContent key={i} delay={i * 0.1}>
                      <div className="stat">
                        <div className="num" style={{ fontSize: '40px', fontWeight: 800 }}>{stat.num}</div>
                        <div className="label" style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '12px' }}>{stat.text}</div>
                      </div>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'cta' && (
              <div style={{ textAlign: 'center' }}>
                <h1 className="cta-title" style={{ marginBottom: '16px' }}>
                  {slide.title} <GradientText>{slide.highlight}</GradientText>
                </h1>

                <p className="muted" style={{ fontSize: '16px', marginBottom: '40px', maxWidth: '600px', margin: '16px auto 40px' }}>
                  {slide.subtitle}
                </p>

                <div className="row wrap" style={{ justifyContent: 'center', gap: '16px' }}>
                  <Magnet>
                    <Link className="btn lg primary glow" to="/send">
                      <GlareHover><span className="row" style={{ gap: 6 }}>Try Parallax<ArrowRight size={15} /></span></GlareHover>
                    </Link>
                  </Magnet>
                  <Link className="btn lg" to="/">Back home</Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '24px', zIndex: 6 }}>
        <button
          onClick={() => go(-1)}
          style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
        >
          ← Prev
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? 'var(--acc)' : 'var(--border)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
        >
          Next →
        </button>
      </div>

      {/* Counter */}
      <div style={{ position: 'fixed', top: '24px', right: '24px', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.04em', zIndex: 6 }}>
        {current + 1} / {SLIDES.length}
      </div>
    </div>
  );
}
