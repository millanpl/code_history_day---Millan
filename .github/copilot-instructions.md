# Instrucciones del Proyecto — dev://history

## Descripción

Aplicación web con estética de terminal retro CRT que muestra efemérides históricas de programación y computación. Todo el contenido está en **español**.

## Stack Tecnológico

- **Framework**: Next.js 16 con App Router (React 19)
- **Lenguaje**: TypeScript (modo estricto)
- **Estilos**: Tailwind CSS 4 con variables CSS en modelo de color OKLCH
- **Componentes UI**: shadcn/ui (estilo "new-york", primitivas Radix UI)
- **Iconos**: Lucide React
- **Fuente**: JetBrains Mono (monoespaciada)

## Convenciones de Código

### Estructura de Directorios

- `app/` — Páginas y layout (App Router de Next.js)
- `components/` — Componentes React propios
- `components/ui/` — Componentes shadcn/ui (no editar manualmente)
- `hooks/` — Custom hooks
- `lib/` — Utilidades y lógica de negocio
- `styles/` — CSS global alternativo (tema claro)
- `public/` — Assets estáticos

### Alias de Importación

Usar siempre alias con `@/` en lugar de rutas relativas:

```ts
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
```

### Nomenclatura de Archivos

- Componentes y hooks: `kebab-case.tsx` / `kebab-case.ts`
- Exportaciones de componentes: `PascalCase`
- Funciones y variables: `camelCase`
- Interfaces/Types: `PascalCase`

### Patrones de Componentes

- Usar **Server Components** por defecto
- Añadir `"use client"` solo cuando sea necesario (interactividad, hooks de estado, efectos)
- Tipar props con `interface` explícita
- Usar `cn()` de `@/lib/utils` para combinar clases de Tailwind

### Estilos y Tema

- Tema oscuro principal con paleta verde/cian terminal (`oklch`)
- Colores por categoría: `yellow-400` (language), `cyan-400` (hardware), `green-400` (software), `blue-400` (internet), `pink-400` (person), `orange-400` (company)
- Animaciones CRT: cursor blink, scanlines, flicker
- Breakpoint responsive: `md` (768px)

## Gestión de Dependencias

- Gestor de paquetes: **pnpm**
- Para añadir componentes shadcn/ui: `npx shadcn@latest add <componente>`

## Idioma

- Todo el contenido visible al usuario debe estar en **español**
- Los comentarios de código y nombres de variables/funciones en **inglés**
