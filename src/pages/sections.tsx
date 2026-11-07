import { Link } from 'react-router-dom';
import { ArrowRight, GitPullRequest, Send, Wallet } from 'lucide-react';
import { formatMoney, repoName, type Issue, type Repo } from '../lib/model';
import { Avatar, Chip } from '../components/ui';
import { AnimatedContent, BounceCards, CardSwap, InfiniteSpiral, ProfileCard } from '../components/bits';

/** Stacked issue cards that cycle, so the backlog reads as live. */
export function LiveStackSection({ issues, repos }: { issues: Issue[]; repos: Repo[] }) {
  const cards = issues.slice(0, 4).map(issue => {
    const repo = repos.find(r => r.id === issue.repoId);
    return {
      id: issue.id,
      node: (
        <Link className="stack-card" to={`/issue/${issue.id}`}>
          <div className="row">
            <Chip className="solid num">${formatMoney(issue.bounty)}</Chip>
            <Chip>{issue.complexity}</Chip>
            <span className="spacer" />
            <span className="mono dim" style={{ fontSize: 'var(--t2)' }}>#{issue.id}</span>
          </div>
          <h3 className="stack-title">{issue.title}</h3>
          <p className="stack-desc">{issue.description}</p>
          <div className="row stack-foot">
            {repo && <Avatar name={repo.org} org={repo.org} square />}
            <span className="row-sub">{repo ? repoName(repo) : ''}</span>
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
            <h2 className="sec-h">Global payments, live</h2>
            <p className="muted band-copy">
              Send crypto, receive fiat in any currency. Real-time rates powered by Blaaiz.
              Every transaction is transparent, with instant settlement and full escrow protection.
            </p>
            <Link className="btn" to="/explore">Try it now<ArrowRight size={14} /></Link>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <CardSwap cards={cards} />
        </AnimatedContent>
      </div>
    </section>
  );
}

/** Three lifecycle cards that fan out on scroll. */
export function FanSection() {
  const cards = [
    { icon: Send, t: 'Quote', d: 'Get real-time exchange rates with transparent fee breakdown. No surprises.', tone: 'a' },
    { icon: GitPullRequest, t: 'Confirm', d: 'Review the details and submit. Payout is created in seconds with a trackable reference.', tone: 'b' },
    { icon: Wallet, t: 'Settle', d: `Funds settle instantly. Escrow protection available for contracts and hiring.`, tone: 'c' },
  ];
  return (
    <section className="band alt">
      <div className="band-inner">
        <AnimatedContent>
          <div className="sec centered-sec">
            <div>
              <h2>Three moves, quote to settled</h2>
              <p>Real-time rates, instant settlement, full transparency powered by Blaaiz.</p>
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

/** Payment corridors and supported methods. */
export function SpiralSection() {
  const items = [
    { name: 'USDC', icon: '₿', desc: 'Crypto' },
    { name: 'USDT', icon: '✦', desc: 'Crypto' },
    { name: 'USD', icon: '$', desc: 'Bank' },
    { name: 'EUR', icon: '€', desc: 'Bank' },
    { name: 'NGN', icon: '₦', desc: 'Mobile' },
    { name: 'GHS', icon: '₵', desc: 'Mobile' },
    { name: 'KES', icon: 'KES', desc: 'Mobile' },
    { name: 'ZAR', icon: 'R', desc: 'Bank' },
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
          <InfiniteSpiral items={items} />
        </AnimatedContent>
        <AnimatedContent>
          <div>
            <h2 className="sec-h">50+ currencies, instant settlement</h2>
            <p className="muted band-copy">
              Send crypto on any chain, receive fiat in your local currency. Supported across
              multiple blockchains with transparent rates and instant settlement powered by Blaaiz.
            </p>
            <Link className="btn" to="/explore">Try it now<ArrowRight size={14} /></Link>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

/** Sample features. */
export function TeamSection() {
  const team = [
    { name: 'Instant Payout', role: 'Get paid in crypto', handle: 'USDC/USDT', org: 'Crypto', stat: 'Minutes' },
    { name: 'Pay Abroad', role: 'Send across borders', handle: 'Any currency', org: 'Global', stat: '50+ pairs' },
    { name: 'Escrow Safe', role: 'Hold funds securely', handle: 'Conditional release', org: 'Smart', stat: 'One-click' },
    { name: 'Verified Rates', role: 'Real-time FX rates', handle: 'Transparent fees', org: 'Blaaiz', stat: 'No markup' },
  ];

  return (
    <section className="band alt">
      <div className="band-inner">
        <AnimatedContent>
          <div className="sec centered-sec">
            <div>
              <h2>Features built for you</h2>
              <p>Transparent, instant, and secure global payments powered by Blaaiz.</p>
            </div>
          </div>
        </AnimatedContent>
        <div className="grid c4 team-grid">
          {team.map((m, i) => (
            <AnimatedContent key={m.handle} delay={i * 0.07}>
              <ProfileCard
                name={m.name}
                role={m.role}
                handle={m.handle}
                stat={m.stat}
                avatar={<Avatar name={m.name} org={m.org} square />}
              />
            </AnimatedContent>
          ))}
        </div>
        <p className="hint team-note">
          Sample contributors for this preview — not real people.
        </p>
      </div>
    </section>
  );
}
