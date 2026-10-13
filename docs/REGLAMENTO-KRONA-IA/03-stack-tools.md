# 🛠️ STACK & HERRAMIENTAS OBLIGATORIAS - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Introducción

Este documento especifica **todas** las herramientas y tecnologías que Claude Code y Codex deben usar o respetar al generar código para Krona.

---

## 📦 Stack Técnico de Krona

### Backend

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **NestJS** | 11 | Framework principal |
| **TypeScript** | 5.7 | Lenguaje |
| **PostgreSQL** | Neon serverless | Base de datos |
| **Prisma ORM** | 7.6 | Acceso a BD |
| **@prisma/adapter-neon** | Latest | Adaptador serverless |
| **@nestjs/jwt** | Latest | Autenticación JWT |
| **bcryptjs** | Latest | Hash de contraseñas |
| **class-validator** | Latest | Validación de DTOs |
| **class-transformer** | Latest | Transformación de DTOs |
| **Jest** | Latest | Testing |
| **ts-jest** | Latest | Jest con TypeScript |
| **supertest** | Latest | Testing E2E |

### Frontend (Web)

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Next.js** | 15 | Framework web |
| **React** | 19.1 | UI library |
| **TypeScript** | 5.7 | Lenguaje |
| **CSS Modules** | - | Estilos (*.module.css) |
| **lucide-react** | Latest | Iconos |
| **axios** | Latest | HTTP client |

### Mobile (App)

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Expo** | SDK 54 | Framework |
| **React Native** | 0.81.5 | Framework UI |
| **TypeScript** | 5.7 | Lenguaje |
| **@react-navigation** | Latest | Navegación |
| **react-native-maps** | Latest | Mapas |
| **axios** | Latest | HTTP client |
| **AsyncStorage** | Latest | Almacenamiento local |

### Monorepo & Build

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Turborepo** | Latest | Orquestación monorepo |
| **pnpm** | 9 | Package manager |
| **Node.js** | ≥22 | Runtime |
| **Docker** | Latest | Contenedorización |

---

## 🔍 Linter: ESLint 9

**Estado:** Configurado globalmente en `packages/eslint-config`

### Uso Obligatorio

Todo código generado **DEBE** pasar ESLint sin warnings.

```bash
# Verificar linting
pnpm run lint

# Fijar problemas automáticos
pnpm run lint --fix
```

### Reglas Principales

- ❌ No usar `any`
- ❌ No variables no utilizadas
- ❌ No funciones no utilizadas
- ❌ No imports no utilizados
- ✅ Nombres consistentes (camelCase vars, PascalCase clases)
- ✅ Punto y coma al final de líneas
- ✅ Sin console.log en producción (solo en dev)

### Ejemplo de Validación

```typescript
// ❌ ESLint FALLA
function test() {
  let unused = 5; // Variable no usada
  const any_var: any = null; // Tipo 'any'
  console.log('debug'); // Console log en código
}

// ✅ ESLint PASA
function test(): void {
  const value = 5;
  console.log(value);
}
```

---

## 🎨 Formatter: Prettier

**Estado:** Configurado globalmente en `.prettierrc`

### Uso Obligatorio

Todo código **DEBE** ser formateado con Prettier antes de commit.

```bash
# Formatear todos los archivos
pnpm run format

# Verificar formato sin cambiar
pnpm run format --check
```

### Reglas Principales

- **Ancho de línea:** 80 caracteres
- **Indentación:** 2 espacios
- **Comillas:** Dobles (`"`)
- **Punto y coma:** Sí, siempre
- **Trailing comma:** ES5 (en arrays y objetos)

### Ejemplo Antes vs Después

```typescript
// ANTES (sin Prettier)
function register(dto:RegisterDto){let user=await this.userRepository.create(dto);return{success:true,data:user};}

// DESPUÉS (con Prettier)
function register(dto: RegisterDto) {
  let user = await this.userRepository.create(dto);
  return { success: true, data: user };
}
```

---

## 🧪 Testing: Jest

**Estado:** Configurado en `jest.config.ts` para backend y frontend

### Requisitos de Testing

