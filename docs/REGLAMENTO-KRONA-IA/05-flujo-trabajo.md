# 🔄 FLUJO DE TRABAJO - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Proceso General: Dev + Claude Code/Codex

```
┌──────────────────────────────────────────────────────────────┐
│ 1. DEV SOLICITA TAREA A CLAUDE CODE / CODEX                 │
│    "Crea el controller de feed con endpoints"               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. CLAUDE CODE / CODEX GENERA CÓDIGO                         │
│    - Respeta convenciones                                    │
│    - Incluye tests                                           │
│    - Pasa ESLint + Prettier                                  │
│    - Código en archivos locales (sin commit)                 │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. DEV REVISA CÓDIGO LOCALMENTE                              │
│    - Abre archivos generados                                 │
│    - Ejecuta tests: pnpm run test                            │
│    - Valida ESLint: pnpm run lint                            │
│    - Verifica typing: pnpm run check-types                   │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 4a. ¿APROBACIÓN?                                             │
│                                                              │
│    ❌ NO → Pide cambios a Claude Code                        │
│       └─> Claude Code ajusta código                         │
│       └─> Vuelve a paso 3                                   │
│                                                              │
│    ✅ SÍ → Continúa a paso 4b                               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 4b. DEV COMMIT & PUSH MANUALMENTE                            │
│    git add .                                                 │
│    git commit -m "feat: add feed module"                     │
│    git push origin backend/feed-connection                   │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. ABRIR PULL REQUEST                                        │
│    - Título claro                                            │
│    - Descripción de cambios                                  │
│    - Checklist de validaciones                               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. SUPERVISOR REVISA (Manuel)                                │
│    - Valida convenciones                                     │
│    - Valida tests                                            │
│    - Valida que no haya secretos                             │
│    - Valida lógica de negocio                                │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 6a. ¿APROBACIÓN?                                             │
│                                                              │
│    ❌ CAMBIOS REQUERIDOS                                     │
│       └─> Dev hace cambios                                  │
│       └─> Vuelve a solicitar review (push updates)          │
│       └─> Vuelve a paso 6                                   │
│                                                              │
│    ✅ APROBADO                                               │
│       └─> Continúa a paso 7                                 │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 7. MERGE A MAIN                                              │
│    git merge --squash (opcional)                             │
│    Código en producción                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📋 Paso 1: Cómo Solicitar Tarea a Claude Code

### Formato Claro

**Ejemplo 1 - Crear un módulo:**
```
Tarea: Crea el módulo de Feed para el backend
Requisitos:
- Entidad Post (id, content, authorId, createdAt)
- Casos de uso: CreatePost, ListFeed, LikePost
- Controller con endpoints POST, GET, PUT
- Tests unitarios para cada caso de uso
- DTOs para validación
- Sigue arquitectura Clean/Hexagonal
Módulo anterior: Auth (referencia)
```

**Ejemplo 2 - Crear un componente:**
```
Tarea: Crea el componente FeedCard en Next.js
Requisitos:
- Acepta prop post (Post object)
- Muestra: autor, contenido, fecha
- Botones: Like, Comentar, Guardar
- Estilos: CSS Module
- Responsive (mobile-first)
```

### Información a Incluir

- ✅ Qué crear (entidad, componente, función)
- ✅ Requisitos específicos
- ✅ Stack a usar (o referencia a módulo similar)
- ✅ Archivos o directorios base
- ✅ Cambios en BD (si aplica)

---

## 📝 Paso 3: Cómo Revisar Código Localmente

### Checklist de Revisión

```bash
# 1. Ver los archivos generados
# Abrir en tu IDE y leer el código

# 2. Ejecutar type check
pnpm run check-types
# ✅ Debe decir "no errors"

# 3. Ejecutar linting
pnpm run lint
# ✅ Debe pasar sin warnings

# 4. Ejecutar tests
pnpm run test --testPathPattern=feed
# ✅ Todos los tests deben pasar (100% pass rate)

# 5. Format (por si acaso)
pnpm run format

# 6. Ver cambios
git diff

# 7. Compilar (build)
pnpm run build
# ✅ Debe compilar sin errores
```

### Qué Buscar

- ✅ ¿Sigue convenciones de naming?
- ✅ ¿Hay console.log de depuración?
- ✅ ¿Los comentarios explican "por qué"?
- ✅ ¿Los DTOs validan correctamente?
- ✅ ¿Los tests tienen buena cobertura?
- ✅ ¿El código es legible y mantenible?
- ✅ ¿Hay imports no usados?
- ✅ ¿El orden de parámetros es lógico?

---

## ❌ Cómo Pedir Cambios

Si algo no está bien, **comunica claramente**:

**Ejemplo:**
```
Claude Code, por favor ajusta:
1. El DTO CreatePostDto no valida 'content' (debe tener minLength)
2. El usecase está faltando manejo de error cuando autor no existe
3. El test de ListFeed debería probar paginación
4. Hay console.log en el controller (línea 45) que debe removerse
```

---

## ✅ Paso 4b: Cómo Hacer Commit & Push

### Paso a Paso

```bash
# 1. Ver cambios
git status

# 2. Agregar archivos
git add .

