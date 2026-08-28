# AGENTS.md

Instrucciones de trabajo para agentes de IA (opencode y similares) y para humanos que colaboran con ellos en este repositorio.

## Propósito

Este repositorio se trabaja en modo "coworking IA": un agente de IA colabora con el equipo en tareas de desarrollo, investigación y documentación. Este archivo define **cómo debe trabajar el agente** y **qué reglas debe respetar siempre**.

## Flujo de trabajo obligatorio

1. **Leer primero** `README.md`. Es el documento explicativo del proyecto y además el índice público de las investigaciones que se hicieron previamente.
2. **Consultar `docs/investigaciones/`** (empezar por `00-indice.md`) cuando la tarea toque un tema ya investigado. La investigación es la base de decisiones: no contradecirla sin actualizarla primero.
3. **Registrar decisiones.** Cuando se tome una decisión relevante (arquitectura, librerías, patrón, etc.), registrar hallazgos y conclusión en el archivo de investigación correspondiente (o crear uno nuevo con la plantilla `docs/investigaciones/_plantilla.md`).

## Stack y comandos

- Angular 22 + Angular SSR (Express).
- Gestor de paquetes: **pnpm**. No usar `npm` ni `yarn`.
- Tests: Vitest vía Angular CLI.

| Comando | Descripción |
| --- | --- |
| `pnpm install` | Instalar dependencias |
| `ng serve` | Servidor de desarrollo (`http://localhost:4200/`) |
| `ng build` | Compilar a `dist/` |
| `ng test` | Tests unitarios (Vitest) |
| `npx prettier --write .` | Formatear el código |

## Convenciones del repositorio

- La **documentación** (AGENTS.md, README.md, investigaciones) se escribe en **español**, salvo que se indique lo contrario.
- El **código** sigue las convenciones generadas por Angular CLI y el estilo de Prettier (configuración en `.prettierrc`).
- **No borrar ni reducir** contenido existente de `README.md`. Solo se permite añadir.
- Las investigaciones nuevas se crean copiando `docs/investigaciones/_plantilla.md` y se registran en `docs/investigaciones/00-indice.md` (única fuente de verdad). La sección "Investigaciones previas" de `README.md` enlaza a ese índice.

## Reglas de trabajo colaborativo

- Antes de proponer cambios que afecten arquitectura o decisiones ya investigadas, revisar las investigaciones y actualizarlas con el nuevo contexto.
- Mantener los cambios acotados y guiados por la solicitud del usuario; no sobre-diseñar.
- Al terminar una tarea: verificar tests (`ng test`), formateo (`prettier`) y compilación (`ng build`).
- No hacer commit, push ni PR salvo que el usuario lo pida explícitamente.