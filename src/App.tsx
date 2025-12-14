import { useMemo, useReducer, useState } from 'react';
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

type TabId = 'dashboard' | 'casos' | 'incidentes' | 'directorio' | 'codigo' | 'reportes';

const priorityMessages = [
  {
    id: 'msg-1',
    level: 'Crítico',
    title: 'SOS - Agente requiere refuerzos',
    details: 'Patrulla K-375 pide apoyo en Distrito Sur. Se escuchan disparos intermitentes.',
    time: 'Hace 3 min'
  },
  {
    id: 'msg-2',
    level: 'Alerta',
    title: 'Cámara LPR detecta matrícula BOE-992',
    details: 'Coincide con vehículo vinculado a secuestro. Última lectura: Autopista norte.',
    time: 'Hace 7 min'
  },
  {
    id: 'msg-3',
    level: 'Prioritario',
    title: 'Aviso hospitalario',
    details: 'Ingreso de herido por arma blanca sin acompañante. Posible víctima de robo en mercado central.',
    time: 'Hace 12 min'
  }
];

const wantedPeople = [
  {
    id: 'CID-2099',
    name: 'Derek "Hex" Muñoz',
    risk: 'Alta',
    lastSeen: 'Puerto · Hace 1 h',
    notes: 'Asaltos armados · Conduce Sultan RS azul mate'
  },
  {
    id: 'CID-3310',
    name: 'Jorge "Koa" Esparza',
    risk: 'Media',
    lastSeen: 'Little Seoul · Hace 22 min',
    notes: 'Vandalismo y asaltos simples · Evita patrullas a pie'
  },
  {
    id: 'CID-1420',
    name: 'Lucía Prado',
    risk: 'Crítica',
    lastSeen: 'Aeropuerto · Hace 15 min',
    notes: 'Secuestro en curso · Acompañada de sedán gris, armada'
  }
];

