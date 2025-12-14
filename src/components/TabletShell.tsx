import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TabletShell({ children }: Props): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-4 rounded-[32px] bg-gradient-to-br from-brand-600/70 to-indigo-900 blur-3xl opacity-60" />
        <div className="relative rounded-[28px] bg-slate-900/80 backdrop-blur-xl shadow-tablet ring-1 ring-white/10 overflow-hidden">
          <div className="border-b border-white/10 bg-slate-900/40 px-8 py-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-100">Departamento de Policía</p>
              <h1 className="text-2xl font-bold text-white">Tablet Operativa</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Sesión segura
            </div>
          </div>
          <div className="p-8 bg-slate-950/40">{children}</div>
        </div>
      </div>
    </div>
  );
}
