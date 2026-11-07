import { useState, useEffect } from 'react';

// Parallax brand colors - Purple & Black
const COLORS = {
  accent: '#a78bfa',
  bg: '#09090b',
  card: 'rgba(255,255,255,.04)',
  border: 'rgba(255,255,255,.1)',
  text: '#fafafa',
  muted: '#a1a1aa',
};

const SLIDES = [
  {
    id: 1,
    type: 'hero',
    title: 'Move money,',
    highlight: 'anywhere.',
    subtitle: 'Send crypto, get real FX rates, receive fiat instantly.',
    meta: 'Parallax • Powered by Blaaiz',
  },
  {
    id: 2,
    type: 'problem',
    title: 'The Problem',
    points: [
      '💸 Freelancers lose 5-10% converting crypto to local currency',
      '🌍 International hiring has no trustless escrow',
      '⏳ Cross-border payments take days, not minutes',
    ],
  },
  {
    id: 3,
    type: 'solution',
    title: 'The Solution',
    feature: 'Parallax',
    points: [
      'Real-time FX rates from Blaaiz',
      'Multi-chain USDC/USDT support',
      '50+ currency pairs',
      'Transparent fees, instant settlement',
    ],
  },
  {
    id: 4,
    type: 'features',
    title: 'Three Real Flows',
    features: [
      { icon: '💰', title: 'Instant Payout', desc: 'Get paid in crypto, withdraw in your local currency' },
      { icon: '🌐', title: 'Pay Abroad', desc: 'Send USDC, recipient gets their currency automatically' },
      { icon: '🔐', title: 'Escrow Hiring', desc: 'Secure payments until work is confirmed' },
    ],
  },
  {
    id: 5,
    type: 'tech',
    title: 'Built on Blaaiz',
    points: [
      'Live FX Rates • No guesses, no markups',
      'Transparent Fees • Shown before you confirm',
      'Instant Settlement • Minutes, not days',
      'Multi-chain • Ethereum, BSC, Polygon, Tron, Solana',
    ],
  },
  {
    id: 6,
    type: 'market',
    title: 'Why Now?',
    stats: [
      { num: '300M+', text: 'Freelancers need instant payouts' },
      { num: '$2T+', text: 'In remote salaries with no payment rails' },
      { num: '100M+', text: 'Crypto holders wanting real-world use' },
    ],
  },
  {
    id: 7,
    type: 'cta',
    title: 'Ready to move money?',
    subtitle: 'Real Blaaiz integration. Real rates. Real global payouts.',
    cta: 'Try Parallax',
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

  const renderSlide = () => {
    switch (slide.type) {
      case 'hero':
        return (
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: COLORS.accent,
                  borderRadius: '16px',
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  fontWeight: 800,
                  color: COLORS.bg,
                }}
              >
                P
              </div>
            </div>
            <h1 style={{ fontSize: '64px', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              {slide.title} <span style={{ color: COLORS.accent }}>{slide.highlight}</span>
            </h1>
            <p style={{ fontSize: '18px', color: COLORS.muted, margin: '0 0 32px', lineHeight: 1.6 }}>
              {slide.subtitle}
            </p>
            <p style={{ fontSize: '14px', color: COLORS.muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {slide.meta}
            </p>
          </div>
        );

      case 'problem':
        return (
          <div style={{ maxWidth: '700px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '40px' }}>{slide.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {slide.points?.map((point, i) => (
                <div key={i} style={{ fontSize: '18px', color: COLORS.text, lineHeight: 1.6 }}>
                  {point}
                </div>
              ))}
            </div>
          </div>
        );

      case 'solution':
        return (
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px' }}>{slide.title}</h2>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 800,
                color: COLORS.accent,
                marginBottom: '40px',
              }}
            >
              {slide.feature}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {slide.points?.map((point, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px',
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              {slide.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {slide.features?.map((feature, i) => (
                <div key={i} style={{ padding: '24px', background: COLORS.card, borderRadius: '16px', border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: COLORS.accent }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: COLORS.muted, margin: 0 }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tech':
        return (
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '40px' }}>{slide.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slide.points?.map((point, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px',
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        );

      case 'market':
        return (
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '40px' }}>{slide.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {slide.stats?.map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: COLORS.accent, marginBottom: '8px' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '16px', color: COLORS.muted }}>{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>{slide.title}</h2>
            <p style={{ fontSize: '16px', color: COLORS.muted, marginBottom: '40px', lineHeight: 1.6 }}>
              {slide.subtitle}
            </p>
            <a
              href="/send"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: COLORS.accent,
                color: COLORS.bg,
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {slide.cta} →
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
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
      <div style={{ maxWidth: '900px', width: '100%', animation: 'fadeIn 0.4s ease' }}>
        {renderSlide()}
      </div>

      {/* Navigation */}
      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          zIndex: 6,
        }}
      >
        <button
          onClick={() => go(-1)}
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text,
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          ←
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? COLORS.accent : COLORS.border,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text,
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          →
        </button>
      </div>

      {/* Counter */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          fontSize: '14px',
          color: COLORS.muted,
          zIndex: 6,
        }}
      >
        {current + 1} / {SLIDES.length}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
