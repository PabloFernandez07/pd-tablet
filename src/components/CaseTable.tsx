import { CaseFile } from '../types';

interface Props {
  cases: CaseFile[];
  onToggle: (id: string) => void;
}

const statusTone: Record<CaseFile['status'], string> = {
  Pendiente: 'bg-amber-500/15 text-amber-100 border-amber-500/40',
  'En curso': 'bg-blue-500/15 text-blue-100 border-blue-500/40',
  Cerrado: 'bg-emerald-500/15 text-emerald-100 border-emerald-500/40'
};

const priorityTone: Record<CaseFile['priority'], string> = {
  Alta: 'text-red-300',
  Media: 'text-amber-200',
  Baja: 'text-emerald-200'
};

export function CaseTable({ cases, onToggle }: Props): JSX.Element {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden">
      <div className="border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">Expedientes</p>
          <p className="text-sm text-white/80">Seguimiento consolidado</p>
        </div>
        <span className="text-xs text-white/50">Actualizado en tiempo real</span>
      </div>
      <div className="divide-y divide-white/5">
        {cases.map((caseFile) => (
          <article key={caseFile.id} className="px-4 py-3 hover:bg-slate-900/60 transition">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs text-white/50">{caseFile.id}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${priorityTone[caseFile.priority]}`}>
                    {caseFile.priority}
                  </span>
                  <p className="text-base font-semibold text-white">{caseFile.title}</p>
                </div>
                <p className="text-sm text-white/70 max-w-3xl">{caseFile.summary}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="rounded-full border border-white/10 px-2 py-0.5">{caseFile.updatedAt}</span>
                  {caseFile.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`text-xs px-2 py-1 rounded-full border ${statusTone[caseFile.status]}`}>
                  {caseFile.status}
                </div>
                <p className="text-xs text-white/60">Asignado a {caseFile.assignedTo.join(', ')}</p>
                <button
                  onClick={() => onToggle(caseFile.id)}
                  className="text-xs rounded-lg border border-white/15 px-3 py-1.5 text-white/80 hover:border-brand-400 hover:text-white transition"
                >
                  {caseFile.status === 'Cerrado' ? 'Reabrir' : 'Cerrar caso'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
