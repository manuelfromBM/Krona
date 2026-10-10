# 🔐 PERMISOS & ACCESO - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Introducción

Claude Code y Codex tienen **distintos niveles de acceso** según el tipo de tarea. Esto se define como "solo lectura" (read-only) vs "escritura" (write).

---

## 📖 Tareas "SOLO LECTURA"

Claude Code/Codex **PUEDE leer** pero **NO PUEDE modificar**.

### Ejemplos

1. **Analizar código existente**
   ```
   "Claude Code, analiza el módulo de Auth y explica cómo funciona"
   - ✅ Puede: leer archivos, entender lógica
   - ❌ NO puede: modificar código
   ```

2. **Generar reportes de código**
   ```
   "Claude Code, listaMe todas las funciones que usan BD directamente"
   - ✅ Puede: buscar en archivos, reportar
   - ❌ NO puede: cambiar nada
   ```

3. **Revisar documentación**
   ```
   "¿Cuál es el flujo de registro en Auth?"
   - ✅ Puede: leer schema, controllers, usecases
   - ❌ NO puede: modificar archivos
   ```

4. **Entender arquitectura**
   ```
   "¿Cómo se comunican los módulos?"
   - ✅ Puede: analizar estructura
   - ❌ NO puede: refactorizar
   ```

### Cómo Pedir Tareas "Solo Lectura"

```
"Claude Code, necesito que leas src/modules/auth/ y me digas:"
"- Qué archivos existen"
"- Cuál es el flujo de registro"
"- Dónde está hardcodeada la JWT_SECRET (si existe)"
```

### Archivos Disponibles para Leer

✅ Todo archivo del proyecto es **legible**:
- Código fuente (.ts, .tsx)
- Configuraciones (tsconfig, eslint)
- Documentación (.md)
- Schema (prisma/schema.prisma)

---

## ✏️ Tareas "CON ESCRITURA"

Claude Code/Codex **PUEDE crear y modificar** archivos.

### Ejemplos

1. **Crear nuevo módulo**
   ```
   "Claude Code, crea el módulo de Feed con estructura completa"
   - ✅ Puede: crear archivos, organizar carpetas
   - ✅ Puede: implementar usecases, controllers
   - ❌ NO puede: hacer commit/push
   ```

2. **Modificar código existente**
   ```
   "Claude Code, agrega validación de email al DTO RegisterDto"
   - ✅ Puede: modificar dto/register.dto.ts
   - ✅ Puede: actualizar tests
   - ❌ NO puede: hacer commit
   ```

3. **Crear tests**
   ```
   "Escribe tests unitarios para GetProfileUseCase"
   - ✅ Puede: crear archivo .spec.ts
   - ✅ Puede: escribir test cases
   - ❌ NO puede: ejecutar tests (dev sí puede)
   ```

4. **Refactorizar**
   ```
   "Refactoriza el código de LoginUseCase para extraer validaciones"
   - ✅ Puede: modificar archivos
   - ✅ Puede: crear helpers si es necesario
   - ❌ NO puede: cambiar schema sin aprobación
   ```

### Cómo Pedir Tareas "Con Escritura"

```
"Claude Code, implementa lo siguiente:"
"1. Crea UpdateProfileUseCase (actualizar perfil de provider)"
"2. Crea ProfileController con endpoints GET /profile y PUT /profile"
"3. Escribe tests unitarios para ambos"
"4. Valida con Prettier y ESLint"
"5. NO hagas commit, solo genera los archivos"
```

### Archivos que Claude Code PUEDE Crear/Modificar

