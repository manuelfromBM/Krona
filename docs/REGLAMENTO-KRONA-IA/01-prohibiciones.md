# 🚫 PROHIBICIONES - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Prohibiciones Absolutas

Estas acciones **NUNCA** pueden ser ejecutadas por Claude Code o Codex, bajo ninguna circunstancia, sin importar el contexto, urgencia o justificación.

---

## 🔐 1. Control de Versiones

### ❌ NO PUEDE

- **Hacer commits**
  ```bash
  # PROHIBIDO
  git commit -m "mensaje"
  git commit --amend
  ```

- **Hacer push**
  ```bash
  # PROHIBIDO
  git push
  git push --force
  git push origin branch
  ```

- **Crear ramas**
  ```bash
  # PROHIBIDO
  git checkout -b nueva-rama
  git branch nueva-rama
  ```

- **Cambiar de rama**
  ```bash
  # PROHIBIDO
  git checkout nombre-rama
  git switch nombre-rama
  ```

- **Hacer merge**
  ```bash
  # PROHIBIDO
  git merge rama
  git rebase rama
  ```

### ✅ SÍ PUEDE

- **Ver estado del repositorio**
  ```bash
  git status
  git log --oneline
  ```

- **Ver historial de cambios**
  ```bash
  git diff
  git show commit-id
  ```

---

## 🔑 2. Variables de Entorno & Secretos

### ❌ NO PUEDE

- **Acceder a .env, .env.local, .env.production**
  ```typescript
  // PROHIBIDO - No leer ni escribir
  import.meta.env.VITE_API_URL
  process.env.DATABASE_URL
  process.env.JWT_SECRET
  ```

- **Hardcodear variables de entorno en código**
  ```typescript
  // PROHIBIDO
  const apiKey = "sk-1234567890abcdef";
  const dbUrl = "postgres://user:pass@host:5432/db";
  ```

- **Usar variables de entorno en ejemplos/docs**
  ```typescript
  // PROHIBIDO
  // database connection:
  // DATABASE_URL=postgres://prod-user:prod-pass@prod-host/krona_prod
  ```

- **Crear, modificar o leer archivos de configuración sensibles**
  ```
  .env
  .env.local
  .env.*.local
  .env.production
  .env.staging
  docker-compose.override.yml (si contiene secretos)
  ```

### ✅ SÍ PUEDE

- **Usar variables de entorno nominales en código**
  ```typescript
  // PERMITIDO - Sin valor real
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dbUrl = process.env.DATABASE_URL;
  ```

- **Documentar estructura esperada**
  ```typescript
  // PERMITIDO - Sin valores reales
  // Required environment variables:
  // - DATABASE_URL: PostgreSQL connection string
  // - JWT_SECRET: Secret key for JWT signing
  // - STRIPE_SECRET_KEY: Stripe API secret
  ```

- **Mencionar que existen secretos sin revelarlos**
  ```typescript
  // PERMITIDO
  // Note: API keys are stored in .env and loaded at runtime
  ```

---

## 👤 3. Datos Sensibles de Usuarios

### ❌ NO PUEDE

- **Usar datos reales de usuarios en ejemplos**
  ```typescript
  // PROHIBIDO
  const users = [
    { id: 1, email: "user@example.com", phone: "911234567" },
    { id: 2, email: "admin@krona.cl", phone: "922334455" }
  ];
  ```

- **Incluir IDs de usuario reales en seeders**
  ```typescript
  // PROHIBIDO
  const appointments = [
    { userId: 123456, providerId: 789012, ... },
    { userId: 234567, providerId: 890123, ... }
  ];
  ```

- **Usar direcciones de correo reales en tests o documentación**
  ```typescript
  // PROHIBIDO
  test('login with user@gmail.com', () => { ... })
  ```

- **Hardcodear números de teléfono reales**
  ```typescript
  // PROHIBIDO
  const contact = "+56912345678";
  ```

### ✅ SÍ PUEDE

- **Usar datos ficticios claramente marcados**
  ```typescript
  // PERMITIDO
  const testUser = {
    id: "user_test_001",
    email: "test@example.com",
    phone: "+56999999999"
  };
  ```

- **Usar patrones estándar para testing**
  ```typescript
  // PERMITIDO
  const mockUser = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    email: "user@example.com",
    phone: "+5691234567"
  };
  ```

---

## 📦 4. Dependencias & Paquetes

### ❌ NO PUEDE

- **Instalar dependencias sin aprobación**
  ```bash
  # PROHIBIDO
  npm install nueva-libreria
  pnpm add package
  ```

- **Usar librerías no autorizadas para Krona**
  ```typescript
  // PROHIBIDO - Si no está en el stack de Krona
  import Vue from 'vue'; // Krona usa React
  import { DataTypes } = require('sequelize'); // Krona usa Prisma
  ```

