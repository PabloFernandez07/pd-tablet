import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TabletShell({ children }: Props): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-slate-950 text-slate-100">
      <div className="relative w-full max-w-7xl">
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-brand-600/30 via-indigo-900/40 to-slate-900 blur-3xl opacity-60" />
        <div className="absolute -top-10 -left-6 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-14 -right-10 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative rounded-[28px] bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-950/95 backdrop-blur-2xl shadow-tablet ring-1 ring-white/10 overflow-hidden">
          <div className="border-b border-white/10 bg-white/5 px-8 py-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-100">Centro de mando · PD</p>
              <h1 className="text-2xl font-bold text-white">Suite operativa</h1>
              <p className="text-sm text-white/60">Control, seguimiento y respuesta en una sola vista</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Red segura
            </div>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
