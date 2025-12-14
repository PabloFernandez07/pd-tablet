import { clsx } from 'clsx';

const badges = {
  blue: 'bg-blue-500/20 text-blue-100 border-blue-500/40',
  green: 'bg-green-500/20 text-green-100 border-green-500/40',
  yellow: 'bg-amber-500/20 text-amber-100 border-amber-500/40',
  red: 'bg-red-500/20 text-red-100 border-red-500/40'
};

interface CardProps {
  label: string;
  value: string;
  detail: string;
  tone: keyof typeof badges;
}

export function StatusCards(): JSX.Element {
  const cards: CardProps[] = [
    { label: 'Casos activos', value: '28', detail: '7 en curso crítico', tone: 'blue' },
    { label: 'Patrullas', value: '14', detail: '5 con incidente abierto', tone: 'green' },
    { label: 'Pendientes', value: '9', detail: '3 requieren informe', tone: 'yellow' },
    { label: 'Alertas', value: '3', detail: '1 prioridad máxima', tone: 'red' }
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={clsx(
            'rounded-2xl border px-4 py-3 shadow-inner shadow-black/30',
            'bg-slate-900/60 backdrop-blur-sm flex items-center gap-3',
            'transition hover:-translate-y-0.5 hover:border-white/20',
            badges[card.tone]
          )}
        >
          <div className="w-12 h-12 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center text-2xl font-bold">
            {card.value}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-white/70">{card.label}</p>
            <p className="text-sm font-semibold text-white">{card.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