✅ Archivos de **código de negocio:**
- Entidades (src/modules/*/domain/*.entity.ts)
- Usecases (src/modules/*/application/usecases/*.ts)
- Controllers (src/modules/*/presentation/*.controller.ts)
- DTOs (src/modules/*/presentation/dto/*.ts)
- Repositories (src/modules/*/infrastructure/*.repository.ts)
- Tests (*.spec.ts)

✅ Archivos de **configuración general:**
- Agregar variables a .env.example (SIN valores reales)
- Actualizar documentación (.md)

❌ Archivos que NUNCA puede modificar (ver 01-prohibiciones.md):
- tsconfig.json
- eslintrc.json
- .prettierrc
- jest.config.ts
- prisma/schema.prisma (sin aprobación explícita)
- .env, .env.local
- Dockerfile, docker-compose.yml (sin aprobación)

---

## 🎯 Matriz de Permisos

| Tarea | Lectura | Escritura | Commit | Push |
|-------|---------|-----------|--------|------|
| Analizar código | ✅ | ❌ | ❌ | ❌ |
| Crear módulo | ✅ | ✅ | ❌ | ❌ |
| Modificar código | ✅ | ✅ | ❌ | ❌ |
| Escribir tests | ✅ | ✅ | ❌ | ❌ |
| Refactorizar | ✅ | ✅ | ❌ | ❌ |
| Cambiar schema | ✅ | ⚠️ | ❌ | ❌ |
| Hacer commit | ❌ | ❌ | ❌ | ❌ |
| Hacer push | ❌ | ❌ | ❌ | ❌ |
| Crear ramas | ❌ | ❌ | ❌ | ❌ |

**⚠️ = Requiere aprobación explícita del supervisor**

---

## 🚨 Cambios Que Requieren Aprobación Explícita

### Cambios a prisma/schema.prisma

**Proceso:**
1. Claude Code propone cambio
2. Dev lo revisa
3. Dev contacta supervisor
4. Supervisor aprueba o rechaza
5. Si aprueba, Claude Code implementa

**Ejemplo:**
```
Dev: "Supervisor, Claude Code sugiere agregar modelo 'Review' al schema"
Supervisor: "Sí, agregalo con campos: id, rating, content, serviceId"
Dev: "Claude Code, implementá el modelo con esos campos exactos"
```

### Cambios a archivos de configuración crítica

**Nunca sin aprobación:**
- tsconfig.json
- Dockerfile
- docker-compose.yml
- .github/workflows/

---

## 📝 Plantilla de Tarea

### Para Tareas "Solo Lectura"

```
"Claude Code, necesito que analices:"
"[describir qué analizar]"
"Y me reportes:"
"- [qué quiero saber]"
"- [qué quiero saber]"
"[más preguntas]"
```

### Para Tareas "Con Escritura"

```
"Claude Code, crea:"
"[describir qué crear]"

"Requisitos:"
"- [requisito 1]"
"- [requisito 2]"

"Estructura:"
"[referencia a módulo similar o documento]"

"Validaciones:"
"- Pasa ESLint"
"- Pasa Prettier"
"- Incluye tests"

"NO:"
"- No hagas commit"
"- No uses valores reales de BD"
"- No toques schema.prisma"
```

---

## ✅ Ejemplo de Tarea Completa

### Tarea de Escritura

```
Claude Code, implementa el módulo Profile.

REQUERIMIENTOS:
- Entidad User con campos: id, email, name, bio, avatar_url, role
- Casos de uso:
  * GetProfileUseCase (obtener perfil por ID)
  * UpdateProfileUseCase (actualizar datos)
  * UploadAvatarUseCase (cambiar avatar)
- Endpoints:
  * GET /profile/:id
  * PUT /profile
  * POST /profile/avatar
- DTOs con validaciones completas
- Tests unitarios (mínimo 5 tests por usecase)

REFERENCIAS:
- Sigue la estructura del módulo Auth
- Usa Prisma para BD
- Valida inputs con class-validator

NO HAGAS:
- No modifiques prisma/schema.prisma (ya existe User model)
- No hagas commit
- No uses datos reales en ejemplos
- No hardcodees rutas de upload

ENTREGA:
- Archivos listos en workspace
- Código que pasa ESLint + Prettier
- Tests que pasan todos
```

---

## 🎯 Resumen de Permisos

```
✅ PUEDE:
  - Leer cualquier archivo
  - Crear/modificar código de negocio
  - Escribir tests
  - Refactorizar
  - Crear archivos nuevos
  - Proponer cambios a schema

❌ NO PUEDE:
  - Hacer commit
  - Hacer push
  - Crear ramas
  - Modificar config crítica sin aprobación
  - Acceder a secretos/variables de entorno
  - Usar datos reales
```

---

## 🆘 Si Hay Duda

**Pregunta al supervisor:**
```
"¿Puede Claude Code modificar [archivo]?"
```

**Regla simple:**
- Si está en `/src/modules/*/`, probablemente sí
- Si está en raíz del proyecto, probablemente no
- Si es `.env`, `.yml`, config, probablemente no
- Si es test, documentación, seguro que sí
