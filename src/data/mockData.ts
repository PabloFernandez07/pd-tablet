import { CaseFile, Citizen, IncidentForm, PenalCodeCategory, ReportDraft } from '../types';

export const officers = [
  {
    id: 'K-421',
    name: 'Of. Andrea Vega',
    status: 'En servicio',
    role: 'Supervisora',
    avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=AV'
  },
  {
    id: 'K-375',
    name: 'Of. Bruno Carranza',
    status: 'Patrullando',
    role: 'Unidad táctica',
    avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=BC'
  },
  {
    id: 'K-198',
    name: 'Of. Diana Ríos',
    status: 'Intervención',
    role: 'Investigaciones',
    avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=DR'
  }
];

export const caseFiles: CaseFile[] = [
  {
    id: 'EXP-2093',
    title: 'Robo a mano armada - Distrito Norte',
    priority: 'Alta',
    status: 'En curso',
    updatedAt: 'Hace 10 min',
    assignedTo: ['K-421', 'K-375'],
    tags: ['arma', 'vehículo sospechoso'],
    summary: 'Víctima reporta asalto con arma corta. Sospechosos huyeron en Sedán negro.'
  },
  {
    id: 'EXP-2089',
    title: 'Vandalismo en propiedad privada',
    priority: 'Media',
    status: 'Pendiente',
    updatedAt: 'Hace 35 min',
    assignedTo: ['K-198'],
    tags: ['cámara'],
    summary: 'Cámaras captaron a dos individuos dañando la entrada de un negocio local.'
  },
  {
    id: 'EXP-2077',
    title: 'Conducción temeraria / persecución breve',
    priority: 'Alta',
    status: 'Cerrado',
    updatedAt: 'Hace 2 h',
    assignedTo: ['K-375'],
    tags: ['tráfico', 'persecución'],
    summary: 'Vehículo evadió control policial, detenido tras maniobra controlada. Sin heridos.'
  }
];

export const initialIncident: IncidentForm = {
  title: '',
  type: 'Robo',
  location: '',
  suspect: '',
  notes: '',
  evidence: []
};

export const citizens: Citizen[] = [
  {
    id: 'CID-1845',
    name: 'Aisha Navarro',
    status: 'En ciudad',
    priors: ['Conducción temeraria (2023)', 'Obstrucción a la justicia (2024)'],
    lastSeen: 'Centro médico · Hace 15 min',
    affiliation: 'Sindicato de taxis',
    flags: ['Coopera', 'Contacto preferente'],
    notes: 'Responde rápido a citaciones, suele grabar todo con bodycam propia.'
  },
  {
    id: 'CID-2099',
    name: 'Derek "Hex" Muñoz',
    status: 'Buscado',
    priors: ['Robo a mano armada (2024)', 'Posesión de arma ilegal'],
    lastSeen: 'Puerto · Hace 1 h',
    affiliation: 'Crew DriftKings',
    flags: ['Armed', 'Fuga recurrente'],
    notes: 'Vehículo habitual: Sultan RS azul mate. Evita enfrentamientos directos.'
  },
  {
    id: 'CID-1182',
    name: 'Camila Duarte',
    status: 'En custodia',
    priors: ['Fraude menor (2022)'],
    lastSeen: 'Celda 3B · Hace 5 min',
    affiliation: 'N/A',
    flags: ['Sin antecedentes violentos'],
    notes: 'Solicita asistencia legal pública. No habla con otros detenidos.'
  },
  {
    id: 'CID-3310',
    name: 'Jorge "Koa" Esparza',
    status: 'En ciudad',
    priors: ['Vandalismo (2021)', 'Asalto simple (2023)'],
    lastSeen: 'Little Seoul · Hace 22 min',
    affiliation: 'Skate crew local',
    flags: ['Probation'],
    notes: 'Evita a la policía pero coopera si se le explica el proceso.'
  }
];

export const penalCode: PenalCodeCategory[] = [
  {
    id: 'violencia',
    label: 'Violencia y armas',
    color: 'from-red-500/70 via-amber-500/60 to-red-600/60',
    charges: [
      {
        code: 'P-101',
        title: 'Agresión con arma',
        class: 'Grave',
        fine: 6000,
        time: 40,
        points: 4,
        description: 'Uso de arma blanca o de fuego para causar daño físico.'
      },
      {
        code: 'P-118',
        title: 'Amenazas armadas',
        class: 'Delito',
        fine: 3200,
        time: 18,
        points: 2,
        description: 'Intimidar con arma sin llegar a efectuar daño físico.'
      },
      {
        code: 'P-140',
        title: 'Portación ilegal',
        class: 'Delito',
        fine: 2800,
        time: 14,
        description: 'Poseer arma sin licencia o serie registrada.'
      }
    ]
  },
  {
    id: 'tráfico',
    label: 'Tráfico y conducción',
    color: 'from-sky-500/70 via-cyan-500/60 to-blue-600/60',
    charges: [
      {
        code: 'T-210',
        title: 'Evasión policial',
        class: 'Delito',
        fine: 3500,
        time: 20,
        points: 3,
        description: 'Huir de un control o detención usando vehículo.'
      },
      {
        code: 'T-225',
        title: 'Conducción temeraria',
        class: 'Falta',
        fine: 900,
        time: 5,
        description: 'Poner en riesgo a terceros por maniobras peligrosas.'
      },
      {
        code: 'T-250',
        title: 'Carrera ilegal',
        class: 'Grave',
        fine: 5000,
        time: 35,
        points: 4,
        description: 'Participar o promover competencias de velocidad en ciudad.'
      }
    ]
  },
  {
    id: 'propiedad',
    label: 'Propiedad y fraude',
    color: 'from-emerald-500/70 via-lime-500/60 to-teal-600/60',
    charges: [
      {
        code: 'F-301',
        title: 'Robo menor',
        class: 'Falta',
        fine: 750,
        time: 5,
        description: 'Apropiación de bienes sin violencia ni daños.'
      },
      {
        code: 'F-330',
        title: 'Allanamiento',
        class: 'Delito',
        fine: 2600,
        time: 16,
        description: 'Ingresar a propiedad privada sin autorización.'
      },
      {
        code: 'F-360',
        title: 'Fraude financiero',
        class: 'Grave',
        fine: 4500,
        time: 28,
        description: 'Uso de documentos falsos o estafas bancarias.'
      }
    ]
  }
];

export const initialReportDraft: ReportDraft = {
  citizen: undefined,
  charges: [],
  notes: ''
};
