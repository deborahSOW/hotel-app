const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Créer une réservation
router.post('/', reservationController.createReservation);

// Lister toutes les réservations
router.get('/', reservationController.getAllReservations);

// Mettre à jour une réservation
router.put('/:id', reservationController.updateReservation);

// Supprimer une réservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
