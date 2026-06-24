import { useState } from 'react';
import { LISTENERS, REV_SHELLS } from '../lib/revshells';
import { CopyRow, Section } from './ui';

export default function RevShellPanel() {
  const [host, setHost] = useState('10.0.0.1');
  const [port, setPort] = useState('4444');

  return (
    <div className="space-y-4">
      <Section title="Parâmetros">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">LHOST (seu IP)</span>
            <input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              spellCheck={false}
              className="w-full rounded-lg border border-emerald-500/20 bg-black/50 px-3 py-2 font-mono text-sm text-emerald-200 outline-none focus:border-emerald-400/50"
            />
          </label>
          <label className="block">
            <span className="field-label">LPORT</span>
            <input
              value={port}
              onChange={(e) => setPort(e.target.value)}
              spellCheck={false}
              className="w-full rounded-lg border border-emerald-500/20 bg-black/50 px-3 py-2 font-mono text-sm text-emerald-200 outline-none focus:border-emerald-400/50"
            />
          </label>
        </div>
      </Section>

      <Section title="Listener (na sua máquina)">
        <div className="space-y-2">
          {LISTENERS.map((l) => (
            <CopyRow key={l.name} label={l.name} value={l.build(port)} />
          ))}
        </div>
      </Section>

      <Section title="Reverse shells">
        <div className="space-y-2">
          {REV_SHELLS.map((shell) => (
            <CopyRow key={shell.name} label={`${shell.name} · ${shell.tag}`} value={shell.build(host, port)} />
          ))}
        </div>
      </Section>
    </div>
  );
}
