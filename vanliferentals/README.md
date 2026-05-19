# VanLifeRentals - IA6 Practice

Este repositorio contiene la implementación de la práctica IA6 (landing de lloguer de campers) con Next.js 16, Prisma i Auth.js.

Resumen rápido:
- App Next.js 16 amb App Router
- Prisma + PostgreSQL amb `prisma/seed.ts`
- Autenticació amb `next-auth` i control de rols (USER, EDITOR, ADMIN)
- API endpoints per a models, comentaris i contacte

---

## Quick start (local)

1. Copia `.env` amb la variable `DATABASE_URL` apuntant a una BD PostgreSQL local.
2. Instal·la dependències:

```bash
cd vanliferentals
npm install
```

3. Genera Prisma i aplica migracions (desenvolupament):

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

4. Inicia l'aplicació:

```bash
npm run dev
```

L'aplicació s'espera disponible a `http://localhost:3000`.

## Credenciales de prueba

Puedes crear cuentas con el endpoint de registro o usar estas credenciales de prueba (si crees manualment els usuaris):

- **ADMIN**
	- email: admin@vanlife.test
	- password: Password123!

- **EDITOR**
	- email: editor@vanlife.test
	- password: Password123!

- **USER**
	- email: user@vanlife.test
	- password: Password123!

Crear un usuari via curl (ejemplo):

```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name":"Admin","email":"admin@vanlife.test","password":"Password123!"}'
```

Si prefieres poblar automáticamente, considera afegir els usuaris al `prisma/seed.ts` o executar un script amb Prisma Client.

## Ejecutar tests E2E (Playwright)

1. Instalar dependencias y binarios Playwright:

```bash
cd vanliferentals
npm install
npx playwright install
```

2. Inicia la app (en otra terminal):

```bash
npm run dev
```

3. Ejecuta los tests:

```bash
npm run test:e2e
```

Los tests usan `baseURL` por defecto `http://localhost:3000`. Puedes sobreescribir con `E2E_BASE_URL`.

## Backlog y siguientes pasos

Ver [BACKLOG.md](BACKLOG.md) per a tasques pendents i historial resumit de commits.

## Uso de IA

La documentació sobre l'ús d'eines d'IA per generar parts del projecte es troba a [IA_USAGE.md](IA_USAGE.md).

## Despliegue en Vercel

En esta práctica no hay un backend separado: las rutas de API y la interfaz web se despliegan juntas en la misma app Next.js.

Pasos recomendados:

1. Sube el repositorio a GitHub y conecta el proyecto en Vercel.
2. En Vercel, configura `Root Directory = vanliferentals`.
3. Deja los comandos por defecto: `npm install` y `npm run build`.
4. La configuración específica del proyecto vive en [vanliferentals/vercel.json](vercel.json).
5. Define estas variables de entorno en Vercel:

```text
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=una-clave-larga-y-segura
```

6. Despliega la rama `main`.
7. Tras el primer deploy, ejecuta las migraciones y el seed contra la BD de producción:

```bash
npx prisma migrate deploy
npm run prisma:seed
```

8. Verifica la URL pública y ejecuta los smoke tests con `E2E_BASE_URL=https://tu-proyecto.vercel.app`.

Si Vercel no encuentra `next`, revisa que el Root Directory siga siendo `vanliferentals` y que no exista una configuración de build con prefijo duplicado.

---

### Archivo y endpoints principales

## Pages

- app/page.tsx - Home landing with models and contact sections
- app/models/page.tsx - Models catalog list
- app/models/[modelId]/page.tsx - Model detail with comments placeholder
- app/contact/page.tsx - Contact request form
- app/auth/login/page.tsx - Login page
- app/auth/register/page.tsx - Register page
- app/editor/page.tsx - Editor dashboard
- app/editor/models/new/page.tsx - Create model page
- app/editor/models/[modelId]/edit/page.tsx - Edit model page
- app/admin/page.tsx - Admin dashboard
- app/admin/users/page.tsx - User and role management page

## Logic (base)

- lib/types.ts - Shared types
- lib/mockData.ts - Mock data store
- lib/validators.ts - Payload validation
- lib/auth.ts - Mock auth and role checks
- lib/http.ts - JSON helpers
- lib/db.ts - Database placeholder

## Services

- lib/services/modelsService.ts - Models data access
- lib/services/commentsService.ts - Comments data access
- lib/services/contactService.ts - Contact requests data access
- lib/services/authService.ts - Register/login helpers
- lib/services/adminService.ts - Users and roles data access

## Controllers

- lib/controllers/modelsController.ts - Models logic and validation
- lib/controllers/commentsController.ts - Comments logic and validation
- lib/controllers/contactController.ts - Contact logic and validation
- lib/controllers/authController.ts - Auth logic and validation
- lib/controllers/adminController.ts - Admin logic and validation

## API Endpoints

- app/api/models/route.ts - GET/POST models
- app/api/models/[modelId]/route.ts - GET/PUT model detail
- app/api/models/[modelId]/comments/route.ts - GET/POST comments
- app/api/contact/route.ts - POST contact request
- app/api/auth/register/route.ts - POST register
- app/api/auth/login/route.ts - POST login
- app/api/auth/[...auth]/route.ts - Auth.js placeholder
- app/api/admin/users/route.ts - GET users (admin)
- app/api/admin/users/[userId]/role/route.ts - PUT role (admin)

## Prisma

- prisma/schema.prisma - Data schema
- prisma/seed.ts - Seed placeholder

