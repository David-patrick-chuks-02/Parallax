import { Link } from 'react-router-dom';
import { ArrowRight, Send, TrendingUp, Zap } from 'lucide-react';
import { formatMoney, type Payout } from '../lib/model';
import { Chip } from '../components/ui';
import { AnimatedContent, BounceCards, CardSwap } from '../components/bits';

export function LiveStackSection({ payouts }: { payouts: Payout[] }) {
  const cards = payouts.slice(0, 4).map(payout => {
    return {
      id: payout.id,
      node: (
        <Link className="stack-card" to={`/payout/${payout.id}`}>
          <div className="row">
            <Chip className="solid num">${formatMoney(payout.amount)}</Chip>
            <Chip>{payout.status}</Chip>
            <span className="spacer" />
            <span className="mono dim" style={{ fontSize: 'var(--t2)' }}>#{payout.id}</span>
          </div>
          <h3 className="stack-title">{payout.fromCurrency} → {payout.toCurrency}</h3>
          <p className="stack-desc">Recipient: {payout.recipient} • Rate: {payout.rate}</p>
          <div className="row stack-foot">
            <span className="row-sub">Receive: ${formatMoney(payout.receiveAmount)}</span>
            <span className="spacer" />
            <ArrowRight size={13} className="dim" />
          </div>
        </Link>
      ),
    };
  });

  return (
    <section className="band">
      <div className="band-inner split-wide">
        <AnimatedContent>
          <div>
            <h2 className="sec-h">Recent payouts</h2>
            <p className="muted band-copy">
              Real-time payout tracking powered by Blaaiz. See live rates, fees, and settlement status.
            </p>
            <Link className="btn" to="/explore">Create payout<ArrowRight size={14} /></Link>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <CardSwap cards={cards} />
        </AnimatedContent>
      </div>
    </section>
  );
}

export function FanSection() {
  const cards = [
    { icon: Send, t: 'Enter amount', d: 'Specify how much you want to send and to which country.', tone: 'a' },
    { icon: TrendingUp, t: 'See rates', d: 'Get real-time exchange rates and transparent fee breakdown from Blaaiz.', tone: 'b' },
    { icon: Zap, t: 'Confirm & settle', d: 'Approve the payout and track it until it arrives in the recipient\'s account.', tone: 'c' },
  ];
  return (
    <section className="band alt">
      <div className="band-inner">
        <AnimatedContent>
          <div className="sec centered-sec">
            <div>
              <h2>Three steps, instant clarity</h2>
              <p>Know exactly what your payout costs and when it arrives.</p>
            </div>
          </div>
        </AnimatedContent>
        <BounceCards>
          {cards.map(c => (
            <div className={`fan-card tone-${c.tone}`} key={c.t}>
              <span className="fan-icon"><c.icon size={18} /></span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </BounceCards>
      </div>
    </section>
  );
}

export function SpiralSection() {
  const items = [
    { name: 'USDC', icon: '₿', desc: 'Send' },
    { name: 'USDT', icon: '✦', desc: 'Send' },
    { name: 'USD', icon: '$', desc: 'Receive' },
    { name: 'EUR', icon: '€', desc: 'Receive' },
    { name: 'NGN', icon: '₦', desc: 'Receive' },
    { name: 'GHS', icon: '₵', desc: 'Receive' },
    { name: 'KES', icon: 'KES', desc: 'Receive' },
    { name: 'ZAR', icon: 'R', desc: 'Receive' },
  ].map(item => (
    <div className="spiral-chip" key={item.name}>
      <div style={{ width: '32px', height: '32px', background: 'var(--acc-soft)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>{item.icon}</div>
      <span className="col" style={{ gap: 0, minWidth: 0 }}>
        <span className="row-title">{item.name}</span>
        <span className="row-sub">{item.desc}</span>
      </span>
    </div>
  ));

  return (
    <section className="band">
      <div className="band-inner split-wide">
        <AnimatedContent delay={0.05}>
          {/* Using simple grid instead of spiral for payout currencies */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '400px' }}>
            {items}
          </div>
        </AnimatedContent>
        <AnimatedContent>
          <div>
            <h2 className="sec-h">50+ corridors</h2>
            <p className="muted band-copy">
              Send crypto on any chain, receive fiat in your local currency.
              Real rates, transparent fees, instant settlement.
            </p>
            <Link className="btn" to="/explore">Start a payout<ArrowRight size={14} /></Link>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

export function TeamSection() {
  const features = [
    { name: 'Real FX Rates', role: 'Live from Blaaiz', handle: 'No guessing', org: 'API', stat: 'Real-time' },
    { name: 'Transparent Fees', role: 'See before confirm', handle: 'No surprises', org: 'Clear', stat: 'Upfront' },
    { name: 'Instant Settlement', role: 'Minutes, not days', handle: 'Fast payout', org: 'Speed', stat: 'Quick' },
    { name: 'Multi-chain', role: 'Any major network', handle: 'Flexible send', org: 'Crypto', stat: 'Anywhere' },
  ];

  const ProfileCard = ({ name, role, handle, org, stat }: typeof features[0]) => (
    <div style={{
      border: '1px solid var(--border)',
      background: 'var(--card)',
      borderRadius: '20px',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: 'var(--acc-soft)',
        borderRadius: '50%',
        margin: '0 auto 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
      }}>
        {name.charAt(0)}
      </div>
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{name}</div>
      <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>{role}</div>
      <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>{handle}</div>
      <div style={{ fontSize: '12px', color: 'var(--acc)', fontWeight: 600 }}>{stat}</div>
    </div>
  );

  return (
    <section className="band alt">
      <div className="band-inner">
        <AnimatedContent>
          <div className="sec centered-sec">
            <div>
              <h2>Built on Blaaiz</h2>
              <p>Real infrastructure for real payouts.</p>
            </div>
          </div>
        </AnimatedContent>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          maxWidth: '900px',
          margin: '40px auto 0',
        }}>
          {features.map(f => <ProfileCard key={f.name} {...f} />)}
        </div>
      </div>
    </section>
  );
}
