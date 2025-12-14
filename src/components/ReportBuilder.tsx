import { Charge, Citizen } from '../types';

interface Props {
  citizen?: Citizen;
  charges: Charge[];
  notes: string;
  onNotesChange: (value: string) => void;
  onRemoveCharge: (code: string) => void;
  onFinalize: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export function ReportBuilder({ citizen, charges, notes, onNotesChange, onRemoveCharge, onFinalize }: Props): JSX.Element {
  const totals = charges.reduce(
    (acc, charge) => {
      return {
        fine: acc.fine + charge.fine,
        time: acc.time + charge.time,
        points: acc.points + (charge.points ?? 0)
      };
    },
    { fine: 0, time: 0, points: 0 }
  );

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Reporte activo</p>
          <p className="text-sm text-white/80">Resumen en tiempo real para el oficial</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/70">
          <span className="rounded-full border border-white/10 px-2 py-1">Multa total {formatCurrency(totals.fine)}</span>
          <span className="rounded-full border border-white/10 px-2 py-1">Tiempo {totals.time} min</span>
          {totals.points > 0 && (
            <span className="rounded-full border border-white/10 px-2 py-1">Puntos {totals.points}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-slate-950/60 border border-white/5 rounded-xl p-3 space-y-2">
          <p className="text-xs text-white/60">Ciudadano asociado</p>
          {citizen ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{citizen.name}</p>
                <span className="text-[11px] text-white/60">{citizen.id}</span>
              </div>
              <p className="text-xs text-white/60">{citizen.status}</p>
              <p className="text-xs text-white/70">{citizen.notes}</p>
            </div>
          ) : (
            <p className="text-sm text-white/60">Selecciona un ciudadano en el panel lateral.</p>
          )}
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 border border-white/5 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/60">Cargos agregados</p>
            <span className="text-[11px] text-white/60">{charges.length} seleccionados</span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {charges.map((charge) => (
              <div key={charge.code} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 px-3 py-2">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{charge.title}</p>
                  <p className="text-xs text-white/60">{charge.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-white/70">
                    <span className="rounded border border-white/10 px-2 py-0.5">{charge.code}</span>
                    <span className="rounded border border-white/10 px-2 py-0.5">{charge.class}</span>
                    <span className="rounded border border-white/10 px-2 py-0.5">{formatCurrency(charge.fine)}</span>
                    <span className="rounded border border-white/10 px-2 py-0.5">{charge.time} min</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveCharge(charge.code)}
                  className="text-[11px] rounded-lg border border-white/15 px-2 py-1 text-white/80 hover:border-red-400 hover:text-red-200 transition"
                >
                  Quitar
                </button>
              </div>
            ))}
            {charges.length === 0 && (
              <p className="text-sm text-white/60 text-center py-6">Usa el código penal para añadir cargos.</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-white/60" htmlFor="report-notes">
          Notas rápidas (se guardan en el expediente)
        </label>
        <textarea
          id="report-notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Incluye narrativa breve, prueba principal y oficiales presentes."
          rows={3}
          className="w-full rounded-xl bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
        />
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{notes.length} / 480</span>
          <button
            type="button"
            onClick={onFinalize}
            className="rounded-lg bg-brand-500/80 hover:bg-brand-500 text-white px-4 py-2 text-sm font-semibold transition disabled:opacity-40"
            disabled={!citizen || charges.length === 0}
          >
            Guardar en expediente
          </button>
        </div>
      </div>
    </div>
  );
}
