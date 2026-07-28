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
    'Dr. Syed - Pediatrician & Neonatologist',
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log('Submitting appointment data:', data);
    try {
      const response = await axios.post('https://pedia-backend-6blx.onrender.com/api/appointments', data);
      console.log('Appointment response:', response.data);
      if (response.data.success) {
        toast.success('Appointment request submitted successfully!');
        reset();
      } else {
        toast.error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      console.error('Error response:', error.response);
      toast.error(
        error.response?.data?.message || error.message || 'Failed to submit appointment. Please try again.'
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
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule a visit with Dr. Syed for your child's healthcare needs
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
              <div className="relative">
                <motion.input
                  type="text"
                  {...register('parentName', {
                    required: 'Parent name is required',
                    minLength: {
                      value: 2,
                      message: 'Parent name must be at least 2 characters',
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer ${
                    errors.parentName ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                  }`}
                  placeholder=" "
                  animate={errors.parentName ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                  Parent Name *
                </label>
                {errors.parentName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.parentName.message}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <motion.input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Please provide a valid email',
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                  }`}
                  placeholder=" "
                  animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                  Email *
                </label>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Phone */}
              <div className="relative">
                <motion.input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please provide a valid 10-digit phone number',
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                  }`}
                  placeholder=" "
                  animate={errors.phone ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                  Phone Number *
                </label>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </div>

              {/* Child Name */}
              <div className="relative">
                <motion.input
                  type="text"
                  {...register('childName', {
                    required: 'Child name is required',
                    minLength: {
                      value: 2,
                      message: 'Child name must be at least 2 characters',
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer ${
                    errors.childName ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                  }`}
                  placeholder=" "
                  animate={errors.childName ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                  Child Name *
                </label>
                {errors.childName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.childName.message}
                  </motion.p>
                )}
              </div>

              {/* Child Age and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <motion.input
                    type="text"
                    {...register('childAge', {
                      required: 'Child age is required',
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer ${
                      errors.childAge ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                    }`}
                    placeholder=" "
                    animate={errors.childAge ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  />
                  <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                    Child Age *
                  </label>
                  {errors.childAge && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.childAge.message}
                    </motion.p>
                  )}
                </div>

                <div className="relative">
                  <motion.select
                    {...register('gender', {
                      required: 'Gender is required',
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer bg-white ${
                      errors.gender ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                    }`}
                    animate={errors.gender ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </motion.select>
                  <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                    Gender *
                  </label>
                  {errors.gender && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.gender.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Preferred Doctor */}
              <div className="relative">
                <motion.select
                  {...register('doctor', {
                    required: 'Preferred doctor is required',
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer bg-white ${
                    errors.doctor ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                  }`}
                  animate={errors.doctor ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </motion.select>
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                  Preferred Doctor *
                </label>
                {errors.doctor && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.doctor.message}
                  </motion.p>
                )}
              </div>

              {/* Appointment Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <motion.input
                    type="date"
                    {...register('appointmentDate', {
                      required: 'Appointment date is required',
                    })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer ${
                      errors.appointmentDate ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                    }`}
                    animate={errors.appointmentDate ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  />
                  <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                    Appointment Date *
                  </label>
                  {errors.appointmentDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.appointmentDate.message}
                    </motion.p>
                  )}
                </div>

                <div className="relative">
                  <motion.select
                    {...register('preferredTime', {
                      required: 'Preferred time is required',
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer bg-white ${
                      errors.preferredTime ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                    }`}
                    animate={errors.preferredTime ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <option value="">Select Time</option>
                    <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                  </motion.select>
                  <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                    Preferred Time *
                  </label>
                  {errors.preferredTime && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.preferredTime.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Reason for Visit */}
              <div className="relative">
                <motion.textarea
                  {...register('reason', {
                    required: 'Reason for visit is required',
                    minLength: {
                      value: 10,
                      message: 'Reason must be at least 10 characters',
                    },
                  })}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer resize-none ${
                    errors.reason ? 'border-red-500' : 'border-gray-300 focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20'
                  }`}
                  placeholder=" "
                  animate={errors.reason ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-orange bg-white px-1">
                  Reason for Visit *
                </label>
                {errors.reason && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.reason.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
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
