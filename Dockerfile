# Utiliser l'image Node.js officielle avec support pour TypeScript et Node
FROM node:20-alpine

# Créer et définir le répertoire de travail de l'application
WORKDIR /app

# Copier les fichiers package.json, package-lock.json, et tsconfig.json
COPY package*.json tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers source dans le conteneur
COPY . .

# Construire le projet TypeScripte

# Exposer le port pour le backend
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "run", "dev"]
