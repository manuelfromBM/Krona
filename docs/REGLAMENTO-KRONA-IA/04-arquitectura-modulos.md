# 🏗️ ARQUITECTURA & MÓDULOS - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Arquitectura General

Krona usa **Arquitectura Clean/Hexagonal** por módulo. Esto separa responsabilidades y hace el código testeable y mantenible.

---

## 📐 Capas Clean Architecture

```
┌─────────────────────────────────────────┐
│      PRESENTATION (Controllers)         │  <- HTTP Requests
├─────────────────────────────────────────┤
│    APPLICATION (UseCases)               │  <- Lógica de negocio
├─────────────────────────────────────────┤
│    DOMAIN (Entities, Repositories)      │  <- Reglas de negocio
├─────────────────────────────────────────┤
│   INFRASTRUCTURE (Implementaciones)     │  <- BD, APIs externas
└─────────────────────────────────────────┘
```

### 1️⃣ DOMAIN (Núcleo del negocio)

**Responsabilidad:** Define qué es una entidad y cómo debe comportarse.

```typescript
// src/modules/auth/domain/user.entity.ts
export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'CLIENT' | 'PROVIDER';
  createdAt: Date;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  // Métodos de negocio
  isProvider(): boolean {
    return this.role === 'PROVIDER';
  }

  isEmailValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
```

```typescript
// src/modules/auth/domain/user.repository.ts
export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}
```

### 2️⃣ APPLICATION (Casos de uso)

**Responsabilidad:** Implementa la lógica de negocio específica.

```typescript
// src/modules/auth/application/usecases/register.usecase.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository';
import { RegisterDto } from '../../presentation/dto/register.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterDto): Promise<User> {
    // 1. Validar que email no existe
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // 2. Hashear password
    const hashedPassword = await bcryptjs.hash(dto.password, 10);

    // 3. Crear usuario
    const user = new User({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      role: 'CLIENT', // Default
      createdAt: new Date(),
    });

    // 4. Guardar en BD
    return await this.userRepository.create(user);
  }
}
```

### 3️⃣ INFRASTRUCTURE (Implementaciones técnicas)

**Responsabilidad:** Implementa cómo accedemos a los datos (BD, APIs externas, etc).

```typescript
// src/modules/auth/infrastructure/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
      },
    });

    return new User(created);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? new User(user) : null;
  }

  // Implementar otros métodos...
}
```

### 4️⃣ PRESENTATION (Controllers & DTOs)

**Responsabilidad:** Recibe requests HTTP y responde.

```typescript
// src/modules/auth/presentation/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUseCase } from '../../application/usecases/register.usecase';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.registerUseCase.execute(dto);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

```typescript
// src/modules/auth/presentation/dto/register.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}
```

---

## 🔗 Dependencia Injection (Module)

Conectar todo con NestJS:

```typescript
// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { RegisterUseCase } from './application/usecases/register.usecase';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { IUserRepository } from './domain/user.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    {
      provide: IUserRepository, // Token de inyección
      useClass: PrismaUserRepository,
    },
  ],
  exports: [IUserRepository, RegisterUseCase],
})
export class AuthModule {}
```

Importar en `app.module.ts`:

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

---

## 🧩 Estructura Completa de un Módulo

```
src/modules/{nombre}/
├── application/
│   └── usecases/
│       ├── create-{entidad}.usecase.ts
│       ├── create-{entidad}.usecase.spec.ts
│       ├── update-{entidad}.usecase.ts
│       ├── delete-{entidad}.usecase.ts
│       └── get-{entidad}.usecase.ts
├── domain/
│   ├── {entidad}.entity.ts
│   ├── {entidad}.repository.ts
│   └── {entidad}.spec.ts
├── infrastructure/
│   ├── prisma-{entidad}.repository.ts
│   └── prisma-{entidad}.repository.spec.ts
├── presentation/
│   ├── {nombre}.controller.ts
│   ├── {nombre}.controller.spec.ts
│   └── dto/
│       ├── create-{entidad}.dto.ts
│       ├── update-{entidad}.dto.ts
│       └── {entidad}-response.dto.ts
├── {nombre}.module.ts
└── {nombre}.service.ts (opcional)
```

---

## 📊 Módulos Actuales de Krona

### ✅ Auth (FUNCIONAL)

**Estado:** Registro implementado

**Responsables:** Dev 1 (Claude Code)

**Próximas tareas:**
- [ ] Implementar Login
- [ ] Implementar Logout
- [ ] Implementar Refresh Token
- [ ] Implementar Get Profile

---

### 🔲 Feed (ESQUELETO)

**Estado:** Archivos creados, sin implementar

**Estructura esperada:**
```
application/usecases/
├── create-post.usecase.ts
├── like-post.usecase.ts
├── comment-post.usecase.ts
├── list-feed.usecase.ts
└── list-suggestions.usecase.ts

