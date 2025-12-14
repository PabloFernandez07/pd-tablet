import { useMemo, useState } from 'react';
import { penalCode } from './data/mockData';
import { Charge } from './types';

type ScreenId = 'dashboard' | 'ftoList' | 'ftoForm' | 'incident' | 'charges' | 'profile';

interface Announcement {
  id: string;
  title: string;
  details: string;
  badge?: string;
}

interface FtoReportRow {
  id: string;
  cadet: string;
  trainer: string;
  title: string;
  date: string;
  status: 'success' | 'warning' | 'info';
}

interface ProfileData {
  id: string;
  name: string;
  phone: string;
  image: string;
  summary: string;
  tags: string[];
  vehicles: string[];
  businesses: string[];
  properties: string[];
  licenses: string[];
}

const announcements: Announcement[] = [
  { id: 'ann-1', title: 'Announcement Text 12345', details: 'Sed dictum leo est sed ultricies - Text 12345 12345 12345 12345', badge: 'New' },
  { id: 'ann-2', title: 'Announcement Text 9876', details: 'Revisión semanal de patrullas y coordinación de reportes.' }
];

const bolos: Announcement[] = [
  { id: 'bolo-1', title: 'Test', details: 'asd' },
  { id: 'bolo-2', title: 'Vehículo oscuro', details: 'Última vez visto en puerto. Placa parcial: 21K.' }
];

const warrants: Announcement[] = [
  { id: 'war-1', title: 'Warrant', details: 'Revisión y captura pendiente.' }
];

const ftoRows: FtoReportRow[] = [
  { id: 'fto-1', cadet: 'Test Cadet', trainer: 'Officer Rann', title: 'FTO Report 1 Cadet', date: '10/13/2023, 3:52 AM', status: 'success' },
  { id: 'fto-2', cadet: 'Test Cadet', trainer: 'Officer Diaz', title: 'Test Cadet - 2 Day Report', date: '10/13/2023, 7:11 AM', status: 'info' },
  { id: 'fto-3', cadet: 'Test Cadet', trainer: 'Officer Backwood', title: 'FTO Cadet: wow this cadet is shit LMAO', date: 'This file begins to worry me', status: 'warning' },
  { id: 'fto-4', cadet: 'Test Cadet', trainer: 'Officer Shepard', title: 'Test Cadet', date: '10/12/2023, 3:11 AM', status: 'info' }
];

const ratingCriteria = [
  'Pursuits',
  'Case Law',
  'Reports',
  'Radio Etiquette',
  'Traffic',
  'Professionalism',
  'SPD',
  'Processing',
  'Average'
];

const incidentOptions = [
  { label: 'Add Criminal Scum', value: 'Main Test' },
  { label: 'Evidence', value: 'Photo · DNA · Video' },
  { label: 'Tags', value: 'Breach · Hostage · Gang related' },
  { label: 'Officers Involved', value: 'Rann · Diaz · Shepard' },
  { label: 'Civilians Involved', value: '2 Civilians' },
  { label: 'Vehicles', value: 'Banshee · Tailgater · Patriot' }
];

const profile: ProfileData = {
  id: 'STATE 10',
  name: 'Rayquaza',
  phone: '1011',
  image: 'https://api.dicebear.com/8.x/thumbs/svg?seed=Ray',
  summary: 'Podemos hacer esto en cada rol: información rápida, tags, notas y foto del ciudadano.',
  tags: ['Test tag', 'Other tag'],
  vehicles: ['https://i.imgur.com/pPZK83l.png', 'https://i.imgur.com/YTgXHwE.png'],
  businesses: ['LSPD HQ', 'Bean Machine'],
  properties: ['2 North Rockford Dr', 'Integrity 4'],
  licenses: ['Drivers License', 'Hunting License', 'Fishing License', 'Weapons License']
};

