// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById } = require('../controllers/userController.js');

// Route to get all users
router.get('/', getAllUsers);

// Route to get a specific user by ID
router.get('/:userId', getUserById);

module.exports = router;
