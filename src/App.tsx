import { useMemo, useReducer } from 'react';
import { ActivityTimeline } from './components/ActivityTimeline';
import { CaseTable } from './components/CaseTable';
import { ErrorBoundary } from './components/ErrorBoundary';
import { IncidentFormCard } from './components/IncidentForm';
import { LookupPanel } from './components/LookupPanel';
import { StatusCards } from './components/StatusCards';
import { TabletShell } from './components/TabletShell';
import { CitizenDirectory } from './components/CitizenDirectory';
import { PenalCodeBoard } from './components/PenalCodeBoard';
import { ReportBuilder } from './components/ReportBuilder';
import { caseFiles, citizens, initialIncident, initialReportDraft, officers, penalCode } from './data/mockData';
import { CaseFile, Charge, Citizen, IncidentForm, ReportDraft, TimelineEvent } from './types';

interface State {
  cases: CaseFile[];
  timeline: TimelineEvent[];
  report: ReportDraft;
}

type Action =
  | { type: 'toggle'; id: string }
  | { type: 'incident'; payload: IncidentForm }
  | { type: 'lookup'; payload: string }
  | { type: 'setCitizen'; payload: Citizen }
  | { type: 'addCharge'; payload: Charge }
  | { type: 'removeCharge'; payload: string }
  | { type: 'updateNotes'; payload: string }
  | { type: 'finalizeReport' };

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
    case 'setCitizen': {
      return {
        ...state,
        report: { ...state.report, citizen: action.payload },
        timeline: [
          {
            id: crypto.randomUUID(),
            time: 'Ahora',
            label: 'Ciudadano seleccionado',
            description: `${action.payload.name} (${action.payload.id})`,
            tone: 'info'
          },
          ...state.timeline
        ].slice(0, 10)
      };
    }
    case 'addCharge': {
      const exists = state.report.charges.some((charge) => charge.code === action.payload.code);
      const nextCharges = exists ? state.report.charges : [...state.report.charges, action.payload];
      return {
        ...state,
        report: { ...state.report, charges: nextCharges },
        timeline: exists
          ? state.timeline
          : [
              {
                id: crypto.randomUUID(),
                time: 'Ahora',
                label: 'Cargo agregado',
                description: `${action.payload.code} · ${action.payload.title}`,
                tone: 'warning'
              },
              ...state.timeline
            ].slice(0, 10)
      };
    }
    case 'removeCharge': {
      return {
        ...state,
        report: {
          ...state.report,
          charges: state.report.charges.filter((charge) => charge.code !== action.payload)
        }
      };
    }
    case 'updateNotes': {
      return {
        ...state,
        report: { ...state.report, notes: action.payload.slice(0, 480) }
      };
    }
    case 'finalizeReport': {
      if (!state.report.citizen || state.report.charges.length === 0) return state;
      const totalFine = state.report.charges.reduce((acc, charge) => acc + charge.fine, 0);
      const totalTime = state.report.charges.reduce((acc, charge) => acc + charge.time, 0);

      return {
        ...state,
        report: { ...state.report, charges: [], notes: '' },
        timeline: [
          {
            id: crypto.randomUUID(),
            time: 'Ahora',
            label: 'Reporte guardado',
            description: `${state.report.citizen.name} · ${state.report.charges.length} cargos · ${totalTime} min · $${totalFine}`,
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
  ],
  report: initialReportDraft
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
          <div className="grid grid-cols-1 2xl:grid-cols-4 gap-4">
            <div className="2xl:col-span-2 space-y-4">
              <CaseTable cases={openCases} onToggle={(id) => dispatch({ type: 'toggle', id })} />
              <IncidentFormCard
                defaults={initialIncident}
                onSubmit={(incident) => dispatch({ type: 'incident', payload: incident })}
              />
              <ReportBuilder
                citizen={state.report.citizen}
                charges={state.report.charges}
                notes={state.report.notes}
                onNotesChange={(value) => dispatch({ type: 'updateNotes', payload: value })}
                onRemoveCharge={(code) => dispatch({ type: 'removeCharge', payload: code })}
                onFinalize={() => dispatch({ type: 'finalizeReport' })}
              />
            </div>
            <div className="2xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CitizenDirectory
                citizens={citizens}
                selectedId={state.report.citizen?.id}
                onSelect={(citizen) => dispatch({ type: 'setCitizen', payload: citizen })}
              />
              <PenalCodeBoard categories={penalCode} onAdd={(charge) => dispatch({ type: 'addCharge', payload: charge })} />
              <LookupPanel onSelect={(item) => dispatch({ type: 'lookup', payload: item.name })} />
              <ActivityTimeline events={state.timeline} />
            </div>
          </div>
        </div>
      </TabletShell>
    </ErrorBoundary>
  );
}
