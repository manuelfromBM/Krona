# 💻 CONVENCIONES DE CÓDIGO - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## Introducción

Este documento establece las convenciones de código que Claude Code y Codex **DEBEN** seguir en todos los archivos generados para Krona. La consistencia es crítica para un equipo que crece.

---

## 1️⃣ Naming (Nomenclatura)

### Variables & Constantes

**Regla:** camelCase para variables, UPPER_SNAKE_CASE para constantes.

```typescript
// ✅ CORRECTO
const userName = "Juan";
const userEmail = "juan@example.com";
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;

// ❌ INCORRECTO
const user_name = "Juan";
const UserName = "Juan";
const username = "Juan"; // Muy corto, poco descriptivo
const max_retries = 3; // Debería ser UPPER_SNAKE_CASE
```

### Funciones

**Regla:** Verbo + sustantivo, camelCase. Nombres descriptivos.

```typescript
// ✅ CORRECTO
function getUserById(id: string) { }
function createReservation(appointment: Appointment) { }
function validateEmail(email: string): boolean { }
function fetchProviderServices(providerId: string) { }

// ❌ INCORRECTO
function getUser() { } // Muy genérico
function create() { } // No especifica qué crea
function check(x: string) { } // Parámetros confusos
function fn() { } // Inaceptable
```

### Clases & Interfaces

**Regla:** PascalCase. Los nombres deben ser sustantivos.

```typescript
// ✅ CORRECTO
class UserRepository { }
interface IAppointmentService { }
class ReservationController { }
interface IProvider { }

// ❌ INCORRECTO
class user_repo { }
class userRepository { } // Debería ser PascalCase
interface provider { } // Debería ser PascalCase
class GetUser { } // No debería ser un verbo
```

### Archivos & Carpetas

**Regla:** kebab-case para archivos y carpetas.

```
// ✅ CORRECTO
src/modules/auth/
  ├── application/usecases/
  │   ├── register.usecase.ts
  │   ├── login.usecase.ts
  │   └── get-profile.usecase.ts
  ├── domain/
  │   ├── user.entity.ts
  │   └── user.repository.ts
  ├── infrastructure/
  │   └── prisma-user.repository.ts
  └── presentation/
      └── auth.controller.ts

// ❌ INCORRECTO
src/modules/auth/
  ├── application/UseCases/ (PascalCase)
  ├── domain/UserEntity.ts (debería ser user.entity.ts)
  └── auth_controller.ts (snake_case en archivo)
```

---

## 2️⃣ Estructura de Proyectos

### Backend (NestJS) - Arquitectura Clean/Hexagonal

Cada módulo sigue esta estructura:

```
src/modules/{module}/
├── application/
│   └── usecases/
│       ├── create-{entity}.usecase.ts
│       ├── update-{entity}.usecase.ts
│       ├── delete-{entity}.usecase.ts
│       └── get-{entity}.usecase.ts
├── domain/
│   ├── {entity}.entity.ts
│   └── {entity}.repository.ts
├── infrastructure/
│   └── prisma-{entity}.repository.ts
├── presentation/
│   ├── {module}.controller.ts
│   ├── dto/
│   │   ├── create-{entity}.dto.ts
│   │   ├── update-{entity}.dto.ts
│   │   └── {entity}-response.dto.ts
│   └── interceptors/ (si hay)
├── {module}.module.ts
└── {module}.service.ts (opcional si hay lógica compartida)
```

**Ejemplo (Auth):**
```
src/modules/auth/
├── application/usecases/
│   ├── register.usecase.ts
│   ├── login.usecase.ts
│   ├── refresh-token.usecase.ts
│   └── get-profile.usecase.ts
├── domain/
│   ├── user.entity.ts
│   └── user.repository.ts
├── infrastructure/
│   └── prisma-user.repository.ts
├── presentation/
│   ├── auth.controller.ts
│   └── dto/
│       ├── register.dto.ts
│       ├── login.dto.ts
│       └── auth-response.dto.ts
├── auth.module.ts
└── auth.service.ts
```

### Frontend (Next.js)

```
apps/web/src/
├── app/
│   ├── (auth)/          # Route group para login/registro
│   ├── (client)/        # Route group para usuarios finales
│   ├── (provider)/      # Route group para proveedores
│   └── (admin)/         # Route group para administración
├── features/
│   ├── Auth/
│   │   ├── hooks/
│   │   ├── components/
│   │   └── services/
│   ├── Feed/
│   ├── Booking/
│   └── Provider/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Modal.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useFeed.ts
├── services/
│   └── api-client.ts
└── types/
    └── index.ts
```

### Mobile (React Native)

