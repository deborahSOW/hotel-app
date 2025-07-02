FROM node:18

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port de l'app
EXPOSE 3000

# Lancer le serveur Node
CMD [ "node", "index.js" ]
