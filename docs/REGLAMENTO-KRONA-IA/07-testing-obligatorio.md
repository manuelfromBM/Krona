# 🧪 TESTING OBLIGATORIO - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Introducción

Todos los módulos nuevos **DEBEN incluir tests**. No hay excepciones.

---

## 📊 Requisitos de Testing

### Cobertura Mínima

- **Nuevos módulos:** 70% cobertura mínima
- **Usecases:** 100% (crítico para lógica de negocio)
- **Controllers:** 80% (incluir happy path + errores)
- **Repositories:** 70% (mínimo lectura/escritura)

### Tipos de Tests Obligatorios

1. **Unit Tests** (Jest)
   - Testear cada función en aislamiento
   - Usar mocks para dependencias
   - Archivo: `{archivo}.spec.ts`

2. **Integration Tests** (opcional pero recomendado)
   - Testear módulos juntos
   - Usar BD real o testeable

3. **E2E Tests** (obligatorio para endpoints)
   - Testear flujo completo (HTTP request → respuesta)
   - Usar supertest
   - Archivo: `{endpoint}.e2e.spec.ts`

---

## 🎯 Ejemplo: Tests para RegisterUseCase

### Estructura de Archivo

```typescript
// src/modules/auth/application/usecases/register.usecase.spec.ts

import { RegisterUseCase } from './register.usecase';
import { IUserRepository } from '../../domain/user.repository';
import { RegisterDto } from '../../presentation/dto/register.dto';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let userRepository: IUserRepository;

  // Setup antes de cada test
  beforeEach(() => {
    // Crear mocks
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;

    // Instanciar usecase
    useCase = new RegisterUseCase(userRepository);
  });

  // TEST 1: Happy path (flujo exitoso)
  describe('execute', () => {
    it('should register a new user with valid data', async () => {
      // ARRANGE (preparar datos)
      const dto: RegisterDto = {
        email: 'newuser@example.com',
        password: 'SecurePass123',
        name: 'John Doe',
      };

      const expectedUser = {
        id: 'user_123',
        email: dto.email,
        name: dto.name,
        role: 'CLIENT',
        createdAt: new Date(),
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockResolvedValue(expectedUser);

      // ACT (ejecutar)
      const result = await useCase.execute(dto);

      // ASSERT (validar)
      expect(result).toEqual(expectedUser);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: dto.email, name: dto.name })
      );
    });

    // TEST 2: Email duplicado
    it('should throw error if email already exists', async () => {
      // ARRANGE
      const dto: RegisterDto = {
        email: 'existing@example.com',
        password: 'SecurePass123',
        name: 'Duplicate User',
      };

      const existingUser = {
        id: 'existing_user',
        email: dto.email,
        name: 'Other User',
        role: 'CLIENT',
        createdAt: new Date(),
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(existingUser);

      // ACT & ASSERT
      await expect(useCase.execute(dto)).rejects.toThrow(
        'Email already registered'
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    // TEST 3: Password vacío
    it('should throw error if password is empty', async () => {
      const dto: RegisterDto = {
        email: 'test@example.com',
        password: '',
        name: 'Test User',
      };

      // Validación de DTO debería fallar antes (class-validator)
      // Pero podemos testar el usecase también
      await expect(useCase.execute(dto)).rejects.toThrow();
    });

    // TEST 4: Nombre vacío
    it('should throw error if name is empty', async () => {
      const dto: RegisterDto = {
        email: 'test@example.com',
        password: 'SecurePass123',
        name: '',
      };

      await expect(useCase.execute(dto)).rejects.toThrow();
    });

    // TEST 5: Email inválido
    it('should throw error if email format is invalid', async () => {
      const dto: RegisterDto = {
        email: 'invalid-email',
        password: 'SecurePass123',
        name: 'Test User',
      };

      // El DTO debería rechazar esto con class-validator
      // Pero lo testeamos también
      await expect(useCase.execute(dto)).rejects.toThrow();
    });
  });
});
```

