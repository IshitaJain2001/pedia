import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import Card from './Card';
import Button from './Button';

const AppointmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const doctors = [
    'Dr. Sarah Johnson - Pediatrician',
    'Dr. Michael Chen - Neonatologist',
    'Dr. Emily Williams - Pediatric Cardiologist',
    'Dr. James Anderson - Pediatric Surgeon',
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/appointments', data);
      if (response.data.success) {
        toast.success('Appointment request submitted successfully!');
        reset();
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit appointment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-800 mb-4">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-600">
            Schedule a visit with our expert pediatricians for your child's healthcare needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Parent Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Name *
                </label>
                <input
                  type="text"
                  {...register('parentName', {
                    required: 'Parent name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Name cannot exceed 100 characters',
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter parent's full name"
                />
                {errors.parentName && (
                  <p className="mt-1 text-sm text-red-500">{errors.parentName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Please provide a valid email',
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\d\s\-\+\(\)]{10,}$/,
                      message: 'Please provide a valid phone number',
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Child Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child Name *
                </label>
                <input
                  type="text"
                  {...register('childName', {
                    required: 'Child name is required',
                    minLength: {
                      value: 2,
                      message: 'Child name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Child name cannot exceed 100 characters',
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter child's full name"
                />
                {errors.childName && (
                  <p className="mt-1 text-sm text-red-500">{errors.childName.message}</p>
                )}
              </div>

              {/* Child Age and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child Age *
                  </label>
                  <input
                    type="text"
                    {...register('childAge', {
                      required: 'Child age is required',
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none"
                    placeholder="e.g., 3 years"
                  />
                  {errors.childAge && (
                    <p className="mt-1 text-sm text-red-500">{errors.childAge.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    {...register('gender', {
                      required: 'Gender is required',
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Preferred Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Doctor *
                </label>
                <select
                  {...register('doctor', {
                    required: 'Preferred doctor is required',
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none bg-white"
                >
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
                {errors.doctor && (
                  <p className="mt-1 text-sm text-red-500">{errors.doctor.message}</p>
                )}
              </div>

              {/* Appointment Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    {...register('appointmentDate', {
                      required: 'Appointment date is required',
                    })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none"
                  />
                  {errors.appointmentDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.appointmentDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    {...register('preferredTime', {
                      required: 'Preferred time is required',
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none bg-white"
                  >
                    <option value="">Select Time</option>
                    <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="mt-1 text-sm text-red-500">{errors.preferredTime.message}</p>
                  )}
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit *
                </label>
                <textarea
                  {...register('reason', {
                    required: 'Reason for visit is required',
                    minLength: {
                      value: 10,
                      message: 'Reason must be at least 10 characters',
                    },
                    maxLength: {
                      value: 500,
                      message: 'Reason cannot exceed 500 characters',
                    },
                  })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all duration-300 outline-none resize-none"
                  placeholder="Describe the reason for your visit"
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;