const wantedVehicles = [
  {
    plate: 'BOE-992',
    model: 'Obey Tailgater S',
    color: 'Gris grafito',
    lastSeen: 'Autopista norte · Hace 7 min',
    flags: ['Secuestro', 'Matrícula clonada']
  },
  {
    plate: 'KXH-501',
    model: 'Karin Sultan RS',
    color: 'Azul mate',
    lastSeen: 'Puerto · Hace 1 h',
    flags: ['Asalto armado', 'Posible blindaje']
  },
  {
    plate: 'LSP-214',
    model: 'Bravado Buffalo STX',
    color: 'Rojo vino',
    lastSeen: 'Distrito financiero · Hace 18 min',
    flags: ['Fuga a alta velocidad', 'Conductor agresivo']
  }
];

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
  const [openTabs, setOpenTabs] = useState<TabId[]>(['dashboard']);
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const openCases = useMemo(() => state.cases.filter((item) => item.status !== 'Cerrado'), [state.cases]);

  const navItems: { id: TabId; label: string; hint: string }[] = [
    { id: 'dashboard', label: 'Dashboard', hint: 'Vista general y alertas' },
    { id: 'casos', label: 'Expedientes', hint: 'Seguimiento de casos' },
    { id: 'incidentes', label: 'Incidentes', hint: 'Captura rápida' },
    { id: 'directorio', label: 'Directorio', hint: 'Personas y antecedentes' },
    { id: 'codigo', label: 'Código Penal', hint: 'Cargos y sanciones' },
    { id: 'reportes', label: 'Reportes', hint: 'Borradores activos' }
  ];

  const tabTitles: Record<TabId, string> = {
    dashboard: 'Centro de mando',
    casos: 'Expedientes activos',
    incidentes: 'Registro de incidentes',
    directorio: 'Directorio de ciudadanos',
    codigo: 'Catálogo del Código Penal',
    reportes: 'Borrador de reporte'
  };

  const openTab = (id: TabId): void => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveTab(id);
  };

  const closeTab = (id: TabId): void => {
    if (id === 'dashboard') return;
    setOpenTabs((prev) => {
      const next = prev.filter((item) => item !== id);
      if (!next.length) {
        setActiveTab('dashboard');
        return ['dashboard'];
      }
      if (activeTab === id) {
        setActiveTab(next[next.length - 1]);
      }
      return next;
    });
  };

  const renderDashboard = (): JSX.Element => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-indigo-500/20 border border-white/10 p-5">
          <p className="text-sm text-white/80">Casos abiertos</p>
          <h3 className="text-4xl font-semibold text-white mt-2">{openCases.length}</h3>
          <p className="text-xs text-white/60 mt-1">Expedientes con seguimiento activo</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 border border-white/10 p-5">
          <p className="text-sm text-white/80">Alertas prioritarias</p>
          <h3 className="text-4xl font-semibold text-white mt-2">{priorityMessages.length}</h3>
          <p className="text-xs text-white/60 mt-1">Requieren revisión inmediata</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 border border-white/10 p-5">
          <p className="text-sm text-white/80">Personas/vehículos buscados</p>
          <h3 className="text-4xl font-semibold text-white mt-2">{wantedPeople.length + wantedVehicles.length}</h3>
          <p className="text-xs text-white/60 mt-1">Seguimiento activo en toda la red</p>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 shadow-xl">
          <header className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Mensajes</p>
              <h3 className="text-lg font-semibold text-white">Prioritarios</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-100 text-xs border border-sky-500/40">Tiempo real</span>
          </header>
          <div className="space-y-3">
            {priorityMessages.map((msg) => (
              <div key={msg.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-[11px] rounded-full bg-amber-500/20 text-amber-100 border border-amber-400/40">
                    {msg.level}
                  </span>
                  <span className="text-xs text-white/60">{msg.time}</span>
                </div>
                <p className="text-sm font-semibold text-white mt-2">{msg.title}</p>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">{msg.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950 p-5 shadow-xl">
          <header className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Personas</p>
              <h3 className="text-lg font-semibold text-white">En busca y captura</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-50 text-xs border border-rose-500/40">
              {wantedPeople.length} activos
            </span>
          </header>
          <div className="space-y-3">
            {wantedPeople.map((person) => (
              <div key={person.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{person.name}</p>
                    <p className="text-xs text-white/60">{person.id}</p>
                  </div>
                  <span className="px-2 py-1 text-[11px] rounded-full bg-rose-500/20 text-rose-100 border border-rose-400/40">
                    Riesgo {person.risk}
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-2">{person.notes}</p>
                <p className="text-xs text-white/60 mt-1">Último avistamiento: {person.lastSeen}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950 p-5 shadow-xl">
          <header className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Vehículos</p>
              <h3 className="text-lg font-semibold text-white">En busca y captura</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-50 text-xs border border-emerald-500/40">
              {wantedVehicles.length} activos
            </span>
          </header>
          <div className="space-y-3">
            {wantedVehicles.map((vehicle) => (
              <div key={vehicle.plate} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{vehicle.model}</p>
                    <p className="text-xs text-white/60">{vehicle.color} · Placa {vehicle.plate}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end max-w-[180px]">
                    {vehicle.flags.map((flag) => (
                      <span
                        key={`${vehicle.plate}-${flag}`}
                        className="px-2 py-1 text-[11px] rounded-full bg-emerald-500/15 text-emerald-100 border border-emerald-400/40"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-2">Último avistamiento: {vehicle.lastSeen}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderContent = (): JSX.Element => {
    switch (activeTab) {
      case 'casos':
        return (
          <div className="grid xl:grid-cols-3 gap-6">
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
        );
      case 'incidentes':
        return (
          <div className="grid lg:grid-cols-2 gap-6">
            <IncidentFormCard
              defaults={initialIncident}
              onSubmit={(incident) => dispatch({ type: 'incident', payload: incident })}
            />
            <ActivityTimeline events={state.timeline} />
          </div>
        );
      case 'directorio':
        return (
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6">
            <CitizenDirectory
              citizens={citizens}
              selectedId={state.report.citizen?.id}
              onSelect={(citizen) => dispatch({ type: 'setCitizen', payload: citizen })}
            />
            <LookupPanel onSelect={(item) => dispatch({ type: 'lookup', payload: item.name })} />
          </div>
        );
      case 'codigo':
        return <PenalCodeBoard categories={penalCode} onAdd={(charge) => dispatch({ type: 'addCharge', payload: charge })} />;
      case 'reportes':
        return (
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-6">
            <ReportBuilder
              citizen={state.report.citizen}
              charges={state.report.charges}
              notes={state.report.notes}
              onNotesChange={(value) => dispatch({ type: 'updateNotes', payload: value })}
              onRemoveCharge={(code) => dispatch({ type: 'removeCharge', payload: code })}
              onFinalize={() => dispatch({ type: 'finalizeReport' })}
            />
            <PenalCodeBoard categories={penalCode} onAdd={(charge) => dispatch({ type: 'addCharge', payload: charge })} />
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <ErrorBoundary>
      <TabletShell>
        <div className="grid xl:grid-cols-[260px,1fr] gap-6 items-start">
          <aside className="rounded-3xl border border-white/10 bg-slate-950/50 backdrop-blur-xl shadow-xl p-5 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-100">Panel táctico</p>
              <h2 className="text-xl font-semibold text-white">Navegación</h2>
              <p className="text-sm text-white/60 mt-1">Abre pestañas desde aquí</p>
            </div>
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openTab(item.id)}
                  className={`w-full text-left rounded-2xl border border-white/10 px-4 py-3 transition shadow-inner shadow-black/30 ${
                    activeTab === item.id ? 'bg-gradient-to-r from-brand-600/50 to-indigo-700/40 text-white' : 'bg-slate-900/60 text-white/80 hover:text-white'
                  }`}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-white/60">{item.hint}</p>
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-50">Estado</p>
              <p className="text-sm text-white/70">Sesión segura · Red táctica</p>
              <div className="flex items-center gap-2 mt-3 text-emerald-50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Conexión establecida
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-100">{tabTitles[activeTab]}</p>
                <h2 className="text-2xl font-semibold text-white">Control operacional</h2>
              </div>
              <OfficersBar />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {openTabs.map((tab) => (
                <div
                  key={tab}
                  className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    activeTab === tab
                      ? 'border-brand-400/60 bg-brand-600/20 text-white'
                      : 'border-white/10 bg-slate-900/60 text-white/70 hover:text-white'
                  }`}
                >
                  <button onClick={() => setActiveTab(tab)} className="font-semibold">
                    {tabTitles[tab]}
                  </button>
                  {tab !== 'dashboard' && (
                    <button
                      onClick={() => closeTab(tab)}
                      className="text-white/50 hover:text-white text-xs px-1"
                      aria-label={`Cerrar pestaña ${tabTitles[tab]}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <StatusCards />
            {renderContent()}
          </div>
        </div>
      </TabletShell>
    </ErrorBoundary>
  );
}
