const express = require('express');
const router = express.Router();
const { createGeneralQuery, getGeneralQueries, deleteGeneralQuery } = require('../controllers/generalQueryController');
const { generalQueryValidation } = require('../middlewares/validator');
const adminAuth = require('../middlewares/adminAuth');

router.post('/general-query', generalQueryValidation, createGeneralQuery);
router.get('/general-query', adminAuth, getGeneralQueries);
router.delete('/general-query/:id', adminAuth, deleteGeneralQuery);

module.exports = router;
