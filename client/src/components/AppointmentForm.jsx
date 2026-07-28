import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaBaby, FaCalendarAlt, FaClock, FaStethoscope, FaUserMd } from 'react-icons/fa';

/* ── Reusable floating-label input ── */
const FloatInput = ({ label, icon: Icon, error, children, ...rest }) => (
  <div className="relative">
    {children ? (
      /* For select / textarea */
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10">
              <Icon />
            </div>
          )}
          {children}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    ) : (
      /* For text input */
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none">
              <Icon />
            </div>
          )}
          <input
            className={`form-input ${Icon ? 'pl-10' : ''} ${error ? '!border-red-400 !ring-red-100' : ''}`}
            {...rest}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    )}
  </div>
);

const doctors = ['Dr. Syed — Pediatrician & Neonatologist'];

const AppointmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('https://pedia-backend-6blx.onrender.com/api/appointments', data);
      if (res.data.success) {
        toast.success('Appointment booked successfully! We will confirm shortly.', { duration: 4000 });
        reset();
      } else {
        toast.error(res.data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClass = (hasError) =>
    `form-input pl-10 appearance-none bg-white ${hasError ? '!border-red-400 !ring-red-100' : ''}`;

  return (
    <div className="card p-6 sm:p-8 shadow-card-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

        {/* Parent Name */}
        <FloatInput
          label="Parent / Guardian Name"
          icon={FaUser}
          placeholder="e.g. Sarah Ahmed"
          error={errors.parentName?.message}
          {...register('parentName', {
            required: 'Parent name is required',
            minLength: { value: 2, message: 'At least 2 characters required' },
          })}
        />

        {/* Email + Phone — 2 col on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FloatInput
            label="Email Address"
            icon={FaEnvelope}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
            })}
          />
          <FloatInput
            label="Phone Number"
            icon={FaPhone}
            type="tel"
            placeholder="10-digit mobile number"
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' },
            })}
          />
        </div>

        {/* Child Name */}
        <FloatInput
          label="Child's Name"
          icon={FaBaby}
          placeholder="e.g. Aisha"
          error={errors.childName?.message}
          {...register('childName', {
            required: "Child's name is required",
            minLength: { value: 2, message: 'At least 2 characters required' },
          })}
        />

        {/* Child Age + Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FloatInput
            label="Child's Age"
            icon={FaBaby}
            placeholder="e.g. 3 years"
            error={errors.childAge?.message}
            {...register('childAge', { required: "Child's age is required" })}
          />

          {/* Gender select */}
          <FloatInput label="Gender" icon={FaUser} error={errors.gender?.message}>
            <select
              className={selectClass(!!errors.gender)}
              {...register('gender', { required: 'Gender is required' })}
              defaultValue=""
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FloatInput>
        </div>

        {/* Preferred Doctor */}
        <FloatInput label="Preferred Doctor" icon={FaUserMd} error={errors.doctor?.message}>
          <select
            className={selectClass(!!errors.doctor)}
            {...register('doctor', { required: 'Please select a doctor' })}
            defaultValue=""
          >
            <option value="" disabled>Select a doctor</option>
            {doctors.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </FloatInput>

        {/* Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FloatInput
            label="Appointment Date"
            icon={FaCalendarAlt}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            error={errors.appointmentDate?.message}
            {...register('appointmentDate', { required: 'Date is required' })}
          />

          {/* Time select */}
          <FloatInput label="Preferred Time" icon={FaClock} error={errors.preferredTime?.message}>
            <select
              className={selectClass(!!errors.preferredTime)}
              {...register('preferredTime', { required: 'Please select a time slot' })}
              defaultValue=""
            >
              <option value="" disabled>Select time slot</option>
              <option value="6:30 PM - 7:00 PM">6:30 PM – 7:00 PM</option>
              <option value="7:00 PM - 7:30 PM">7:00 PM – 7:30 PM</option>
            </select>
          </FloatInput>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
            Reason for Visit <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaStethoscope className="absolute left-3.5 top-3.5 text-neutral-400 text-sm pointer-events-none" />
            <textarea
              rows={3}
              placeholder="Brief description of symptoms or reason for visit…"
              className={`form-input pl-10 resize-none ${errors.reason ? '!border-red-400 !ring-red-100' : ''}`}
              {...register('reason', {
                required: 'Please describe the reason for visit',
                minLength: { value: 10, message: 'At least 10 characters required' },
              })}
            />
          </div>
          {errors.reason && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1">
              {errors.reason.message}
            </motion.p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Submitting…
            </span>
          ) : (
            'Confirm Appointment'
          )}
        </motion.button>

        <p className="text-center text-xs text-neutral-400 mt-3">
          We'll confirm your appointment within 24 hours via phone or email.
        </p>
      </form>
    </div>
  );
};

export default AppointmentForm;
