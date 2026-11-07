import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight, Menu, Moon, Sun, X,
} from 'lucide-react';
import { Provider } from './lib/store';
import { Brand, EASE } from './components/ui';
import { GooeyNav } from './components/bits';
import { Landing } from './pages/landing';
import { Explore } from './pages/explore';

/* ------------------------------------------------------------------ theme */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('parallax-theme') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('parallax-theme', theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, setTheme] as const;
}

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  return (
    <button
      className="btn ghost icon sm"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -50, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.24, ease: EASE }}
        style={{ display: 'grid', placeItems: 'center' }}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </motion.span>
    </button>
  );
}

/* ------------------------------------------------------- public top-nav shell */

// Routes remount the public shell on every navigation, so the dismissal lives
// outside component state to survive the remount.
let announceDismissed = false;

function AnnounceBar() {
  const [open, setOpen] = useState(!announceDismissed);
  if (!open) return null;
  const dismiss = () => { announceDismissed = true; setOpen(false); };
  return (
    <div className="announce">
      <Link className="announce-in" to="/explore">
        <span className="announce-tag">Demo</span>
        <span className="announce-text">
          Horizon Cash: Move money anywhere on Earth, powered by Blaaiz
        </span>
        <ArrowRight size={12} />
      </Link>
      <button className="announce-x" aria-label="Dismiss announcement" onClick={dismiss}>
        <X size={13} />
      </button>
    </div>
  );
}

function PublicShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [lifted, setLifted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMenu(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The announcement bar is dismissible, so the header height is measured
  // rather than hard-coded; the hero fills whatever is left of the viewport.
  useEffect(() => {
    const el = topRef.current;
    if (!el) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty('--top-h', `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => { ro.disconnect(); root.style.removeProperty('--top-h'); };
  }, []);

  const nav = [
    { to: '/explore', label: 'Try it', end: true },
    { to: '/explore/repos', label: 'Features' },
    { to: '/explore/orgs', label: 'How it works' },
  ];

  return (
    <div className="public">
      <div className="public-top" ref={topRef}>
      <AnnounceBar />
      <div className="navpill-wrap">
        <header className={lifted ? 'navpill lifted' : 'navpill'}>
          <Brand />
          <div className="navpill-nav"><GooeyNav items={nav} /></div>
          <div className="navpill-right">
            <ThemeToggle />
            <button className="btn ghost icon sm navpill-burger" aria-label="Open menu" onClick={() => setMenu(m => !m)}>
              {menu ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {menu && (
            <motion.nav
              className="navpill-sheet"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <div className="navpill-sheet-in">
                {nav.map(n => (
                  <NavLink key={n.to} to={n.to} end={n.end}
                    className={({ isActive }) => (isActive ? 'on' : '')}>
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      </div>
      {children}
    </div>
  );
}



/* --------------------------------------------------------------------- app */

function Routed() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // ⌘K / "/" jumps to explore search from anywhere public.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? '');
      if (!typing && ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/')) {
        e.preventDefault();
        navigate('/explore?focus=1');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PublicShell><Landing /></PublicShell>} />
      <Route path="/explore" element={<PublicShell><Explore tab="issues" /></PublicShell>} />
      <Route path="/explore/repos" element={<PublicShell><Explore tab="repos" /></PublicShell>} />
      <Route path="/explore/orgs" element={<PublicShell><Explore tab="orgs" /></PublicShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider>
      <a className="skip" href="#main">Skip to content</a>
      <Routed />
    </Provider>
  );
}
