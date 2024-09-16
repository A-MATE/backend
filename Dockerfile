# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers du projet
COPY . .

# Compiler le projet NestJS
RUN yarn build

# Étape 2 : Construction de l'image finale
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/yarn.lock ./

# Installer uniquement les dépendances de production
RUN yarn install --production

# Exposer le port de l'application (changez le port si nécessaire)
EXPOSE 80

# Ajouter le script d'entrypoint
ENTRYPOINT ["node", "dist/main"]