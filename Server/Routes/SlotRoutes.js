// courtCaseRoutes.js
const express = require('express');
const router = express.Router();
const slotController = require('../Controllers/SlotController');
const { authenticateRole, ROLES } = require('../Middlewares/authMiddleware');

// Ensure only Registrar can access slot routes
router.use(authenticateRole([ROLES.REGISTRAR]));

router.get('/available/:date', slotController.getSlotsOnDate);
router.get('/available/:startDate/:endDate', slotController.getSlotsBetweenDates);
router.get('/available/:date/:startTime/:endTime', slotController.getSlotsbyDateTime);

module.exports = router;