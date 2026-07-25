const { body } = require('express-validator');

// General Query Validation
exports.generalQueryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]{10,}$/).withMessage('Please provide a valid phone number'),
  body('childAge')
    .trim()
    .notEmpty().withMessage('Child age is required'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
];

// Appointment Validation
exports.appointmentValidation = [
  body('parentName')
    .trim()
    .notEmpty().withMessage('Parent name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]{10,}$/).withMessage('Please provide a valid phone number'),
  body('childName')
    .trim()
    .notEmpty().withMessage('Child name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Child name must be between 2 and 100 characters'),
  body('childAge')
    .trim()
    .notEmpty().withMessage('Child age is required'),
  body('gender')
    .trim()
    .notEmpty().withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('doctor')
    .trim()
    .notEmpty().withMessage('Preferred doctor is required'),
  body('appointmentDate')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Please provide a valid date'),
  body('preferredTime')
    .trim()
    .notEmpty().withMessage('Preferred time is required'),
  body('reason')
    .trim()
    .notEmpty().withMessage('Reason for visit is required')
    .isLength({ min: 10, max: 500 }).withMessage('Reason must be between 10 and 500 characters')
];
