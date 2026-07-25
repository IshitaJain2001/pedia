const ClinicSchedule = require('../models/ClinicSchedule');
const DoctorAvailability = require('../models/DoctorAvailability');

const getChatbotResponse = async (req, res) => {
  try {
    const { query } = req.body;
    const lowerQuery = query.toLowerCase();
    
    let response = '';

    // Check for clinic days/timings questions
    if (lowerQuery.includes('day') || lowerQuery.includes('open') || lowerQuery.includes('closed')) {
      const schedule = await ClinicSchedule.findOne({ isActive: true });
      if (schedule) {
        response = `Clinic is open on: ${schedule.daysOpen.join(', ')}`;
      } else {
        response = 'Clinic schedule information is not available.';
      }
    } 
    // Check for timing questions
    else if (lowerQuery.includes('time') || lowerQuery.includes('timing') || lowerQuery.includes('hour')) {
      const schedule = await ClinicSchedule.findOne({ isActive: true });
      if (schedule) {
        response = `Clinic timing: ${schedule.openingTime} to ${schedule.closingTime}`;
      } else {
        response = 'Clinic timing information is not available.';
      }
    }
    // Check for doctor availability questions
    else if (lowerQuery.includes('doctor') || lowerQuery.includes('available') || lowerQuery.includes('today')) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const doctors = await DoctorAvailability.find({ 
        isActive: true,
        availableDays: today
      });
      
      if (doctors.length > 0) {
        const doctorList = doctors.map(d => 
          `- Dr. ${d.doctorName} (${d.specialization}) at ${d.availableTime}`
        ).join('\n');
        response = `Available doctors today (${today}):\n${doctorList}`;
      } else {
        response = `No doctors available today (${today}). Please check another day.`;
      }
    }
    // Default response
    else {
      response = 'I can help you with:\n- Clinic opening days\n- Clinic timings\n- Available doctors today\n\nPlease ask about any of these topics.';
    }

    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getChatbotResponse };
