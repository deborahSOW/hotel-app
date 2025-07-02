const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');

// Ajouter un paiement
router.post('/', paiementController.createPaiement);

// Lister les paiements
router.get('/', paiementController.getAllPaiements);

// Modifier un paiement
router.put('/:id', paiementController.updatePaiement);

// Supprimer un paiement
router.delete('/:id', paiementController.deletePaiement);

module.exports = router;
