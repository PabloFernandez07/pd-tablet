import { useMemo, useReducer } from 'react';
import { ActivityTimeline } from './components/ActivityTimeline';
import { CaseTable } from './components/CaseTable';
import { ErrorBoundary } from './components/ErrorBoundary';
import { IncidentFormCard } from './components/IncidentForm';
import { LookupPanel } from './components/LookupPanel';
import { StatusCards } from './components/StatusCards';
import { TabletShell } from './components/TabletShell';
import { caseFiles, initialIncident, officers } from './data/mockData';
import { CaseFile, IncidentForm, TimelineEvent } from './types';

interface State {
  cases: CaseFile[];
  timeline: TimelineEvent[];
}

type Action =
  | { type: 'toggle'; id: string }
  | { type: 'incident'; payload: IncidentForm }
  | { type: 'lookup'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle': {
      const nextCases = state.cases.map((item) =>
        item.id === action.id
          ? { ...item, status: item.status === 'Cerrado' ? 'En curso' : 'Cerrado' }
          : item
      );
      return {
        ...state,
        cases: nextCases,
        timeline: [
          {
            id: crypto.randomUUID(),
            time: 'Ahora',
            label: 'Expediente',
            description: `Estado actualizado para ${action.id}`,
            tone: 'info'
          },
          ...state.timeline
        ].slice(0, 10)
      };
    }
    case 'incident': {
      return {
        ...state,
        timeline: [
          {
            id: crypto.randomUUID(),
            time: 'Ahora',
            label: 'Nuevo incidente',
            description: `${action.payload.title} en ${action.payload.location}`,
            tone: 'warning'
          },
          ...state.timeline
        ].slice(0, 10)
      };
    }
    case 'lookup': {
      return {
        ...state,
        timeline: [
          {
            id: crypto.randomUUID(),
            time: 'Ahora',
            label: 'Consulta',
            description: `Revisado: ${action.payload}`,
            tone: 'success'
          },
          ...state.timeline
        ].slice(0, 10)
      };
    }
    default:
      return state;
  }
}

const initialState: State = {
  cases: caseFiles,
  timeline: [
    {
      id: 'evt-1',
      time: '08:18',
      label: 'Confirmación',
      description: 'Ingreso autorizado para Of. Vega',
      tone: 'success'
    },
    {
      id: 'evt-2',
      time: '08:05',
      label: 'Expediente',
      description: 'EXP-2093 marcado como alta prioridad',
      tone: 'info'
    },
    {
      id: 'evt-3',
      time: '07:50',
      label: 'Alerta',
      description: 'Patrulla K-375 reporta altercado en distrito sur',
      tone: 'warning'
    }
  ]
};

function OfficersBar(): JSX.Element {
  return (
    <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 rounded-2xl px-4 py-3 overflow-x-auto">
      {officers.map((officer) => (
        <div key={officer.id} className="flex items-center gap-3 min-w-[180px]">
          <img
            src={officer.avatar}
            alt={officer.name}
            className="w-10 h-10 rounded-xl border border-white/10 bg-slate-950"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-semibold text-white">{officer.name}</p>
            <p className="text-xs text-white/60">
              {officer.id} · {officer.role} · {officer.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openCases = useMemo(() => state.cases.filter((item) => item.status !== 'Cerrado'), [state.cases]);

  return (
    <ErrorBoundary>
      <TabletShell>
        <div className="space-y-6">
          <OfficersBar />
          <StatusCards />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 space-y-4">
              <CaseTable cases={openCases} onToggle={(id) => dispatch({ type: 'toggle', id })} />
              <IncidentFormCard
                defaults={initialIncident}
                onSubmit={(incident) => dispatch({ type: 'incident', payload: incident })}
              />
            </div>
            <div className="space-y-4">
              <LookupPanel onSelect={(item) => dispatch({ type: 'lookup', payload: item.name })} />
              <ActivityTimeline events={state.timeline} />
            </div>
          </div>
        </div>
      </TabletShell>
    </ErrorBoundary>
  );
}
