# Étape 1: Construire l'application
FROM node:18 AS builder

WORKDIR /app

# Copier les fichiers package.json, yarn.lock, et le fichier d'environnement
ARG ENV=development
COPY package.json yarn.lock ./
COPY .env.${ENV} ./.env

# Installer les dépendances
RUN yarn install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Construire l'application
RUN yarn build

# Étape 2: Exécuter l'application
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers nécessaires de l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.env ./

RUN yarn install --production

EXPOSE 3000

CMD ["node", "dist/main"]