# 3. Ver diff antes de commitar
git diff --cached

# 4. Hacer commit con mensaje descriptivo
git commit -m "feat: implement feed module with CRUD operations"

```

### Mensaje de Commit

**Formato:**
```
<tipo>: <descripción corta>

<descripción larga (opcional)>
```

**Tipos permitidos:**
- `feat:` Nueva funcionalidad
- `fix:` Bug fix
- `refactor:` Refactorización sin cambios funcionales
- `docs:` Cambios en documentación
- `test:` Nuevos tests
- `chore:` Cambios de tooling, deps, etc.

**Ejemplos:**
```
feat: add feed module with post creation and listing
feat: implement JWT authentication with bcrypt hashing
fix: validate appointment availability before booking
refactor: extract common validation logic to util
test: add unit tests for RegisterUseCase
```

---

## 📤 Paso 5: Cómo Abrir Pull Request

### En GitHub

1. **Ir a repository**
2. **Click en "Pull requests"**
3. **Click en "New pull request"**
4. **Seleccionar rama:** `backend/feed-connection` → `main`
5. **Llenar título y descripción**

### Plantilla de PR

```markdown
## 🎯 Objetivo
Implementar módulo de Feed para permitir que proveedores publiquen servicios.

## 📝 Cambios
- [x] Agregué modelo Post a Prisma
- [x] Implementé CreatePostUseCase
- [x] Implementé ListFeedUseCase
- [x] Creé endpoints POST /feed y GET /feed
- [x] Escribí tests unitarios y E2E

## 🔗 Relacionado
Fixes #123 (si hay issue)

## ✅ Checklist
- [x] Tests pasan localmente
- [x] ESLint sin warnings
- [x] Prettier aplicado
- [x] TypeScript type check OK
- [x] Sin hardcoded secrets
- [x] Sin console.log
- [x] Documentación actualizada (si aplica)

## 📸 Screenshots (si aplica UI)
[Agregar capturas]
```

---

## 🔍 Paso 6: Qué Valida el Supervisor

### Checklist de Review (Manuel)

- ✅ **Convenciones:** ¿Nombres en camelCase, estructura correcta?
- ✅ **Tests:** ¿Cobertura ≥ 70%, tests significativos?
- ✅ **Seguridad:** ¿Sin secretos, variables de env correctas?
- ✅ **Lógica:** ¿La lógica de negocio es correcta?
- ✅ **BD:** ¿Schema Prisma actualizado si aplica?
- ✅ **Errores:** ¿Manejo de errores adecuado?
- ✅ **Documentación:** ¿Código documentado?
- ✅ **Performance:** ¿Consultas a BD optimizadas?

---

## 🎯 Módulos Asignados a Devs

### Dev 1 (Claude Code)

**Módulos:**
- Auth (continuar: login, logout, refresh, get-profile)
- Profile (implementación completa)

**Flujo:**
1. Dev1 pide tarea a Claude Code
2. Claude Code genera código
3. Dev1 revisa y da feedback
4. Dev1 hace push

### Dev 2 (Codex)

**Módulos:**
- Feed (implementación completa)
- Booking (implementación completa)

**Flujo:**
1. Dev2 pide tarea a Codex
2. Codex genera código
3. Dev2 revisa y da feedback
4. Dev2 hace push

---

## 💬 Comunicación

### Canales

- **Tarea específica:** "Claude Code, [descripción]"
- **Feedback:** "Claude Code, por favor ajusta:"
- **Questions:** "¿Cuál es la mejor forma de implementar X?"
- **Bloqueado:** Contactar supervisor (Manuel)

### Ejemplo de Iteración

```
Dev1: "Claude Code, crea el RegisterUseCase"
Claude Code: [Genera código]
Dev1: [Revisa]
Dev1: "El test no valida contraseña débil. Agregá un test para eso."
Claude Code: [Ajusta test]
Dev1: [Revisa nuevamente]
Dev1: "Perfect! Está listo para commit."
Dev1: [Hace commit y push]
Dev1: [Abre PR]
Supervisor: [Revisa PR]
Supervisor: "Aprobado, mergeado."
```

---

## 🚫 Problemas Comunes

### Si tests no pasan

```
Dev: "Los tests fallan. ¿Qué está mal?"
Claude Code: "El test intenta crear usuario sin BD. Necesitamos mock."
Dev: "Ajustá los mocks entonces."
Claude Code: [Genera código corregido]
```

### Si hay conflicts en PR

1. Dev hace `git pull origin main` localmente
2. Dev resuelve conflictos
3. Dev hace `git push` nuevamente
4. PR se actualiza automáticamente

### Si supervisor rechaza cambios

1. Supervisor comenta específicamente qué cambiar
2. Dev pide a Claude Code que ajuste
3. Dev hace nuevo commit
4. PR se actualiza
5. Supervisor revisa nuevamente

---

## 🎯 Resumen

```
🔄 Ciclo completo:
  1. Dev solicita → 
  2. Claude Code genera → 
  3. Dev revisa → 
  4. Dev commit/push → 
  5. PR abierto → 
  6. Supervisor review → 
  7. Merge a main
```

**Duración típica:** 1-3 horas por feature pequeña
