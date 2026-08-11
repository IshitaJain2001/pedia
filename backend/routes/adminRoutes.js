const express = require('express');
const router = express.Router();
const { getDashboardStats, loginAdmin } = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/stats', adminAuth, getDashboardStats);
router.post('/admin/login', loginAdmin);

module.exports = router;

