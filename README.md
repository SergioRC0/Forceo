# Forceo

Forceo es una plataforma web moderna orientada a la interacción de usuarios mediante publicaciones y comentarios. Está construida con una arquitectura desacoplada que incluye backend con Express.js y frontend con Next.js. Además, integra autenticación con Google, gestión de base de datos con Prisma, y envío automatizado de correos electrónicos.

---

## Características principales

- Autenticación con Google mediante Passport.js
- Gestión de usuarios, publicaciones y comentarios
- Envío de correos de bienvenida al registrarse
- API RESTful con Express.js (backend)
- Frontend en Next.js con interfaz modular
- Validación de formularios en frontend y backend
- Prisma ORM con migraciones controladas
- Separación de responsabilidades por carpetas (controllers, middlewares, utils, etc.)

---

## Estructura del proyecto

### Backend (`/backend`)

backend/
├── app/ # Configuración base de la app
│ ├── app.js
│ ├── server.js
│ └── testConnect.js
├── controllers/ # Lógica de negocio (auth, posts, email)
│ ├── authController.js
│ ├── emailController.js
│ ├── posts.js
│ └── postsPublic.js
├── middleware/ # Validaciones y autenticación
│ ├── authMiddleware.js
│ └── validators.js
├── prisma/ # Configuración de Prisma y migraciones
│ ├── schema.prisma
│ └── migrations/
├── routes/ # Definición de rutas
│ ├── auth.js
│ ├── email.js
│ ├── posts.js
│ └── postsPublic.js
├── utils/ # Utilidades generales
│ ├── authUtils.js
│ ├── emailService.js
│ └── googleStrategy.js
└── .env # Variables de entorno del backend


### Frontend (`/frontend`)

frontend/
├── src/
│ ├── app/ # Componentes principales
│ │ ├── buttons/ # Botones reutilizables
│ │ ├── Comments/ # Gestión de comentarios
│ │ ├── forms/ # Formularios de login, registro, post, etc.
│ │ ├── Post/ # Vista y acciones de publicaciones
│ │ ├── profile/ # Página de perfil de usuario
│ │ ├── ui/ # Componentes de UI comunes
│ │ └── hooks/ # Custom hooks (auth, posts, comments)
│ ├── lib/api/ # Funciones de conexión con la API
│ └── schemas/ # Esquemas de validación con Zod
├── public/ # Recursos estáticos
├── .env # Variables de entorno del frontend
├── next.config.mjs
└── package.json

---

## Instalación

### Requisitos

- Node.js (versión recomendada: 18+)
- Base de datos PostgreSQL o MySQL
- Cuenta de Google para autenticación OAuth

### Clonar el proyecto

git clone https://github.com/SergioRC0/Forceo.git
cd Forceo
Backend
Instalar dependencias:

cd backend
npm install
Crear archivo .env:


PORT=3001
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
DATABASE_URL=tu_url_prisma
EMAIL_USER=correo@ejemplo.com
EMAIL_PASS=tu_password_correo

Ejecutar migraciones Prisma:
npx prisma generate
npx prisma migrate dev

Iniciar servidor backend:
node app/server.js

Frontend
Instalar dependencias:


cd frontend
npm install
Crear archivo .env:


NEXT_PUBLIC_API_URL=http://localhost:3001
Iniciar servidor frontend:

npm run dev
Accede a la aplicación en http://localhost:3000.

Autenticación con Google
El backend usa passport-google-oauth20. Al autenticarte:

Se busca el email en la base de datos.

Si no existe, se crea un nuevo usuario.

Se envía un correo de bienvenida con HTML.

Scripts útiles
Backend
node app/server.js  # Inicia el servidor
npx prisma studio   # Visualiza la base de datos en navegador

Frontend
npm run dev         # Inicia Next.js
