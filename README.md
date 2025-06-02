# A-Mate Backend

A NestJS backend application with PostgreSQL database, JWT authentication, and Docker support.

## 🛠 Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Containerization**: Docker & Docker Compose
- **Package Manager**: Yarn

## 📋 Prerequisites

Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Configuration

Create or update the `.env.local` file with the following configuration:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=amate_db_admin
DATABASE_PASSWORD=amate_db_password
DATABASE_NAME=amate_db_local
NODE_ENV=local
JWT_SECRET=a-mate-jwt-secret-local
PORT=3001
```

### 4. Start the PostgreSQL Database

Start only the PostgreSQL container:

```bash
docker-compose up -d postgres
```

### 5. Run the Application

Start the NestJS application in development mode:

```bash
yarn start:local
```

The application will be available at `http://localhost:3001`

## 🐳 Docker Setup (Alternative)

If you prefer to run everything in Docker:

### 1. Build the Docker image

```bash
docker build -t a-mate-dev:v0.1 .
```

### 2. Start all services

```bash
docker-compose up -d
```

This will start both PostgreSQL and the NestJS application.

## 📝 Available Scripts

- `yarn start:local` - Start the app in local development mode with hot reload
- `yarn start:dev` - Start the app in development mode
- `yarn start:prod` - Start the app in production mode
- `yarn build` - Build the application
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## 🗄 Database

The application uses PostgreSQL with TypeORM. The database configuration includes:

- **Host**: localhost (when running locally)
- **Port**: 5432
- **Database**: amate_db_local
- **User**: amate_db_admin
- **Password**: amate_db_password