---

## 🔍 Tests para Controller (E2E)

```typescript
// src/modules/auth/presentation/auth.controller.e2e.spec.ts

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('AuthController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return JWT token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'testuser@example.com',
          password: 'SecurePass123',
          name: 'Test User',
        })
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data.id');
      expect(response.body.data.email).toBe('testuser@example.com');
    });

    it('should return 400 if email already exists', async () => {
      // Primero registrar
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePass123',
          name: 'First User',
        });

      // Intentar duplicar
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'DifferentPass123',
          name: 'Second User',
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toContain('already');
    });

    it('should return 400 if password is too short', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'shortpass@example.com',
          password: '123',
          name: 'Test User',
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});
```

---

## 🏗️ Tests para Repository (Unit)

```typescript
// src/modules/auth/infrastructure/prisma-user.repository.spec.ts

import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../../domain/user.entity';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    // Mock Prisma
    prismaService = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as any;

    repository = new PrismaUserRepository(prismaService);
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'hashed_password',
        name: 'Test User',
        role: 'CLIENT',
      });

      const dbResult = {
        id: 'user_123',
        ...user,
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(dbResult);

      const result = await repository.create(user);

      expect(result.email).toBe('test@example.com');
      expect(prismaService.user.create).toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const dbResult = {
        id: 'user_123',
        email: 'test@example.com',
        password: 'hashed',
        name: 'Test User',
        role: 'CLIENT',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(dbResult);

      const result = await repository.findByEmail('test@example.com');

      expect(result).toBeDefined();
      expect(result.email).toBe('test@example.com');
    });

    it('should return null if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await repository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });
});
```

---

## 📋 Checklist de Testing

Antes de generar código, Claude Code debe:

- ✅ Crear archivo `.spec.ts` para cada clase/función
- ✅ Mínimo 5 test cases por entidad importante
- ✅ Cubrir happy path (flujo exitoso)
- ✅ Cubrir error cases (qué pasa cuando falla)
- ✅ Usar mocks para dependencias
- ✅ Usar `describe` y `it` para organizar
- ✅ Nombre de tests claro y descriptivo
- ✅ Arrange-Act-Assert pattern
- ✅ Tests pasan localmente
- ✅ Cobertura ≥ 70%

---

## 🚀 Ejecutar Tests Localmente

```bash
# Ejecutar todos los tests
pnpm run test

# Tests de módulo específico
pnpm run test --testPathPattern=auth

# Watch mode (ejecutar en cada cambio)
pnpm run test:watch

# Con cobertura
pnpm run test:cov

# E2E tests
pnpm run test:e2e
```

---

## 📊 Reporte de Cobertura

Después de ejecutar tests con cobertura:

```bash
pnpm run test:cov
```

**Esperado:**
```
Module Name          | % Statements | % Branch | % Functions | % Lines
All files            |        70.5  |     68.2 |        72.1 |    70.5
├─ auth              |        85.0  |     80.0 |        90.0 |    85.0
└─ feed              |        65.0  |     60.0 |        70.0 |    65.0
```

---

## ✅ Plantilla de PR con Testing

```markdown
## Tests

- [x] Tests unitarios para usecases
- [x] Tests E2E para endpoints
- [x] Cobertura ≥ 70%
- [x] Todos los tests pasan

## Cobertura

```
RegisterUseCase:      100%
LoginUseCase:         100%
AuthController:        85%
PrismaUserRepository:  75%
```

## Cómo ejecutar tests

```bash
pnpm run test --testPathPattern=auth
pnpm run test:e2e
```
```

---

## 🎯 Requisitos Finales

**Todo código nuevo DEBE:**
- ✅ Tener tests escritos
- ✅ Pasar todos los tests localmente
- ✅ Tener cobertura ≥ 70%
- ✅ Usar mocks apropiados
- ✅ Testar happy path + error cases
- ✅ Ser ejecutable con `pnpm run test`

**Sin excepciones.**
