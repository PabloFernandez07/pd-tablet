export type Priority = 'Alta' | 'Media' | 'Baja';
export type CaseStatus = 'Pendiente' | 'En curso' | 'Cerrado';

export type CaseFile = {
  id: string;
  title: string;
  priority: Priority;
  status: CaseStatus;
  updatedAt: string;
  assignedTo: string[];
  tags: string[];
  summary: string;
};

export type IncidentForm = {
  title: string;
  type: 'Robo' | 'Agresión' | 'Tráfico' | 'Intervención';
  location: string;
  suspect: string;
  notes: string;
  evidence: string[];
};

export type TimelineEvent = {
  id: string;
  time: string;
  label: string;
  description: string;
  tone: 'info' | 'warning' | 'danger' | 'success';
};

export type LookupResult = {
  id: string;
  type: 'Vehículo' | 'Ciudadano';
  name: string;
  detail: string;
  risk: 'Bajo' | 'Medio' | 'Alto';
  badge?: string;
};

export type CitizenStatus = 'En ciudad' | 'Buscado' | 'En custodia';

export type Citizen = {
  id: string;
  name: string;
  status: CitizenStatus;
  flags?: string[];
  priors: string[];
  lastSeen: string;
  affiliation?: string;
  notes?: string;
};

export type ChargeClass = 'Falta' | 'Delito' | 'Grave';

export type Charge = {
  code: string;
  title: string;
  class: ChargeClass;
  fine: number;
  time: number;
  points?: number;
  description: string;
};

export type PenalCodeCategory = {
  id: string;
  label: string;
  color: string;
  charges: Charge[];
};

export type ReportDraft = {
  citizen?: Citizen;
  charges: Charge[];
  notes: string;
};
