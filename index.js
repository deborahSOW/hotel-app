const express = require('express');
const app = express();
const pool = require('./config/db'); // Connexion à PostgreSQL
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API de gestion hôtelière');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);
const chambreRoutes = require('./routes/chambreRoutes');
app.use('/api/chambres', chambreRoutes);
const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);
const paiementRoutes = require('./routes/paiementRoutes');
app.use('/api/paiements', paiementRoutes);
