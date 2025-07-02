const express = require('express');
const app = express();
require('dotenv').config();

// Middleware pour lire les JSON
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.send('Bienvenue dans l\'application de gestion d’hôtel !');
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});