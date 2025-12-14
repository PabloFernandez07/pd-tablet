import { CaseFile, IncidentForm } from '../types';

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