- **Modificar package.json versiones críticas**
  ```json
  {
    "dependencies": {
      "nestjs": "11.0.0",  // NO cambiar sin aprobación
      "react": "19.1.0"    // NO cambiar sin aprobación
    }
  }
  ```

### ✅ SÍ PUEDE

- **Sugerir librerías necesarias**
  ```
  Propongo usar 'class-validator' para validaciones (ya está en package.json)
  ```

- **Verificar qué dependencias están disponibles**
  ```bash
  cat package.json
  ```

---

## 🔧 5. Archivos de Configuración Críticos

### ❌ NO PUEDE MODIFICAR

- **tsconfig.json** (configuración TypeScript)
- **eslintrc.json** (reglas de linting)
- **.prettierrc** (reglas de formateo)
- **jest.config.ts** (configuración de testing)
- **next.config.ts** (configuración Next.js)
- **nest-cli.json** (configuración NestJS)
- **turbo.json** (configuración Turborepo)
- **prisma/schema.prisma** (esquema de BD) - sin aprobación previa
- **pnpm-workspace.yaml** (configuración monorepo)
- **Dockerfile** (contenedorización)
- **.github/workflows/** (CI/CD)

### ✅ SÍ PUEDE

- **Leer para entender estructura**
  ```bash
  cat tsconfig.json
  ```

- **Sugerir cambios específicos** (sin implementarlos)
  ```
  Para soportar decoradores, necesitamos cambiar:
  "experimentalDecorators": true en tsconfig.json
  ```

---

## 🗄️ 6. Base de Datos & Prisma

### ❌ NO PUEDE

- **Modificar schema.prisma sin validación**
  ```prisma
  // PROHIBIDO - Sin aprobación de supervisor
  model Post {
    id Int @id @default(autoincrement())
    content String
  }
  ```

- **Ejecutar migraciones**
  ```bash
  # PROHIBIDO
  npx prisma migrate dev
  npx prisma migrate deploy
  npx prisma db push
  ```

- **Borrar datos**
  ```bash
  # PROHIBIDO
  npx prisma db seed (si borra datos existentes)
  ```

- **Conectarse directo a BD de producción**
  ```bash
  # PROHIBIDO
  psql postgresql://prod-user:pass@prod-host/krona_prod
  ```

### ✅ SÍ PUEDE

- **Leer schema actual**
  ```bash
  cat prisma/schema.prisma
  ```

- **Generar código Prisma**
  ```bash
  npx prisma generate
  ```

- **Proponer cambios de schema**
  ```
  Sugerencia: agregar modelo Post con campos id, content, createdAt
  ```

---

## 🔍 7. Datos Sensibles de Negocio

### ❌ NO PUEDE

- **Incluir precios reales de suscripción**
- **Usar números reales de clientes / ingresos**
- **Incluir estimaciones de financiamiento**
- **Revelar partners / clientes específicos**
- **Usar métricas reales de la plataforma**

### ✅ SÍ PUEDE

- **Usar valores ficticios claramente marcados**
  ```typescript
  // Ejemplo de estructura de suscripción (valores ficticios)
  const plans = [
    { name: 'Basic', price: 99 }, // demo price
    { name: 'Pro', price: 199 }    // demo price
  ];
  ```

---

## 🚨 8. Acceso a Sistemas Externos

### ❌ NO PUEDE

- **Hacer llamadas a APIs reales con credenciales**
  ```typescript
  // PROHIBIDO
  const response = await fetch('https://stripe.com/api/...', {
    headers: { Authorization: `Bearer ${STRIPE_SECRET}` }
  });
  ```

- **Conectarse a servicios externos sin permiso**
- **Enviar datos reales a servicios de terceros**

### ✅ SÍ PUEDE

- **Crear código para llamadas API sin credenciales**
  ```typescript
  // PERMITIDO
  const response = await apiClient.get('/payments', {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  });
  ```

---

## 📋 Resumen de Prohibiciones

| Categoría | NO | SÍ |
|-----------|----|----|
| **Git** | commit, push, branch | status, log, diff |
| **Secretos** | .env, hardcode keys | usar variables nominales |
| **Datos usuarios** | emails/phones reales | test@example.com |
| **BD** | migrate, seed, connect prod | leer schema, generate |
| **Config crítica** | modificar tsconfig, eslint | leer, sugerir cambios |
| **Versiones** | cambiar @nestjs, @react | verificar qué hay |

---

## ⚠️ Consecuencias de Violar Prohibiciones

Si Claude Code o Codex viola cualquiera de estas prohibiciones:

1. **Parada inmediata del trabajo**
2. **Dev supervisor revisa el cambio**
3. **Revert de cambios si es necesario**
4. **Revisión de instrucciones**
5. **Reinicio de la tarea**

---

## ❓ Dudas

Si hay duda sobre si algo es permitido:
- **Contactar a supervisor (Manuel)**
- **Consultar documento específico** (03-stack-tools.md, 08-datos-sensibles.md)
- **Errar por el lado de la cautela**

**Mejor pedir permiso que actuar sin autorización.**