function StatusPill({ tone, children }: { tone: FtoReportRow['status']; children: string }): JSX.Element {
  const colors: Record<FtoReportRow['status'], string> = {
    success: 'from-emerald-500/30 to-emerald-400/40 text-emerald-50',
    warning: 'from-amber-500/30 to-orange-400/40 text-amber-50',
    info: 'from-sky-500/30 to-blue-400/40 text-sky-50'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors[tone]} border border-white/10`}>
      {children}
    </span>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Live</span>
      </div>
      {children}
    </section>
  );
}

export default function App(): JSX.Element {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('dashboard');
  const activeCharges = useMemo<Charge[]>(() => penalCode.flatMap((cat) => cat.charges.slice(0, 3)), []);

  const renderDashboard = (): JSX.Element => (
    <div className="grid lg:grid-cols-[1.3fr,1fr] gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <SectionCard title="Warrants">
          <div className="space-y-2">
            {warrants.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-white/80">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-white/60 text-xs">{item.details}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Announcements">
          <div className="space-y-2">
            {announcements.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{item.title}</p>
                  {item.badge && <span className="text-[10px] px-2 py-1 rounded-full bg-sky-500/20 text-sky-100 border border-sky-400/40">{item.badge}</span>}
                </div>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="BOLO">
          <div className="space-y-2">
            {bolos.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-white/80">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-white/60 text-xs mt-1">{item.details}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-100">Live feed</p>
            <h3 className="text-xl font-semibold text-white">Panel principal</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-50 text-xs border border-emerald-400/40">Online</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">
          Inspírate en la tablet de NoPixel: tarjetas densas, navegación lateral siempre visible y un encabezado con pestañas para cambiar de módulo.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-600/40 to-indigo-700/30 p-4">
            <p className="text-sm text-white/80">Incidentes activos</p>
            <h4 className="text-3xl font-semibold text-white mt-2">12</h4>
            <p className="text-xs text-white/60">Monitoreados en tiempo real</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 p-4">
            <p className="text-sm text-white/80">Reportes FTO</p>
            <h4 className="text-3xl font-semibold text-white mt-2">8</h4>
            <p className="text-xs text-white/60">Listos para revisión</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFtoList = (): JSX.Element => (
    <div className="space-y-3">
      {ftoRows.map((row) => (
        <div key={row.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex items-center justify-between shadow-inner shadow-black/20">
          <div className="space-y-1">
            <p className="text-white font-semibold">{row.cadet}</p>
            <p className="text-sm text-white/70">{row.title}</p>
            <p className="text-xs text-white/50">{row.trainer}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-white/50">{row.date}</p>
            <StatusPill tone={row.status}>{row.status === 'success' ? 'Submitted' : row.status === 'info' ? 'In Progress' : 'Review'}</StatusPill>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFtoForm = (): JSX.Element => (
    <div className="grid lg:grid-cols-[1.1fr,320px] gap-6 items-start">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <p>FTO Report #24</p>
        </div>
        <input
          className="w-full rounded-2xl bg-slate-950/80 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          placeholder="Título del reporte"
          defaultValue="cadet - wow this cadet is shit LMAO"
        />
        <textarea
          className="w-full min-h-[180px] rounded-2xl bg-slate-950/80 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          placeholder="Escribe la evaluación"
          defaultValue="Be fr go buy a dog honestly"
        />
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 space-y-4 shadow-xl">
        <h4 className="text-white font-semibold">Evaluación</h4>
        <div className="space-y-3">
          {ratingCriteria.map((item) => (
            <div key={item} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-white/70">
                <p>{item}</p>
                <span className="text-xs text-white/50">+/−</span>
              </div>
              <input type="range" min={0} max={100} defaultValue={60} className="w-full accent-brand-400" />
            </div>
          ))}
        </div>
        <button className="w-full rounded-2xl bg-brand-500/80 hover:bg-brand-400 text-white py-3 text-sm font-semibold transition">Guardar evaluación</button>
      </div>
    </div>
  );

  const renderIncident = (): JSX.Element => (
    <div className="grid lg:grid-cols-[1.1fr,360px] gap-6 items-start">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 space-y-4 shadow-xl">
        <input
          className="w-full rounded-2xl bg-slate-950/80 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
          defaultValue="WOW SOME CRIME HAS HAPPENED"
        />
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/70">
          <input className="rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2" defaultValue="Incident Command (if Applicable)" />
          <input className="rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2" defaultValue="First on Scene" />
          <input className="rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2" defaultValue="Location" />
          <input className="rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2" defaultValue="Statements" />
        </div>
        <textarea
          className="w-full min-h-[200px] rounded-2xl bg-slate-950/80 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
          defaultValue={'more things have happened\nwhoops we out'}
        />
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 space-y-4 shadow-xl">
        <h4 className="text-white font-semibold">Opciones rápidas</h4>
        <div className="grid gap-3">
          {incidentOptions.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-white/60 mt-1">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap text-xs">
          {['Processed', 'Pleads guilty', 'Set to be Finger Marked', 'Accomplice'].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-100 border border-rose-400/30">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full rounded-2xl bg-gradient-to-r from-rose-500/80 to-orange-500/80 text-white py-3 text-sm font-semibold">Crear incidente</button>
      </div>
    </div>
  );

  const renderCharges = (): JSX.Element => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Asignación de cargos</p>
          <h3 className="text-xl font-semibold text-white">TEST 1 TEST · State ID 10101</h3>
          <p className="text-sm text-white/60">Left to process: $17150 fine · 117 months</p>
        </div>
        <input className="rounded-full bg-slate-900/70 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50" placeholder="Search charges" />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {penalCode.map((category) => (
          <div key={category.id} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold">{category.label}</h4>
              <span className={`px-3 py-1 rounded-full text-xs text-white border border-white/10 bg-gradient-to-r ${category.color}`}>Tap to add</span>
            </div>
            <div className="space-y-2">
              {category.charges.map((charge) => (
                <div key={charge.code} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-white/80">
                  <p className="font-semibold text-white">{charge.title}</p>
                  <p className="text-xs text-white/60">{charge.code} · ${charge.fine} · {charge.time} mins</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 flex flex-wrap gap-2 text-sm">
        {activeCharges.map((charge) => (
          <span key={charge.code} className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-50 border border-emerald-400/30">
            {charge.code} · ${charge.fine}
          </span>
        ))}
      </div>
    </div>
  );

  const renderProfile = (): JSX.Element => (
    <div className="grid lg:grid-cols-[1.1fr,1fr] gap-6 items-start">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden">
            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-white/60">{profile.id}</p>
            <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
            <p className="text-sm text-white/60">State ID {profile.phone}</p>
            <div className="flex gap-2 mt-2 flex-wrap text-xs">
              {profile.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-brand-500/15 text-brand-50 border border-brand-400/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-white/70 font-semibold mb-2">Summary</p>
          <p className="text-sm text-white/60 leading-relaxed">{profile.summary}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
          <h4 className="text-white font-semibold">Tags</h4>
          <div className="flex gap-2 flex-wrap text-xs mt-2">
            {profile.tags.map((tag) => (
              <span key={`${tag}-detail`} className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-50 border border-sky-400/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 space-y-2">
          <h4 className="text-white font-semibold">Vehicles</h4>
          <div className="flex gap-2 flex-wrap">
            {profile.vehicles.map((url) => (
              <span key={url} className="px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 break-all">
                {url}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 space-y-2">
          <h4 className="text-white font-semibold">Businesses</h4>
          <div className="flex gap-2 flex-wrap text-xs">
            {profile.businesses.map((biz) => (
              <span key={biz} className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-50 border border-emerald-400/30">
                {biz}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 space-y-2">
          <h4 className="text-white font-semibold">Properties</h4>
          <div className="flex gap-2 flex-wrap text-xs">
            {profile.properties.map((prop) => (
              <span key={prop} className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-50 border border-orange-400/30">
                {prop}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 space-y-2">
          <h4 className="text-white font-semibold">Licenses</h4>
          <div className="flex gap-2 flex-wrap text-xs">
            {profile.licenses.map((license) => (
              <span key={license} className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-50 border border-indigo-400/30">
                {license}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = (): JSX.Element => {
    switch (activeScreen) {
      case 'ftoList':
        return renderFtoList();
      case 'ftoForm':
        return renderFtoForm();
      case 'incident':
        return renderIncident();
      case 'charges':
        return renderCharges();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  const navigation: { id: ScreenId; label: string; hint: string }[] = [
    { id: 'dashboard', label: 'Dashboard', hint: 'Principal' },
    { id: 'incident', label: 'Incidents', hint: 'Captura' },
    { id: 'profile', label: 'Profiles', hint: 'Ciudadanos' },
    { id: 'ftoList', label: 'FTO Reports', hint: 'Listado' },
    { id: 'ftoForm', label: 'New FTO', hint: 'Evaluación' },
    { id: 'charges', label: 'Charges', hint: 'Código penal' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/30 border border-brand-300/20 grid place-items-center font-black text-white">p</div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-100">nopixel · los santos police</p>
              <h1 className="text-2xl font-bold text-white">Tablet operativa</h1>
              <p className="text-sm text-white/60">Inspirada en la referencia visual que compartiste</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/70 border border-white/10 rounded-full px-4 py-2 text-sm text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live feed
            <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-400/30">NNS 007</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-[240px,1fr] gap-6">
          <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 space-y-4 shadow-xl">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Navigation</p>
              <p className="text-lg font-semibold text-white">Módulos</p>
            </div>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full text-left rounded-2xl border px-4 py-3 transition text-sm ${
                    activeScreen === item.id
                      ? 'border-brand-400/60 bg-brand-600/20 text-white shadow-lg shadow-brand-900/40'
                      : 'border-white/10 bg-slate-900/60 text-white/70 hover:text-white'
                  }`}
                >
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-xs text-white/50">{item.hint}</p>
                </button>
              ))}
            </nav>
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-50">Estado</p>
              <p>Conexión segura. Red interna activa.</p>
            </div>
          </aside>

          <main className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap text-xs uppercase tracking-[0.2em] text-white/50">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Profiles</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">FTO Reports</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Incidents</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Reports</span>
            </div>
            {renderScreen()}
          </main>
        </div>
      </div>
    </div>
  );
}
