# VanLifeRentals - Page Skeleton

This README lists the placeholder pages and logic created for the IA6 practice.

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
