const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Créer un client
router.post('/', clientController.createClient);

// Lister tous les clients
router.get('/', clientController.getAllClients);

// Supprimer un client
router.delete('/:id', clientController.deleteClient);

// Mettre à jour un client
router.put('/:id', clientController.updateClient);

module.exports = router;