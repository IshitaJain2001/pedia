const GeneralQuery = require('../models/GeneralQuery');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalQueries = await GeneralQuery.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'Confirmed' });

    res.status(200).json({
      success: true,
      data: {
        totalQueries,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats',
      error: error.message
    });
  }
};

// @desc    Login Admin manually via email/password
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const envEmail = process.env.ADMIN_EMAIL || 'drabbas10@gmail.com';
    const envPassword = process.env.ADMIN_PASSWORD || 'Abbas10@12';

    if (email === envEmail && password === envPassword) {
      const token = jwt.sign(
        { email: envEmail },
        process.env.JWT_SECRET || 'supersecretkeyforadminauthpediatric123',
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        message: 'Admin logged in successfully',
        token,
        email: envEmail
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

