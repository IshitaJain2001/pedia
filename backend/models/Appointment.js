const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: [true, 'Parent name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\d\s\-\+\(\)]{10,}$/, 'Please provide a valid phone number']
  },
  childName: {
    type: String,
    required: [true, 'Child name is required'],
    trim: true,
    minlength: [2, 'Child name must be at least 2 characters'],
    maxlength: [100, 'Child name cannot exceed 100 characters']
  },
  childAge: {
    type: String,
    required: [true, 'Child age is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  doctor: {
    type: String,
    required: [true, 'Preferred doctor is required'],
    trim: true
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    trim: true
  },
  reason: {
    type: String,
    required: [true, 'Reason for visit is required'],
    trim: true,
    minlength: [10, 'Reason must be at least 10 characters'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
