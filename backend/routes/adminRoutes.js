const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/stats', adminAuth, getDashboardStats);

module.exports = router;
