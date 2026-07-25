const mongoose = require('mongoose');

const doctorAvailabilitySchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  }],
  availableTime: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);
