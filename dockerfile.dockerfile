# Étape 1 : image de base
FROM node:18

# Étape 2 : dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : copie des dépendances
COPY package*.json ./

# Étape 4 : installation des dépendances
RUN npm install

# Étape 5 : copie du reste du code
COPY . .

# Étape 6 : expose le port utilisé par ton serveur
EXPOSE 3000

# Étape 7 : commande de lancement
CMD [ "node", "index.js" ]