1. **Unit Tests** (obligatorio para usecases, services)
2. **E2E Tests** (obligatorio para endpoints)
3. **Cobertura mínima:** 70% para módulos nuevos

### Estructura de Tests

```typescript
// archivo: src/modules/auth/application/usecases/register.usecase.spec.ts

import { RegisterUseCase } from './register.usecase';
import { IUserRepository } from '../../domain/user.repository';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    // Setup
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    useCase = new RegisterUseCase(userRepository);
  });

  it('should register a new user', async () => {
    // Arrange
    const dto = { email: 'test@example.com', password: 'pass123', name: 'Test' };
    const expectedUser = { id: '1', ...dto };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(userRepository, 'create').mockResolvedValue(expectedUser);

    // Act
    const result = await useCase.execute(dto);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(userRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw error if email already exists', async () => {
    // Arrange
    const dto = { email: 'existing@example.com', password: 'pass123', name: 'Test' };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({ id: '1', ...dto });

    // Act & Assert
    await expect(useCase.execute(dto)).rejects.toThrow('Email already registered');
  });
});
```

### Ejecución de Tests

```bash
# Ejecutar todos los tests
pnpm run test

# Tests con cobertura
pnpm run test:cov

# Tests en watch mode
pnpm run test:watch

# Tests E2E
pnpm run test:e2e
```

---

## 🔄 Pipeline de Build & Desarrollo

### Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Iniciar en modo dev (todos los apps)
pnpm run dev

# Backend solo
cd apps/backend && pnpm run start:dev

# Frontend solo
cd apps/web && pnpm run dev

# Mobile solo
cd apps/mobile && pnpm run start
```

### Build para Producción

```bash
# Build monorepo completo
pnpm run build

# Build backend
cd apps/backend && pnpm run build

# Build frontend
cd apps/web && pnpm run build
```

### Lint & Type Check

```bash
# Lint todo el monorepo
pnpm run lint

# Type check todo el monorepo
pnpm run check-types

# Format todo el monorepo
pnpm run format
```

### Orden de Validación (IMPORTANTE)

Antes de hacer commit, ejecutar en ESTE orden:

```bash
# 1. Type check
pnpm run check-types

# 2. Lint
pnpm run lint --fix

# 3. Format
pnpm run format

# 4. Tests
pnpm run test

# 5. Solo entonces, hacer commit
git add .
git commit -m "mensaje"
```

---

## 🐳 Docker & Despliegue

### Dockerfile (Backend)

El Dockerfile está configurado con build multi-stage:
1. **Build stage:** Instala deps, compila TypeScript
2. **Runtime stage:** Imagen final slim (node:22-alpine)

```bash
# Build imagen Docker
docker build -t krona-backend:latest .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env krona-backend:latest
```

### docker-compose.yml

Orquesta backend (puerto 3001→3000) y web (3000).

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener
docker-compose down
```

### Despliegue en Render

- **Backend:** Render.com con Docker
- **Frontend:** Vercel (proyecto `krona-app`)
- **BD:** Neon PostgreSQL serverless

---

## 📊 Verificaciones Automáticas

### Pre-Commit (Recomendado)

Instalar Husky + lint-staged para validar antes de commit:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.ts": ["eslint --fix", "prettier --write"],
    "*.tsx": ["eslint --fix", "prettier --write"]
  }
}
```

### CI/CD (GitHub Actions)

Los workflows verifican:
- ✅ ESLint
- ✅ Tests (Jest)
- ✅ Type check (TypeScript)
- ✅ Build success

---

## 🎯 Checklist de Stack Compliance

Antes de generar código, verificar:

- ✅ ¿Usando NestJS para backend?
- ✅ ¿Usando Prisma para BD?
- ✅ ¿DTOs con class-validator?
- ✅ ¿TypeScript strict mode?
- ✅ ✅ ¿Código que pasa ESLint sin warnings?
- ✅ ¿Código formateado con Prettier (2 espacios)?
- ✅ ¿Tests unitarios + E2E para lógica crítica?
- ✅ ¿Sin console.log innecesarios?
- ✅ ¿Imports alfabéticamente ordenados?
- ✅ ¿Cobertura de tests ≥ 70%?
