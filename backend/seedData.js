const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ClinicSchedule = require('./models/ClinicSchedule');
const DoctorAvailability = require('./models/DoctorAvailability');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await ClinicSchedule.deleteMany({});
    await DoctorAvailability.deleteMany({});

    // Add clinic schedule
    const clinicSchedule = await ClinicSchedule.create({
      daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      openingTime: '9:00 AM',
      closingTime: '6:00 PM',
      isActive: true
    });

    console.log('Clinic schedule seeded:', clinicSchedule);

    // Add doctor availability
    const doctors = await DoctorAvailability.create([
      {
        doctorName: 'Rahul Sharma',
        specialization: 'Pediatrician',
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        availableTime: '9:00 AM - 1:00 PM',
        isActive: true
      },
      {
        doctorName: 'Priya Patel',
        specialization: 'Child Specialist',
        availableDays: ['Tuesday', 'Thursday', 'Saturday'],
        availableTime: '2:00 PM - 6:00 PM',
        isActive: true
      },
      {
        doctorName: 'Amit Kumar',
        specialization: 'General Physician',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableTime: '10:00 AM - 4:00 PM',
        isActive: true
      }
    ]);

    console.log('Doctor availability seeded:', doctors);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
