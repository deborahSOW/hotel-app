const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Ajouter une réservation
router.post('/', reservationController.createReservation);

// Lister toutes les réservations
router.get('/', reservationController.getAllReservations);

// Modifier une réservation
router.put('/:id', reservationController.updateReservation);

// Supprimer une réservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
