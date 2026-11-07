import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Parallax theme colors - Purple & Black only
const COLORS = {
  accent: '#a78bfa',     // Purple/Violet accent
  bg: '#09090b',         // Pure black background
  card: 'rgba(255,255,255,.04)',
  border: 'rgba(255,255,255,.1)',
  text: '#fafafa',       // White text
  muted: '#a1a1aa',      // Gray text
};

const SLIDES = [
  {
    id: 1,
    title: 'Move money,',
    titleGradient: 'anywhere.',
    subtitle: 'Instant crypto payouts, international transfers, and escrow protection for freelancers, remote teams, and global hiring. Real-time FX rates. No hidden fees.',
    byline: 'Powered by Blaaiz · Global Payments Platform',
    showLogo: true,
  },
  {
    id: 2,
    label: 'The problem',
    title: `Alex is a developer in Brazil.\nHer client in Berlin just paid her`,
    highlight: '1000 USDC.',
    subtitle: 'Now she needs that in Brazilian real. She bounces between exchanges, payment apps, and banks — losing money at every step with no idea what rate she\'ll actually get.',
    points: [
      { num: '01', title: 'Crypto has no clean off-ramp', desc: 'Exchanges charge 2-5%, have high minimums, and are slow. It\'s worse in emerging markets.' },
      { num: '02', title: 'International hiring has no escrow', desc: 'Clients and contractors have no trustless way to secure payments — it\'s all faith or expensive intermediaries.' },
    ],
  },
  {
    id: 3,
    label: 'The solution',
    title: 'Parallax, powered by Blaaiz',
    subtitle: `Real infrastructure for real payouts.\n\nSend USDC/USDT from any chain. Receiver gets fiat instantly in 50+ currencies. Live FX rates. Transparent fees. Escrow protection.`,
  },
  {
    id: 4,
    label: 'Three use cases',
    title: 'Three real flows',
    cases: [
      { title: 'Instant Payout', desc: 'Get paid for work in crypto or USD, cash out to your local currency via bank, mobile money, or ACH in minutes.' },
      { title: 'Pay Abroad', desc: 'Have USDC in Singapore, paying someone in Lagos? They receive NGN automatically. 50+ corridor pairs.' },
      { title: 'Escrow for Hiring', desc: 'Client funds the job in crypto. Parallax holds it secure until work is done, then one-click release.' },
    ],
  },
  {
    id: 5,
    label: 'The tech',
    title: 'Built on real infrastructure',
    tech: [
      { title: 'Real FX Rates', desc: 'Live from Blaaiz API, updated constantly. No guesses, no markups.' },
      { title: 'Transparent Fees', desc: 'See fees before you confirm. Full breakdown, no hidden charges.' },
      { title: 'Multi-chain', desc: 'Send USDC/USDT from Ethereum, BSC, Polygon, Tron, Solana.' },
      { title: 'Instant Settlement', desc: 'Settlement in minutes to bank, mobile money, or ACH.' },
    ],
  },
  {
    id: 6,
    label: 'Market opportunity',
    title: 'Why now?',
    subtitle: `Global creator economy: 300M+ freelancers need instant payouts.\nCross-border hiring: $2T+ in remote salaries with no good payment rails.\nCrypto adoption: 100M+ holders looking for real-world use cases.\n\nParallax solves all three.`,
  },
  {
    id: 7,
    label: 'Ready to demo',
    title: 'Create a payout,',
    titleEnd: 'see it settle.',
    subtitle: 'Real Blaaiz integration. Real rates. Real global payouts.',
    cta: 'Try Parallax →',
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
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a0f2e 100%)`,
        color: COLORS.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: COLORS.accent,
          width: `${progress}%`,
          zIndex: 10,
          transition: 'width 0.4s ease',
        }}
      />

      {/* Navigation zones */}
      <div
        onClick={() => go(-1)}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '20%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 5,
        }}
      />
      <div
        onClick={() => go(1)}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '20%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 5,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          textAlign: 'center',
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Logo mark */}
        {slide.showLogo && (
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '28%',
              background: COLORS.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              boxShadow: '0 20px 60px -20px rgba(168,85,247,.6)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: '52px', height: '52px' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        )}

        {/* Eyebrow label */}
        {slide.label && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: COLORS.muted,
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              padding: '7px 16px',
              borderRadius: '999px',
              marginBottom: '36px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '999px',
                background: COLORS.accent,
              }}
            />
            {slide.label}
          </div>
        )}

        {/* Title */}
        {slide.title && (
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              margin: '0 0 24px',
              maxWidth: '980px',
            }}
          >
            {slide.title}
            {slide.titleGradient && (
              <>
                {' '}
                <span
                  style={{
                    background: COLORS.accent,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {slide.titleGradient}
                </span>
              </>
            )}
            {slide.highlight && (
              <>
                {' '}
                <span
                  style={{
                    background: COLORS.accent,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {slide.highlight}
                </span>
              </>
            )}
            {slide.titleEnd && (
              <>
                {' '}
                <span
                  style={{
                    background: COLORS.accent,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {slide.titleEnd}
                </span>
              </>
            )}
          </h1>
        )}

        {/* Subtitle / Description */}
        {slide.subtitle && (
          <p
            style={{
              fontSize: '23px',
              color: COLORS.muted,
              lineHeight: 1.55,
              margin: '0 auto 24px',
              maxWidth: '760px',
              whiteSpace: 'pre-line',
            }}
          >
            {slide.subtitle}
          </p>
        )}

        {/* Points / Cases */}
        {slide.points && (
          <div style={{ marginTop: '24px', maxWidth: '760px' }}>
            {slide.points.map((point) => (
              <div
                key={point.num}
                style={{
                  display: 'flex',
                  gap: '14px',
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.card,
                  borderRadius: '16px',
                  padding: '18px 22px',
                  marginBottom: '16px',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: COLORS.accent, flexShrink: 0 }}>{point.num}</span>
                <div>
                  <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: '16.5px' }}>{point.title}</p>
                  <p style={{ margin: 0, color: '#a1a1aa', fontSize: '14.5px', lineHeight: 1.45 }}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cases */}
        {slide.cases && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '44px', maxWidth: '920px' }}>
            {slide.cases.map((c) => (
              <div
                key={c.title}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.card,
                  borderRadius: '22px',
                  padding: '26px',
                  textAlign: 'left',
                }}
              >
                <h3 style={{ fontSize: '18px', margin: '0 0 6px', fontWeight: 650 }}>{c.title}</h3>
                <p style={{ fontSize: '14.5px', color: '#a1a1aa', margin: 0, lineHeight: 1.45 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech grid */}
        {slide.tech && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '44px', maxWidth: '800px' }}>
            {slide.tech.map((t) => (
              <div
                key={t.title}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.card,
                  borderRadius: '20px',
                  padding: '24px',
                  textAlign: 'left',
                }}
              >
                <h3 style={{ fontSize: '18px', margin: '0 0 8px', fontWeight: 650 }}>{t.title}</h3>
                <p style={{ fontSize: '14.5px', color: '#a1a1aa', margin: 0, lineHeight: 1.45 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {slide.cta && (
          <div style={{ marginTop: '32px' }}>
            <a
              href="/explore"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: COLORS.accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              {slide.cta}
            </a>
          </div>
        )}

        {/* Byline */}
        {slide.byline && <p style={{ marginTop: '28px', fontSize: '14px', color: '#a1a1aa', margin: '28px 0 0' }}>{slide.byline}</p>}
      </div>

      {/* Counter */}
      <div
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '28px',
          fontSize: '12px',
          color: COLORS.muted,
          letterSpacing: '.04em',
          zIndex: 6,
        }}
      >
        {current + 1} / {SLIDES.length}
      </div>

      {/* Dots */}
      <div
        style={{
          position: 'fixed',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '7px',
          zIndex: 6,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '999px',
              background: i === current ? COLORS.text : 'rgba(255,255,255,.18)',
              border: 'none',
              cursor: 'pointer',
              transform: i === current ? 'scale(1.3)' : 'scale(1)',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Mobile nav buttons */}
      <button
        onClick={() => go(-1)}
        style={{
          position: 'fixed',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: COLORS.border,
          border: `1px solid ${COLORS.border}`,
          color: 'white',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 6,
        }}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => go(1)}
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: COLORS.border,
          border: `1px solid ${COLORS.border}`,
          color: 'white',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 6,
        }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
