const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { appointmentValidation } = require('../middlewares/validator');

router.post('/appointments', appointmentValidation, createAppointment);
router.get('/appointments', getAppointments);
router.patch('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;
