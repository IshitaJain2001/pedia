const express = require('express');
const router = express.Router();
const { createGeneralQuery, getGeneralQueries } = require('../controllers/generalQueryController');
const { generalQueryValidation } = require('../middlewares/validator');

router.post('/general-query', generalQueryValidation, createGeneralQuery);
router.get('/general-query', getGeneralQueries);

module.exports = router;
