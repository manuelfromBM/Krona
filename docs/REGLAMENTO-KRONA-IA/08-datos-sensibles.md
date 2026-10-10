# 🔐 DATOS SENSIBLES - KRONA

**Versión:** 1.0  
**Última actualización:** 2026-10-04

---

## ¿Qué es dato sensible?

**Datos sensibles** son información que:
- Expone secretos de la aplicación
- Contiene credenciales
- Identifica usuarios reales
- Puede ser usada para atacar la plataforma
- Es confidencial de negocio

---

## 🚫 Categorías de Datos Prohibidos

### 1️⃣ Variables de Entorno & Secretos

**❌ PROHIBIDO:**
```typescript
// NUNCA hardcodear
const JWT_SECRET = "my-super-secret-key-12345";
const DATABASE_URL = "postgres://user:pass@host:5432/krona";
const STRIPE_SECRET_KEY = "sk_test_123456789";
const API_TOKEN = "ghp_1234567890abcdef";

// NUNCA incluir en ejemplos
// Configuración: DATABASE_URL=postgres://user:pass@localhost:5432/krona_dev
```

**✅ PERMITIDO:**
```typescript
// Usar variables de ambiente nominales
const jwtSecret = process.env.JWT_SECRET;
const dbUrl = process.env.DATABASE_URL;

// En documentación (sin valores)
// Required env vars:
// - JWT_SECRET: Secret key for JWT signing
// - DATABASE_URL: PostgreSQL connection string
// - STRIPE_SECRET_KEY: Stripe API secret
```

### 2️⃣ Credenciales & API Keys

**❌ PROHIBIDO:**
```typescript
// Stripe keys
const stripeKey = "";

// OAuth tokens
const githubToken = "ghp_1234567890abcdefghijklmnopqrstuvwxyz";

// Database credentials
const dbUser = "krona_prod";
const dbPassword = "SuperSecurePassword123!";

// AWS/Cloud credentials
const awsAccessKey = "AKIAIOSFODNN7EXAMPLE";
const awsSecretKey = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
```

**✅ PERMITIDO:**
```typescript
// Usar desde env variables
const stripeKey = process.env.STRIPE_SECRET_KEY;
const githubToken = process.env.GITHUB_TOKEN;

// En tests, usar valores ficticio
const mockToken = "mock_token_12345";
const testKey = "test_key_abcdef";
```

### 3️⃣ Identificadores de Usuarios Reales

**❌ PROHIBIDO:**
```typescript
// Emails reales
const testUsers = [
  { id: 1, email: "manuel@bmcodelab.com", name: "Manuel Díaz" },
  { id: 2, email: "bastian@bmcodelab.com", name: "Bastian Madrid" },
];

// Phone numbers reales
const contactos = [
  { name: "Juan", phone: "+56912345678" },
  { name: "María", phone: "+56923456789" },
];

// IDs de clientes reales
const premiumUsers = [123456, 234567, 345678];
```

**✅ PERMITIDO:**
```typescript
// Emails de ejemplo
const testUsers = [
  { id: 1, email: "user@example.com", name: "Test User" },
  { id: 2, email: "admin@example.com", name: "Admin User" },
];

// Phone numbers fictios
const mockPhone = "+56999999999";

// IDs genéricos
const testIds = ["user_001", "user_002", "user_003"];
```

### 4️⃣ Datos Financieros & Métodos de Pago

**❌ PROHIBIDO:**
```typescript
// Números de tarjeta (real o parcial)
const card = "4532-1234-5678-9010"; // Incluso parcial
const cardNumber = "4532123456789010";

// CVV
const cvv = "123";

// Información bancaria
const bankAccount = "1234567890";
const bankRouting = "987654321";

// Precios reales del negocio
const pricingPlans = [
  { name: "Basic", monthlyPrice: 99.99 },
  { name: "Pro", monthlyPrice: 199.99 },
];

// Información de ingresos reales
const monthlyRevenue = 45000;
const userBaseMetrics = { totalUsers: 12345, activeUsers: 8901 };
```

**✅ PERMITIDO:**
```typescript
// Números de tarjeta ficticios (para tests)
const mockCard = "4532-0000-0000-0010";
const testCardNumber = "4111111111111111"; // Test card

// Precios demo (claramente marcados)
const demoPricingPlans = [
  { name: "Basic", monthlyPrice: 99 }, // Demo price
  { name: "Pro", monthlyPrice: 199 }   // Demo price
];

// Métricas genéricas (sin valores reales)
const userMetricsStructure = {
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
};
```

### 5️⃣ Información de Negocio Confidencial

**❌ PROHIBIDO:**
```typescript
// Partners específicos
const partners = ["Stripe", "Twilio", "SendGrid"];

// Nombres de clientes grandes
const majorClients = ["Company A", "Company B"];

// Roadmap confidencial
const roadmap = {
  q1: "Implementar pagos con Bitcoin",
  q2: "Integración con Shopify",
  q3: "Marketplace",
};

// Estimaciones financieras reales
const projections = {
  month1: 5000,
  month2: 12000,
  month3: 28000,
};
```

**✅ PERMITIDO:**
```typescript
// Mencionar partners genéricamente (si es público)
// "Krona integra con plataformas de pago populares"

// Mencionar que hay roadmap (sin detalles)
// "Consulta la sección de Roadmap en la documentación"

// Descripciones genéricas
// "Ejemplos de features futuras que podría incluir..."
```

