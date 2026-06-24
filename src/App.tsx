import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import RevShellPanel from './components/RevShellPanel';
import PayloadsPanel from './components/PayloadsPanel';
import EncodersPanel from './components/EncodersPanel';
import { AuthBanner } from './components/ui';

const TABS = [
  { id: 'revshell', label: 'Reverse Shells' },
  { id: 'payloads', label: 'Payloads' },
  { id: 'encoders', label: 'Encoders' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function App() {
  const [tab, setTab] = useState<TabId>('revshell');

  return (
    <div className="relative min-h-screen bg-grid-glow">
      <MatrixRain />
      <div className="relative z-10">
        <TopBar />

        <main className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-6">
          <Hero />
          <AuthBanner />

          <nav className="mb-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-lg px-4 py-1.5 font-display text-sm font-semibold transition ${
                  tab === t.id
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {tab === 'revshell' && <RevShellPanel />}
          {tab === 'payloads' && <PayloadsPanel />}
          {tab === 'encoders' && <EncodersPanel />}
        </main>

        <footer className="border-t border-emerald-500/10 py-6 text-center font-mono text-xs text-slate-600">
          © 2026 Sergio Bernardo
        </footer>
      </div>
    </div>
  );
}
