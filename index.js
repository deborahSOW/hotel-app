const express = require('express');
const app = express();
require('dotenv').config();

// Connexion à la base de données
const pool = require('./config/db');

// Middleware pour parser le JSON
app.use(express.json());

// Message d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API de gestion hôtelière');
});

// Importation des routes
const clientRoutes = require('./routes/clientRoutes');
const chambreRoutes = require('./routes/chambreRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paiementRoutes = require('./routes/paiementRoutes');

// Utilisation des routes
app.use('/api/clients', clientRoutes);
app.use('/api/chambres', chambreRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/paiements', paiementRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
