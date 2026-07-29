const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { appointmentValidation } = require('../middlewares/validator');
const adminAuth = require('../middlewares/adminAuth');

router.post('/appointments', appointmentValidation, createAppointment);
router.get('/appointments', adminAuth, getAppointments);
router.patch('/appointments/:id', adminAuth, updateAppointment);
router.delete('/appointments/:id', adminAuth, deleteAppointment);

module.exports = router;
