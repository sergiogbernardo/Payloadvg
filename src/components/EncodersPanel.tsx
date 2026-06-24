import { useState } from 'react';
import { ENCODERS } from '../lib/encoders';
import { CopyRow, Section } from './ui';

export default function EncodersPanel() {
  const [input, setInput] = useState("<script>alert(1)</script>");

  return (
    <div className="space-y-4">
      <Section title="Entrada">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          spellCheck={false}
          placeholder="cole um payload para codificar…"
          className="w-full resize-y rounded-lg border border-emerald-500/20 bg-black/50 px-3 py-2 font-mono text-sm text-emerald-200 outline-none focus:border-emerald-400/50"
        />
        <p className="mt-2 font-mono text-xs text-slate-500">
          Codificação aplicada ao vivo, no navegador.
        </p>
      </Section>

      {input && (
        <Section title="Codificações">
          <div className="space-y-2">
            {ENCODERS.map((encoder) => (
              <CopyRow key={encoder.id} label={encoder.name} value={encoder.apply(input)} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
