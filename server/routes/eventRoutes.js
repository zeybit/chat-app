
// server/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { createEvent, getUserEvents, updateEvent, deleteEvent } = require('../controllers/eventController.js');

// Event oluşturma
router.post('/', createEvent);

// Kullanıcıya ait etkinlikleri alma
router.get('/:userId', getUserEvents); 

// Event güncelleme
router.put('/:eventId', updateEvent);

// Event silme
router.delete('/:eventId', deleteEvent);

module.exports = router;

