import { useMemo, useState } from 'react';
import { LookupResult } from '../types';

interface Props {
  onSelect: (result: LookupResult) => void;
}

const data: LookupResult[] = [
  {
    id: 'PLT-9821',
    type: 'Vehículo',
    name: 'Sedán negro modificado',
    detail: 'Matrícula vista en 3 reportes de robo',
    risk: 'Medio',
    badge: 'Vigilar'
  },
  {
    id: 'ID-445882',
    type: 'Ciudadano',
    name: 'Sofía Méndez',
    detail: 'Sin antecedentes, coopera con patrulla K-421',
    risk: 'Bajo'
  },
  {
    id: 'ID-118292',
    type: 'Ciudadano',
    name: 'Elias Torres (alias "Toro")',
    detail: '2 antecedentes de agresión. Orden de seguimiento activo.',
    risk: 'Alto',
    badge: 'Intervenir'
  }
];

const riskTone: Record<LookupResult['risk'], string> = {
  Bajo: 'text-emerald-300 border-emerald-400/40',
  Medio: 'text-amber-200 border-amber-400/40',
  Alto: 'text-red-300 border-red-400/40'
};

export function LookupPanel({ onSelect }: Props): JSX.Element {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return data.filter((item) =>
      `${item.name} ${item.detail} ${item.id}`.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Consultas rápidas</p>
          <p className="text-sm text-white/80">Vehículos y ciudadanos</p>
        </div>
        <span className="text-xs text-white/60">Filtro local seguro</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, ID o detalle"
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
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/10 p-3 bg-slate-950/50 hover:border-brand-400/60 transition cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-white/60">{item.id}</p>
                <p className="text-sm font-semibold text-white">{item.name}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${riskTone[item.risk]}`}>{item.risk}</span>
            </div>
            <p className="text-xs text-white/70">{item.detail}</p>
            <div className="flex items-center gap-2 text-[11px] text-white/60 mt-2">
              <span className="rounded-full border border-white/10 px-2 py-0.5">{item.type}</span>
              {item.badge && (
                <span className="rounded-full border border-amber-400/40 px-2 py-0.5 text-amber-200">{item.badge}</span>
              )}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-white/60 text-center py-6">Sin resultados con el filtro actual.</p>
        )}
      </div>
    </div>
  );
}
