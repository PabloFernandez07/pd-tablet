# Tablet Policial (React + Vite + Tailwind)

Tablet web diseñada para servidores de rol (FiveM) con foco en rendimiento, validaciones y un diseño moderno.

## Instalación rápida
Si ya tienes el repositorio clonado, instala dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
```

Para crear el proyecto desde cero (React + Vite + Tailwind + TypeScript), estos son los pasos base que se usaron:

```bash
npm create vite@latest pd-tablet -- --template react-ts
cd pd-tablet
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install
```

## Scripts disponibles
- `npm run dev`: inicia el servidor de desarrollo de Vite.
- `npm run build`: valida tipos y construye el bundle.
- `npm run preview`: sirve el build generado.
- `npm run lint`: ejecuta ESLint con las reglas recomendadas para React + TypeScript.

## Estilo y componentes clave
- Tailwind con paleta `brand` y sombras para simular un dispositivo.
- `ErrorBoundary` para aislar fallos de renderizado y ofrecer recuperación.
- Formulario de incidentes con validaciones reutilizables (`src/utils/validation.ts`).
- Tablas y paneles preparados para integrarse con datos del servidor FiveM.

## Integración
1. Instala dependencias (`npm install`).
2. Ejecuta `npm run dev` y sirve la tablet dentro del recurso web de FiveM.
3. Sustituye los datos de `src/data/mockData.ts` por llamadas al backend o NUI según tu flujo.
