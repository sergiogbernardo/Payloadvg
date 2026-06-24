import type { ReactNode } from 'react';
import CopyButton from './CopyButton';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="panel">
      <p className="panel-title mb-3">{title}</p>
      {children}
    </div>
  );
}

export function CopyRow({ label, value }: { label?: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/15 bg-black/40 p-2.5">
      <div className="min-w-0">
        {label && (
          <p className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
            {label}
          </p>
        )}
        <code className="block break-all font-mono text-xs text-emerald-200">{value}</code>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export function AuthBanner() {
  return (
    <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
      <strong className="font-semibold">Uso autorizado apenas.</strong> Estes payloads são material
      público de cheatsheet, para testes de intrusão com autorização, CTFs e estudo. Usar contra
      sistemas sem permissão é ilegal.
    </div>
  );
}
