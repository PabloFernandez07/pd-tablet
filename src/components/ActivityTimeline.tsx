import { TimelineEvent } from '../types';

const tones: Record<TimelineEvent['tone'], string> = {
  info: 'border-blue-400/40 text-blue-100',
  warning: 'border-amber-400/40 text-amber-100',
  danger: 'border-red-400/40 text-red-100',
  success: 'border-emerald-400/40 text-emerald-100'
};

interface Props {
  events: TimelineEvent[];
}

export function ActivityTimeline({ events }: Props): JSX.Element {
  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Actividad</p>
          <p className="text-sm text-white/80">Novedades recientes</p>
        </div>
        <span className="text-xs text-white/60">Auditado</span>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {events.map((event) => (
          <div key={event.id} className="flex gap-3 items-start">
            <div className="flex flex-col items-center">
              <span className="text-xs text-white/60">{event.time}</span>
              <span className="w-px flex-1 bg-white/10" />
            </div>
            <div className={`flex-1 rounded-xl border px-3 py-2 bg-slate-950/60 ${tones[event.tone]}`}>
              <p className="text-xs uppercase tracking-wide text-white/70">{event.label}</p>
              <p className="text-sm text-white">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
