# ✅ CHECKLIST DE APROBACIÓN - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Introducción

Este checklist es usado por:
1. **Dev** - Antes de hacer commit/push (auto-validación)
2. **Supervisor** - Al revisar PR (validación final)

**Nada se mergea sin pasar este checklist completo.**

---

## 📝 Checklist Pre-Commit (DEV)

### ✅ Código & Convenciones

- [ ] ¿El código sigue naming conventions? (camelCase vars, PascalCase clases)
- [ ] ¿Las funciones tienen nombres descriptivos?
- [ ] ¿Se usa TypeScript strict mode? (sin `any`)
- [ ] ¿Hay imports alfabéticamente ordenados?
- [ ] ¿Se usan solo las tecnologías del stack?
- [ ] ¿No hay código comentado / muerto?
- [ ] ¿Los comentarios explican "por qué", no "qué"?

### ✅ Validaciones de Código

- [ ] ¿Pasa ESLint sin warnings?
  ```bash
  pnpm run lint
  ```
- [ ] ¿Pasa Prettier (código formateado)?
  ```bash
  pnpm run format
  ```
- [ ] ¿Pasa type check?
  ```bash
  pnpm run check-types
  ```
- [ ] ¿Compila sin errores?
  ```bash
  pnpm run build
  ```

### ✅ Testing

- [ ] ¿Todos los tests pasan?
  ```bash
  pnpm run test
  ```
- [ ] ¿La cobertura es ≥ 70%?
  ```bash
  pnpm run test:cov
  ```
- [ ] ¿Hay tests para happy path?
- [ ] ¿Hay tests para error cases?
- [ ] ¿Los tests son significativos? (no triviales)
- [ ] ¿Los tests pasan localmente en CI?

### ✅ Seguridad & Datos

- [ ] ¿NO hay variables de entorno hardcodeadas?
- [ ] ¿NO hay API keys / secretos?
- [ ] ¿NO hay emails/teléfonos reales?
- [ ] ¿NO hay números de tarjeta?
- [ ] ¿NO hay información confidencial de negocio?
- [ ] ¿NO hay URLs/IPs internas?
- [ ] ¿No hay console.log (salvo dev)?

### ✅ Arquitectura & Diseño

- [ ] ¿Sigue Clean/Hexagonal architecture?
- [ ] ¿Cada capa (domain, app, infra, presentation) está clara?
- [ ] ¿Las dependencias van en dirección correcta?
- [ ] ¿Se usan interfaces para inyección de dependencias?
- [ ] ¿DTOs incluyen validaciones?
- [ ] ¿Se manejan errores adecuadamente?

### ✅ BD (si aplica)

- [ ] ¿Schema Prisma fue actualizado?
- [ ] ¿Migraciones están creadas?
- [ ] ¿Los queries son eficientes?
- [ ] ¿No hay N+1 queries?

### ✅ Documentación

- [ ] ¿Hay JSDoc en funciones públicas?
- [ ] ¿README actualizado si hay cambios significativos?
- [ ] ¿DTOs tienen comentarios explicativos?

---

## 🔍 Checklist de Review PR (SUPERVISOR)

### 1️⃣ Información del PR