domain/
├── post.entity.ts
├── comment.entity.ts
├── like.entity.ts
└── post.repository.ts

infrastructure/
└── prisma-post.repository.ts

presentation/
├── feed.controller.ts
└── dto/
    ├── create-post.dto.ts
    ├── comment-post.dto.ts
    └── post-response.dto.ts
```

**Responsables:** Dev 2 (Codex)

**Próximas tareas:**
- [ ] Agregar modelos a Prisma (Post, Comment, Like, SavedPost)
- [ ] Implementar CreatePostUseCase
- [ ] Implementar LikePostUseCase
- [ ] Implementar ListFeedUseCase

---

### 🔲 Profile (ESQUELETO)

**Estado:** Archivos creados, sin implementar

**Responsables:** Dev 1 o Dev 2 (asignar)

**Próximas tareas:**
- [ ] Definir ProfileEntity
- [ ] Implementar GetProfileUseCase
- [ ] Implementar UpdateProfileUseCase

---

### 🔲 Booking (ESQUELETO)

**Estado:** Archivos creados, sin implementar

**Responsables:** Dev 1 o Dev 2 (asignar)

**Próximas tareas:**
- [ ] Agregar modelos Prisma (Service, Appointment)
- [ ] Implementar CreateAppointmentUseCase
- [ ] Implementar ListAppointmentsUseCase
- [ ] Implementar CancelAppointmentUseCase

---

## 🔄 Flujo de Datos (Ejemplo: Registro)

```
1. Cliente envía POST /auth/register
   └─> HTTP Request con RegisterDto

2. AuthController recibe request
   └─> Valida DTO (class-validator)
   └─> Llama RegisterUseCase.execute(dto)

3. RegisterUseCase.execute(dto)
   └─> Busca si email existe (userRepository.findByEmail)
   └─> Hashea password (bcryptjs)
   └─> Crea instancia User (entity)
   └─> Guarda en BD (userRepository.create)

4. PrismaUserRepository.create(user)
   └─> Escribe en Prisma ORM
   └─> Prisma ejecuta SQL en PostgreSQL

5. Datos retornan hacia arriba
   └─> RegisterUseCase devuelve User
   └─> AuthController transforma a JSON
   └─> Cliente recibe HTTP Response 200 + datos
```

---

## 🎯 Reglas Arquitectónicas

1. **Unidireccionalidad:** Presentation → Application → Domain
2. **No backward deps:** Domain NUNCA depende de Presentation
3. **Inyección:** Siempre inyectar interfaces, no clases concretas
4. **Separación:** Cada capa tiene su responsabilidad clara
5. **Testing:** Cada layer es testeable de forma aislada

---

## ✅ Checklist Antes de Crear un Módulo

- ✅ ¿Creé entidad en `domain/`?
- ✅ ¿Creé interfaz de repositorio en `domain/`?
- ✅ ¿Implementé repositorio en `infrastructure/`?
- ✅ ¿Creé usecases en `application/usecases/`?
- ✅ ¿Creé DTOs en `presentation/dto/`?
- ✅ ¿Creé controller en `presentation/`?
- ✅ ¿Creé module.ts con providers correctos?
- ✅ ¿Exporté lo que otros módulos necesitan?
- ✅ ¿Registré módulo en app.module.ts?
- ✅ ¿Escribí tests para cada capa?
