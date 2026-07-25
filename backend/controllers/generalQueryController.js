const GeneralQuery = require('../models/GeneralQuery');
const { validationResult } = require('express-validator');

// @desc    Create a new general query
// @route   POST /api/general-query
// @access  Public
exports.createGeneralQuery = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, childAge, subject, message } = req.body;

    const generalQuery = await GeneralQuery.create({
      name,
      email,
      phone,
      childAge,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: generalQuery
    });
  } catch (error) {
    console.error('Error creating general query:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating query',
      error: error.message
    });
  }
};

// @desc    Get all general queries (Admin)
// @route   GET /api/general-query
// @access  Private/Admin
exports.getGeneralQueries = async (req, res) => {
  try {
    const queries = await GeneralQuery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries
    });
  } catch (error) {
    console.error('Error fetching general queries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching queries',
      error: error.message
    });
  }
};
