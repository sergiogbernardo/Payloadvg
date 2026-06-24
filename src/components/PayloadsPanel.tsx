import { useMemo, useState } from 'react';
import { CATEGORIES } from '../lib/payloads';
import { CopyRow, Section } from './ui';

export default function PayloadsPanel() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  // When searching, match across every category; otherwise show the active one.
  const visible = useMemo(() => {
    if (!q) return CATEGORIES.filter((c) => c.id === active);
    return CATEGORIES.map((c) => ({
      ...c,
      payloads: c.payloads.filter(
        (p) => p.title.toLowerCase().includes(q) || p.value.toLowerCase().includes(q),
      ),
    })).filter((c) => c.payloads.length > 0);
  }, [q, active]);

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="buscar payload por nome ou conteúdo…"
        spellCheck={false}
        className="w-full rounded-lg border border-emerald-500/20 bg-black/50 px-3 py-2 font-mono text-sm text-emerald-200 outline-none focus:border-emerald-400/50"
      />

      {!q && (
        <nav className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={`rounded-lg px-3 py-1 font-mono text-xs uppercase tracking-wider transition ${
                active === c.id
                  ? 'bg-emerald-400/15 text-emerald-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {c.name}
            </button>
          ))}
        </nav>
      )}

      {visible.length === 0 && (
        <p className="panel font-mono text-xs text-slate-500">nenhum payload encontrado.</p>
      )}

      {visible.map((category) => (
        <Section key={category.id} title={category.name}>
          <p className="mb-3 text-sm text-slate-400">{category.description}</p>
          <div className="space-y-2">
            {category.payloads.map((p) => (
              <CopyRow key={p.title} label={p.title} value={p.value} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