```
apps/mobile/src/
├── screens/
│   ├── AuthStack/
│   │   ├── LoginScreen.tsx
│   │   └── LoginScreen.styles.ts
│   ├── ClientStack/
│   │   ├── FeedScreen.tsx
│   │   └── FeedScreen.styles.ts
│   └── ProviderStack/
├── navigation/
│   ├── RootNavigator.tsx
│   └── ClientNavigator.tsx
├── components/
│   ├── Feed/
│   └── Booking/
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
└── services/
    └── api-client.ts
```

---

## 3️⃣ Patrones de Código

### Manejo de Errores

**Backend (NestJS):**
```typescript
// ✅ CORRECTO - Usar HttpException
import { HttpException, HttpStatus } from '@nestjs/common';

@Post('/register')
async register(@Body() dto: RegisterDto) {
  try {
    const user = await this.registerUseCase.execute(dto);
    return { success: true, data: user };
  } catch (error) {
    if (error.message === 'Email already exists') {
      throw new HttpException(
        { message: 'El email ya está registrado' },
        HttpStatus.CONFLICT
      );
    }
    throw new HttpException(
      { message: 'Error al registrar usuario' },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

// ❌ INCORRECTO - Lanzar errores genéricos
throw new Error('Email already exists');
```

**Frontend (Next.js):**
```typescript
// ✅ CORRECTO
async function login(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw para manejar en componente
  }
}

// ❌ INCORRECTO
async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', { ... });
  return response.json(); // No valida respuesta
}
```

### DTOs (Data Transfer Objects)

```typescript
// ✅ CORRECTO
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  name: string;
}

// ❌ INCORRECTO
export class RegisterDto {
  email: any; // Sin validación
  password: any;
  name: any;
}
```

### Inyección de Dependencias (NestJS)

```typescript
// ✅ CORRECTO
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    // ...
  }
}

// ❌ INCORRECTO
export class AuthService {
  userRepository = new UserRepository(); // Acoplamiento directo
  
  async login(email: string, password: string) {
    // ...
  }
}
```

---

## 4️⃣ Indentación & Formateo

**Regla:** 2 espacios (no tabs). Prettier fuerza esto automáticamente.

```typescript
// ✅ CORRECTO (2 espacios)
function test() {
  if (true) {
    console.log('correcto');
  }
}

// ❌ INCORRECTO (4 espacios o tabs)
function test() {
    if (true) {
        console.log('incorrecto');
    }
}
```

---

## 5️⃣ Comentarios & Documentación

**Regla:** Comentarios solo para "por qué", no "qué" (el código dice qué).

```typescript
// ✅ CORRECTO
// Validamos que el email no esté duplicado en la BD
// porque Krona no permite múltiples cuentas por email
const existingUser = await this.userRepository.findByEmail(email);
if (existingUser) {
  throw new Error('Email already registered');
}

// ❌ INCORRECTO
// Buscamos el usuario por email
const existingUser = await this.userRepository.findByEmail(email);
// Si existe, lanzamos error
if (existingUser) {
  throw new Error('Email already registered');
}
```

### Documentación de Funciones (JSDoc)

```typescript
// ✅ CORRECTO
/**
 * Registra un nuevo usuario en el sistema.
 * 
 * @param {RegisterDto} dto - Datos de registro (email, password, name)
 * @returns {Promise<User>} Usuario creado con token JWT
 * @throws {HttpException} Si el email ya está registrado
 */
async register(dto: RegisterDto): Promise<User> {
  // ...
}

// ❌ INCORRECTO
// Función para registrar
function register(dto) {
  // ...
}
```

---

## 6️⃣ Imports & Exports

**Regla:** Imports alfabéticamente ordenados, agrupados por origen.

```typescript
// ✅ CORRECTO
// Imports de librerías externas
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcryptjs from 'bcryptjs';

// Imports de proyecto
import { IUserRepository } from './domain/user.repository';
import { RegisterDto } from './dto/register.dto';
import { User } from './domain/user.entity';

// ❌ INCORRECTO
import { RegisterDto } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { User } from './domain/user.entity';
import bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from './domain/user.repository';
```

---

## 7️⃣ Tipos & Interfaces

**Regla:** Usar TypeScript strict. Nunca usar `any`.

```typescript
// ✅ CORRECTO
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

function getUserEmail(user: User): string {
  return user.email;
}

// ❌ INCORRECTO
function getUserEmail(user: any): any { // ¡Nunca any!
  return user.email;
}
```

---

## 🎯 Checklist Antes de Generar Código

- ✅ ¿Nombres en camelCase (vars), PascalCase (clases), UPPER_SNAKE_CASE (constantes)?
- ✅ ¿Estructura de carpetas según el módulo?
- ✅ ¿Errores manejados con HttpException o try/catch?
- ✅ ¿DTOs con validaciones?
- ✅ ¿Sin `any` en tipos?
- ✅ ¿Indentación de 2 espacios?
- ✅ ¿Prettier va a formatear sin cambios?
- ✅ ¿Comentarios explican "por qué", no "qué"?
