import { useMemo, useState } from 'react';
import { Citizen } from '../types';

interface Props {
  citizens: Citizen[];
  selectedId?: string;
  onSelect: (citizen: Citizen) => void;
}

const statusTone: Record<Citizen['status'], string> = {
  'En ciudad': 'text-emerald-300 border-emerald-400/40',
  Buscado: 'text-red-300 border-red-400/40',
  'En custodia': 'text-sky-200 border-sky-400/40'
};

export function CitizenDirectory({ citizens, selectedId, onSelect }: Props): JSX.Element {
  const [query, setQuery] = useState('');
  const [onlyWanted, setOnlyWanted] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return citizens.filter((citizen) => {
      if (onlyWanted && citizen.status !== 'Buscado') return false;
      if (!needle) return true;
      return `${citizen.name} ${citizen.id} ${citizen.affiliation ?? ''}`.toLowerCase().includes(needle);
    });
  }, [citizens, onlyWanted, query]);

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Ciudadanos</p>
          <p className="text-sm text-white/80">Estado vivo de la lista CAD</p>
        </div>
        <label className="inline-flex items-center gap-2 text-xs text-white/70">
          <input
            type="checkbox"
            className="accent-brand-400"
            checked={onlyWanted}
            onChange={(e) => setOnlyWanted(e.target.checked)}
          />
          Solo buscados
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, CID o afiliación"
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
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filtered.map((citizen) => (
          <article
            key={citizen.id}
            onClick={() => onSelect(citizen)}
            className={`rounded-xl border p-3 bg-slate-950/50 hover:border-brand-400/60 transition cursor-pointer ${
              selectedId === citizen.id ? 'border-brand-400/60' : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs text-white/50">{citizen.id}</p>
                <p className="text-sm font-semibold text-white">{citizen.name}</p>
                <p className="text-xs text-white/60">{citizen.affiliation ?? 'Sin afiliación'}</p>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded-full border ${statusTone[citizen.status]}`}>
                {citizen.status}
              </span>
            </div>
            <p className="text-xs text-white/70">{citizen.lastSeen}</p>
            <div className="flex flex-wrap gap-2 text-[11px] text-white/60 mt-2">
              {citizen.flags?.map((flag) => (
                <span key={flag} className="rounded-full border border-white/10 px-2 py-0.5">
                  {flag}
                </span>
              ))}
              {citizen.priors.slice(0, 2).map((prior) => (
                <span key={prior} className="rounded-full border border-amber-400/30 px-2 py-0.5 text-amber-100/90">
                  {prior}
                </span>
              ))}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-white/60 text-center py-6">Sin coincidencias para el filtro aplicado.</p>
        )}
      </div>
    </div>
  );
}
