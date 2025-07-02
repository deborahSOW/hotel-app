const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambreController');

// Ajouter une chambre
router.post('/', chambreController.createChambre);

// Lister toutes les chambres
router.get('/', chambreController.getAllChambres);

// Modifier une chambre
router.put('/:id', chambreController.updateChambre);

// Supprimer une chambre
router.delete('/:id', chambreController.deleteChambre);

module.exports = router;