- [ ] ¿Título es claro y descriptivo?
- [ ] ¿Descripción explica qué y por qué?
- [ ] ¿Se relaciona con issue si existe?
- [ ] ¿Branch naming es correcto? (feature/*, fix/*, etc.)

### 2️⃣ Cambios de Código

- [ ] ¿El código es legible?
- [ ] ¿Sigue convenciones del proyecto?
- [ ] ¿Hay cambios innecesarios?
- [ ] ¿El código es mantenible?
- [ ] ¿Hace lo que promete?

### 3️⃣ Validaciones Automáticas

- [ ] ¿CI pipeline pasó?
  - ESLint ✅
  - Type check ✅
  - Tests ✅
  - Build ✅
- [ ] ¿Coverage report es aceptable?

### 4️⃣ Testing

- [ ] ¿Hay tests para cambios?
- [ ] ¿Tests son significativos?
- [ ] ¿Se cubre happy path?
- [ ] ¿Se cubren error cases?
- [ ] ¿Tests pasan localmente?
- [ ] ¿Cobertura ≥ 70%?

### 5️⃣ Seguridad

- [ ] ¿Sin hardcoded secrets?
- [ ] ¿Sin API keys?
- [ ] ¿Sin datos sensibles?
- [ ] ¿Manejo seguro de entrada?
- [ ] ¿Validaciones de input?
- [ ] ¿Sin SQL injection risk?
- [ ] ¿Sin XSS risk?

### 6️⃣ Arquitectura & Diseño

- [ ] ¿Sigue patrones del proyecto?
- [ ] ¿Inyección de dependencias correcta?
- [ ] ¿Separación de responsabilidades?
- [ ] ¿DTOs validan correctamente?
- [ ] ¿Manejo de errores adecuado?

### 7️⃣ BD (si aplica)

- [ ] ¿Schema Prisma actualizado?
- [ ] ¿Migraciones incluidas?
- [ ] ¿Queries optimizadas?
- [ ] ¿Índices necesarios?

### 8️⃣ Performance

- [ ] ¿Cambios de performance son aceptables?
- [ ] ¿No hay memory leaks?
- [ ] ¿Lazy loading implementado si aplica?
- [ ] ¿Caché usado si corresponde?

### 9️⃣ Documentación

- [ ] ¿Código está documentado (JSDoc)?
- [ ] ¿README actualizado?
- [ ] ¿Cambios de API documentados?
- [ ] ¿Breaking changes comunicados?

### 🔟 Lógica de Negocio

- [ ] ¿Implementa requirements correctamente?
- [ ] ¿No hay bugs obvios?
- [ ] ¿Edge cases handled?
- [ ] ¿Valida datos correctamente?

---

## 📋 Checklist Específico por Tipo de PR

### 🆕 Nueva Funcionalidad

**Adicionales:**
- [ ] ¿Es una feature completa (no WIP)?
- [ ] ¿Todos los endpoints están implementados?
- [ ] ¿Front-end actualizado si aplica?
- [ ] ¿Mobile actualizado si aplica?
- [ ] ¿Migraciones ejecutables?

### 🐛 Bug Fix

**Adicionales:**
- [ ] ¿Issue es claramente relacionado?
- [ ] ¿Bug es reproducible?
- [ ] ¿Fix soluciona el problema?
- [ ] ¿No hay regressions?
- [ ] ¿Hay test que previene re-ocurrencia?

### ♻️ Refactorización

**Adicionales:**
- [ ] ¿Comportamiento es idéntico?
- [ ] ¿Todos los tests pasan?
- [ ] ¿Performance es igual o mejor?
- [ ] ¿API no cambia (backward compatible)?

### 📚 Documentación

**Adicionales:**
- [ ] ¿Markdown está correctamente formateado?
- [ ] ¿Sintaxis/ejemplos son correctos?
- [ ] ¿Información es precisa?

---

## 🚨 Motivos de RECHAZO

### Rechazo Automático (No Mergeable)

- ❌ CI pipeline no pasó
- ❌ Hay datos sensibles / secretos
- ❌ Tests no pasan
- ❌ Cobertura < 70%
- ❌ Errors o warnings críticos en ESLint

### Rechazo Manual (Requerido cambios)

- ❌ Código no sigue convenciones
- ❌ Falta documentación
- ❌ Falta tests significativos
- ❌ Bug logic evidente
- ❌ Performance concerns
- ❌ Seguridad concerns
- ❌ Cambios innecesarios

---

## ✅ Plantilla de Aprobación

Supervisor comenta en PR:

```markdown
## ✅ APROBADO

- [x] Convenciones OK
- [x] Tests OK (75% coverage)
- [x] Seguridad OK
- [x] Arquitectura OK
- [x] Documentación OK
- [x] Performance OK
- [x] Lógica OK

Excelente trabajo. Merging...

Merge hecho a main.
```

---

## ⚠️ Plantilla de "Cambios Requeridos"

Supervisor comenta en PR:

```markdown
## 🔄 CAMBIOS REQUERIDOS

### Crítico

- [ ] Falta test para caso de edge (línea 45)
  Necesitamos test que valide qué pasa cuando email es `null`

### Importante

- [ ] Refactor: `extractEmailValidation()` se repite en 3 archivos
  Por favor extraer a utils compartidos

- [ ] Type: `any` en línea 78
  Usa type específico

### Menor

- [ ] Comentario línea 30 no es claro
- [ ] Nombre variable `u` debería ser `user`

Cuando tengas cambios listos, pushea y pide re-review.
```

---

## 🎯 Flujo de Aprobación

```
1. Dev abre PR
   ↓
2. CI pipeline corre automáticamente
   ├─ ESLint
   ├─ Tests
   ├─ Type check
   └─ Build
   ↓
3. ¿CI passou? 
   ❌ NO → Dev arregla
   ✅ SÍ → Continúa
   ↓
4. Supervisor revisa
   ├─ Código
   ├─ Lógica
   ├─ Tests
   └─ Seguridad
   ↓
5. ¿Aprobación?
   ❌ CAMBIOS REQUERIDOS → Dev ajusta y pushea → Vuelve a paso 4
   ✅ APROBADO → Merge a main
   ↓
6. Cierre de PR + Deploy (automático o manual)
```

---

## 📊 Metrics de Calidad

### Objetivos de Proyecto

- **Cobertura de tests:** ≥ 70%
- **ESLint warnings:** 0
- **Type errors:** 0
- **Build errors:** 0
- **Todos tests pasan:** ✅ Always

### Tracking

Después de cada sprint:

```markdown
| Métrica | Target | Actual | Status |
|---------|--------|--------|--------|
| Test Coverage | 70% | 75% | ✅ |
| ESLint Pass | 100% | 100% | ✅ |
| Type Check | 100% | 100% | ✅ |
| Build Success | 100% | 100% | ✅ |
| PR Approval Time | <1h | 45min | ✅ |
```

---

## 🚀 Antes de Mergear (Final Check)

```bash
# 1. Verificar una última vez
git checkout backend/feed-connection
pnpm run lint
pnpm run test
pnpm run check-types
pnpm run build

# 2. Si todo OK, mergear desde GitHub UI
# o desde línea de comandos:
git checkout main
git pull origin main
git merge --no-ff backend/feed-connection
git push origin main

# 3. Cerrar PR (GitHub lo hace automáticamente)
# 4. Eliminar rama
git branch -d backend/feed-connection
```

---

## 🎯 Resumen

```
✅ DEBE PASAR:
  - ESLint (sin warnings)
  - Tests (100% pass rate)
  - Type check (sin errores)
  - Build (sin errores)
  - Cobertura ≥ 70%
  - Sin secretos/datos sensibles

❌ NO MERGEAR SI:
  - Falla algo de lo anterior
  - Supervisor rechaza
  - Hay dudas sobre lógica
  - Falta documentación
  - Tiene riesgo de seguridad

✅ MERGEAR CUANDO:
  - Todo de arriba OK
  - Supervisor aprueba
  - CI green
  - Código en excelente estado
```

**No exceptions.**
