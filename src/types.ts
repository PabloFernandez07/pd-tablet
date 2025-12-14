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
