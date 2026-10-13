# 📋 REGLAMENTO KRONA - ÍNDICE

**Versión:** 1.0  
**Proyecto:** Krona (SaaS para profesionales independientes y pymes)  
**Herramientas IA:** Claude Code + Codex  
**Lenguaje:** Español  
**Último actualizado:** 2026-10-04

---

## 📚 Documentos del Reglamento

Este reglamento está dividido en múltiples archivos especializados para facilitar consulta por tema. **Todos los documentos son de lectura obligatoria**.

### 🚫 Prohibiciones & Restricciones
- **[01-prohibiciones.md](01-prohibiciones.md)** — Qué NO puede hacer Claude Code / Codex bajo ninguna circunstancia

### 💻 Código & Convenciones
- **[02-convenciones-codigo.md](02-convenciones-codigo.md)** — Naming, estructura, patrones de código para Krona
- **[03-stack-tools.md](03-stack-tools.md)** — Tech stack, herramientas obligatorias (ESLint, Prettier, Jest)
- **[04-arquitectura-modulos.md](04-arquitectura-modulos.md)** — Arquitectura Clean/Hexagonal, estructura de carpetas por módulo

### 🔄 Flujo de Trabajo
- **[05-flujo-trabajo.md](05-flujo-trabajo.md)** — Cómo trabaja el equipo con Claude Code / Codex día a día
- **[06-permisos-acceso.md](06-permisos-acceso.md)** — Tareas de solo lectura vs tareas con escritura

### ✅ Testing & QA
- **[07-testing-obligatorio.md](07-testing-obligatorio.md)** — Requerimientos de testing (Jest, unit, e2e)
- **[09-checklist-approval.md](09-checklist-approval.md)** — Qué valida el review humano antes de merge

### 🔐 Seguridad & Datos
- **[08-datos-sensibles.md](08-datos-sensibles.md)** — Datos sensibles, variables de entorno, secretos

---

## 👥 Equipo & Responsabilidades

**Supervisores:**
- Manuel Díaz (CTO)

**Desarrolladores:**
- Dev 1: Claude Code (módulo asignado)
- Dev 2: Codex (módulo asignado)

**Proceso:**
1. Dev solicita tarea a Claude Code / Codex
2. IA genera/modifica código en archivo local
3. Dev revisa código localmente + ejecuta tests
4. Dev hace commit/push manualmente
5. PR abierto → Supervisor revisa
6. Approve + Merge a main

---

## 🎯 Principios Fundamentales

1. **No autonomía de versión control**
   - ❌ Claude NO puede hacer commit
   - ❌ Claude NO puede hacer push
   - ❌ Claude NO puede crear ramas
   - ✅ Claude PUEDE generar código en archivos

2. **Seguridad primero**
   - ❌ No variables de entorno
   - ❌ No secretos / API keys
   - ❌ No datos sensibles

3. **Código consistente**
   - ✅ Sigue convenciones de Krona
   - ✅ Pasa ESLint + Prettier
   - ✅ Incluye tests obligatorios

4. **Revisión humana obligatoria**
   - ✅ Todo código pasa por review
   - ✅ QA valida antes de merge
   - ✅ Supervisor aprueba

---

## 🔗 Stack de Krona

- **Backend:** NestJS 11 + TypeScript 5.7
- **Frontend:** Next.js 15 + React 19.1
- **Mobile:** Expo SDK 54 + React Native 0.81.5
- **BD:** PostgreSQL + Prisma ORM v7.6
- **Monorepo:** Turborepo + pnpm 9
- **Contenedor:** Docker multi-stage

---

## 📖 Cómo usar este reglamento

- **Antes de empezar:** Lee [01-prohibiciones.md](01-prohibiciones.md) + [02-convenciones-codigo.md](02-convenciones-codigo.md)
- **Para crear features:** Consulta [04-arquitectura-modulos.md](04-arquitectura-modulos.md) + [05-flujo-trabajo.md](05-flujo-trabajo.md)
- **Antes de pedir review:** Valida [07-testing-obligatorio.md](07-testing-obligatorio.md) + [09-checklist-approval.md](09-checklist-approval.md)
- **En caso de duda sobre datos:** Revisa [08-datos-sensibles.md](08-datos-sensibles.md)
