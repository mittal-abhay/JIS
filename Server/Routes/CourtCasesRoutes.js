// courtCaseRoutes.js
const express = require('express');
const router = express.Router();
const courtCaseController = require('../Controllers/CourtCasesController');
const { authenticateRole, ROLES } = require('../Middlewares/authMiddleware');

router.get("/:cin", courtCaseController.getCaseByCIN);

// Ensure only Registrar can access court cases routes
router.use(authenticateRole([ROLES.REGISTRAR]));

// Create Court Case API
router.post('/create', courtCaseController.createCourtCase);

// Retrieve all pending court cases sorted by CIN
router.get('/pending', courtCaseController.getPendingCases);

// Retrieve all resolved court cases over a given period, chronologically
router.get('/resolved/:startDate/:endDate', courtCaseController.getResolvedCourtCases);

// Retrieve court cases scheduled for hearing on a particular date
router.get('/hearing_date/:date', courtCaseController.getCourtCasesForHearingDate);

// Retrieve the status of a specific court case identified by CIN
router.get('/status/:CIN', courtCaseController.getCaseStatus);


// Search Court Cases API
router.get('/search', courtCaseController.searchCourtCases);

// Retrieve all court cases
router.get('/', courtCaseController.getAllCourtCases);

// Retrieve a single court case by ID
router.get('/:CIN', courtCaseController.getCourtCaseById);

// Update a court case by ID
router.put('/:id', courtCaseController.updateCourtCase);

// Delete a court case by ID
router.delete('/:id', courtCaseController.deleteCourtCase);

// Record Adjournment API
router.post('/record_adjournment/:cin', courtCaseController.recordAdjournment);

// Record Court Proceedings API
router.post('/record_proceedings/:cin', courtCaseController.recordProceedings);

// Record judgement API
router.post('/record_judgement/:cin', courtCaseController.recordjudgement);

module.exports = router;
