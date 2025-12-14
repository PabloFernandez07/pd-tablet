import { useMemo, useState } from 'react';
import { IncidentForm } from '../types';
import { validateMinLength, validateRequired, withValidation } from '../utils/validation';

interface Props {
  onSubmit: (incident: IncidentForm) => void;
  defaults: IncidentForm;
}

const categories: IncidentForm['type'][] = ['Robo', 'Agresión', 'Tráfico', 'Intervención'];

export function IncidentFormCard({ onSubmit, defaults }: Props): JSX.Element {
  const [form, setForm] = useState<IncidentForm>(defaults);
  const [errors, setErrors] = useState<Record<keyof IncidentForm, string | undefined>>({
    title: undefined,
    type: undefined,
    location: undefined,
    suspect: undefined,
    notes: undefined,
    evidence: undefined
  });

  const isValid = useMemo(() => Object.values(errors).every((value) => !value), [errors]);

  const handleChange = <K extends keyof IncidentForm>(key: K, value: IncidentForm[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (): void => {
    const { errors: validationErrors, result } = withValidation(form, [
      (payload) => validateRequired(payload, ['title', 'location', 'notes']),
      (payload) => validateMinLength(payload, 'notes', 12)
    ]);

    const mapped = validationErrors.reduce<Partial<typeof errors>>((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {});

    setErrors((prev) => ({ ...prev, ...mapped }));

    if (result) {
      onSubmit(result);
      setForm(defaults);
    }
  };

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Nuevo incidente</p>
          <p className="text-sm text-white/80">Validación en cliente</p>
        </div>
        <span className="text-xs text-white/50">Control de errores activo</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="space-y-1 text-sm">
          <span className="text-white/80">Título</span>
          <input
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
            placeholder="Ej: Asalto a comercio"
          />
          {errors.title && <p className="text-xs text-red-300">{errors.title}</p>}
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-white/80">Categoría</span>
          <select
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value as IncidentForm['type'])}
            className="w-full rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-white/80">Ubicación</span>
          <input
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
            placeholder="Zona, calle o referencia"
          />
          {errors.location && <p className="text-xs text-red-300">{errors.location}</p>}
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-white/80">Sospechoso / Matrícula</span>
          <input
            value={form.suspect}
            onChange={(e) => handleChange('suspect', e.target.value)}
            className="w-full rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none"
            placeholder="Nombre, alias o matrícula"
          />
        </label>
      </div>
      <label className="space-y-1 text-sm">
        <span className="text-white/80">Notas rápidas</span>
        <textarea
          value={form.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full rounded-lg bg-slate-950/70 border border-white/10 px-3 py-2 text-white focus:border-brand-400 outline-none min-h-24"
          placeholder="Resumen breve de lo ocurrido"
        />
        {errors.notes && <p className="text-xs text-red-300">{errors.notes}</p>}
      </label>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-white/60">Validación y reinicio seguro del formulario.</p>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-brand-400 focus-visible:ring-2 focus-visible:ring-brand-300"
          disabled={!isValid}
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
