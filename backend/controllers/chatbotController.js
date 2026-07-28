const ClinicSchedule = require('../models/ClinicSchedule');
const DoctorAvailability = require('../models/DoctorAvailability');

const getChatbotResponse = async (req, res) => {
  try {
    const { query } = req.body;
    const lowerQuery = query.toLowerCase();
    
    let response = '';

    // Check for clinic days/timings questions - more flexible matching
    if (lowerQuery.includes('day') || lowerQuery.includes('open') || lowerQuery.includes('closed') || 
        lowerQuery.includes('week') || lowerQuery.includes('when') || lowerQuery.includes('schedule')) {
      const schedule = await ClinicSchedule.findOne({ isActive: true });
      if (schedule) {
        response = `Clinic is open on: ${schedule.daysOpen.join(', ')}`;
      } else {
        response = 'Clinic schedule information is not available. Please contact the clinic directly.';
      }
    } 
    // Check for timing questions - more flexible matching
    else if (lowerQuery.includes('time') || lowerQuery.includes('timing') || lowerQuery.includes('hour') || 
             lowerQuery.includes('what time') || lowerQuery.includes('open at') || lowerQuery.includes('close')) {
      const schedule = await ClinicSchedule.findOne({ isActive: true });
      if (schedule) {
        response = `Clinic timing: ${schedule.openingTime} to ${schedule.closingTime}`;
      } else {
        response = 'Clinic timing information is not available. Please contact the clinic directly.';
      }
    }
    // Check for doctor availability questions - more flexible matching
    else if (lowerQuery.includes('doctor') || lowerQuery.includes('available') || lowerQuery.includes('today') ||
             lowerQuery.includes('who') || lowerQuery.includes('appointment') || lowerQuery.includes('consult')) {
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
        response = `No doctors available today (${today}). Please check another day or call the clinic for availability.`;
      }
    }
    // Check for appointment related questions
    else if (lowerQuery.includes('book') || lowerQuery.includes('appointment') || lowerQuery.includes('visit')) {
      response = 'You can book an appointment by clicking the "Book Appointment" button on our website or by calling the clinic directly.';
    }
    // Check for contact/location questions
    else if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('address') || 
             lowerQuery.includes('location') || lowerQuery.includes('where')) {
      response = 'Please visit our website or contact the clinic directly for address and contact information.';
    }
    // Default response with more helpful guidance
    else {
      response = `I can help you with:\n- Clinic opening days\n- Clinic timings\n- Available doctors today\n- Booking appointments\n- Contact information\n\nTry asking like "What are the clinic timings?" or "Which doctors are available today?"`;
    }

    res.json({ success: true, response });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getChatbotResponse };