### 6️⃣ Información de Infraestructura

**❌ PROHIBIDO:**
```typescript
// URLs de servidores internos
const apiServer = "https://internal-api.krona.dev";
const adminPanel = "https://admin-krona.internal";

// IPs de máquinas
const dbServer = "192.168.1.100";
const cacheServer = "10.0.0.50";

// Puertos internos
const postgresPort = 5432;
const redisPort = 6379;

// Rutas de deployments
const deploymentPath = "/var/apps/krona-backend";
```

**✅ PERMITIDO:**
```typescript
// Valores genéricos
const apiUrl = process.env.API_URL;
const dbHost = process.env.DB_HOST;

// En documentación (sin valores reales)
// "Krona se deploy en Render (backend) y Vercel (frontend)"
```

### 7️⃣ Credenciales de Terceros (OAuth, APIs)

**❌ PROHIBIDO:**
```typescript
// Google OAuth credentials
const googleClientId = "123456789-abcdefghijklmnopqrst.apps.googleusercontent.com";
const googleClientSecret = "GOCSPX-1234567890abcdefgh";

// GitHub OAuth
const githubClientId = "Iv1.1234abcd5678";
const githubClientSecret = "1234abcd5678efgh9012ijkl3456mnop";

// Slack webhook
const slackWebhook = "";

// SendGrid API key
const sendGridApiKey = "SG.1234567890_abcdefghijklmnopqrst";
```

**✅ PERMITIDO:**
```typescript
// Usar desde env
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

// En documentación
// "Configure Google OAuth credentials in .env.local"
```

---

## 🔍 Dónde Buscar Datos Sensibles

### Archivos a Revisar Siempre

✅ Revisar cuando Claude Code genera código:

```bash
# Buscar "process.env" sin prefijo env__
grep -r "process.env[A-Z_]*" src/

# Buscar números de 16+ dígitos (podrían ser tarjetas)
grep -r "\b[0-9]\{16,\}\b" src/

# Buscar "secret", "key", "token", "password"
grep -ri "secret\|api[_-]?key\|token\|password" src/ \
  --exclude="*.spec.ts" --exclude="*.md"

# Buscar emails reales (dominio de Krona o conocido)
grep -r "@krona.cl\|@bmcodelab\|@gmail.com" src/
```

---

## ✅ Checklist: Antes de Hacer Commit

Dev debe revisar:

- ✅ ¿Hay `process.env` con valores reales? NO
- ✅ ¿Hay números que parecen tarjetas? NO
- ✅ ¿Hay emails reales? NO
- ✅ ¿Hay tokens/keys? NO (solo referencias a `process.env`)
- ✅ ¿Hay URLs internas? NO
- ✅ ¿Hay información de precios reales? NO
- ✅ ¿Hay métricas confidenciales? NO
- ✅ ¿Hay rutas de deployments? NO

---

## 🚨 Si Se Detecta Dato Sensible

### Proceso

1. **Parar** - No mergear el PR
2. **Revisar** - ¿Qué dato sensible hay?
3. **Remover** - Eliminar del código
4. **Investigar** - ¿De dónde vino?
5. **Investigar** - ¿Fue commiteado a main?
6. **Remediar** - Si fue commiteado:
   - Cambiar la credencial comprometida
   - Hacer commit de revert
   - Notificar equipo

---

## 📋 Tipos Seguros para Ejemplos

### Datos Ficticios Aceptables

```typescript
// Emails de prueba
"test@example.com"
"user1@example.com"
"admin@example.com"
"jane.doe@test.com"

// Teléfonos ficticios
"+56999999999"
"+56988888888"
"+56977777777"

// UUIDs/IDs de prueba
"550e8400-e29b-41d4-a716-446655440000"
"user_test_001"
"provider_demo_123"

// Números de tarjeta de test (Stripe)
"4111111111111111"  // Stripe test card (OK porque es pública)
"5555555555554444"  // Visa test card
"378282246310005"   // AmEx test card

// Direcciones ficticias
"123 Main St, Anytown, USA"
"456 Oak Ave, Springfield, IL"

// Nombres genéricos
"John Doe"
"Jane Smith"
"Test User"
"Admin User"

// Precios demo (claramente indicado)
const DEMO_PRICE = 99.99; // ← Claramente demo/ejemplo
const EXAMPLE_PLAN = { price: 199 }; // Valor de ejemplo
```

---

## 🎯 Resumen

```
🚫 NUNCA incluir:
- Variables de entorno con valores reales
- API keys, tokens, secrets
- Emails/teléfonos reales
- Números de tarjeta
- IDs de usuarios reales
- Información confidencial de negocio
- URLs/IPs internas

✅ SIEMPRE usar:
- Valores ficticios claramente marcados
- process.env para variables
- Datos de ejemplo genéricos
- Información pública
```

---

## 📚 Referencias

- OWASP: https://owasp.org/www-community/Sensitive_Data_Exposure
- NIST: https://csrc.nist.gov/publications/detail/sp/800-171/final
- PCI DSS: https://www.pcisecuritystandards.org/

**Cuando en duda: preguntar al supervisor.**
