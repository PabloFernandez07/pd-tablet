import { useMemo, useState } from 'react';
import { Charge, ChargeClass, PenalCodeCategory } from '../types';

interface Props {
  categories: PenalCodeCategory[];
  onAdd: (charge: Charge) => void;
}

const classTone: Record<ChargeClass, string> = {
  Falta: 'bg-emerald-500/15 text-emerald-100 border-emerald-500/40',
  Delito: 'bg-amber-500/15 text-amber-100 border-amber-500/40',
  Grave: 'bg-red-500/15 text-red-100 border-red-500/40'
};

export function PenalCodeBoard({ categories, onAdd }: Props): JSX.Element {
  const [query, setQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<ChargeClass | 'Todos'>('Todos');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        charges: category.charges.filter((charge) => {
          if (selectedClass !== 'Todos' && charge.class !== selectedClass) return false;
          if (!needle) return true;
          return `${charge.code} ${charge.title} ${charge.description}`.toLowerCase().includes(needle);
        })
      }))
      .filter((category) => category.charges.length > 0);
  }, [categories, query, selectedClass]);

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Código penal</p>
          <p className="text-sm text-white/80">Cargos rápidos estilo Nopixel</p>
        </div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value as ChargeClass | 'Todos')}
          className="text-xs rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
        >
          <option value="Todos">Todos</option>
          <option value="Falta">Faltas</option>
          <option value="Delito">Delitos</option>
          <option value="Grave">Graves</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por código, título o descripción"
          className="w-full rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
        />
        <button
          type="button"
          onClick={() => setQuery('')}
          className="text-xs rounded-lg border border-white/15 px-3 py-2 text-white/80 hover:border-brand-400 hover:text-white transition"
        >
          Limpiar
        </button>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {filtered.map((category) => (
          <div key={category.id} className="rounded-xl border border-white/10 overflow-hidden">
            <div className={`px-3 py-2 text-xs text-white bg-gradient-to-r ${category.color}`}>
              {category.label}
            </div>
            <div className="divide-y divide-white/5 bg-slate-950/60">
              {category.charges.map((charge) => (
                <article key={charge.code} className="px-3 py-3 flex items-start gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/60">{charge.code}</span>
                      <span className={`text-[11px] px-2 py-1 rounded-full border ${classTone[charge.class]}`}>
                        {charge.class}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">{charge.title}</p>
                    <p className="text-xs text-white/60">{charge.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-white/70">
                      <span className="rounded border border-white/10 px-2 py-0.5">Multa ${charge.fine}</span>
                      <span className="rounded border border-white/10 px-2 py-0.5">Tiempo {charge.time} min</span>
                      {charge.points != null && (
                        <span className="rounded border border-white/10 px-2 py-0.5">Puntos {charge.points}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAdd(charge)}
                    className="text-xs rounded-lg border border-brand-400/60 px-3 py-2 text-white/90 hover:bg-brand-500/20 transition"
                  >
                    Añadir
                  </button>
                </article>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-white/60 text-center py-6">Sin artículos para los filtros actuales.</p>
        )}
      </div>
    </div>
  );
}
