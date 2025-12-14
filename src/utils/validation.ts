export type ValidationError<T> = {
  field: keyof T;
  message: string;
};

export function validateRequired<T extends Record<string, unknown>>(
  payload: T,
  required: Array<keyof T>
): ValidationError<T>[] {
  return required
    .filter((field) => {
      const value = payload[field];
      return value === undefined || value === null || String(value).trim().length === 0;
    })
    .map((field) => ({ field, message: 'Campo obligatorio' }));
}

export function validateMinLength<T extends Record<string, unknown>>(
  payload: T,
  field: keyof T,
  min: number
): ValidationError<T>[] {
  const value = payload[field];
  if (typeof value !== 'string') return [];
  return value.trim().length < min
    ? [{ field, message: `Debe tener al menos ${min} caracteres` }]
    : [];
}

export function withValidation<T extends Record<string, unknown>>(
  payload: T,
  validators: Array<(model: T) => ValidationError<T>[]>
): { result: T | null; errors: ValidationError<T>[] } {
  const errors = validators.flatMap((validator) => validator(payload));
  return { result: errors.length ? null : payload, errors };
}
