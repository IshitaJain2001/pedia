import { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaBaby, FaPen, FaComment, FaVideo, FaInfoCircle } from 'react-icons/fa';

/* ── Reusable float input for enquiry form ── */
const FloatInput = forwardRef(({ label, icon: Icon, error, children, ...rest }, ref) => (
  <div className="relative">
    {children ? (
      /* For select / textarea */
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-3.5 text-primary-green text-sm pointer-events-none z-10">
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
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-green text-sm pointer-events-none">
              <Icon />
            </div>
          )}
          <input
            ref={ref}
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
));

FloatInput.displayName = 'FloatInput';

const GeneralQueryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      queryType: 'Other Query',
      name: '',
      email: '',
      phone: '',
      childAge: '',
      subject: '',
      message: '',
    }
  });

  const selectedQueryType = watch('queryType');

  useEffect(() => {
    const handleSetType = (e) => {
      if (e.detail) {
        setValue('queryType', e.detail);
      }
    };
    window.addEventListener('set-query-type', handleSetType);
    return () => window.removeEventListener('set-query-type', handleSetType);
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://pedia-backend-6blx.onrender.com/api/general-query', data);
      if (response.data.success) {
        toast.success(
          data.queryType === 'Online Consultation'
            ? 'Your Online Consultation request has been submitted successfully! We will connect with you within 24 hours.'
            : 'Your query has been submitted successfully! We will get back to you within 24 hours.',
          { duration: 6000 }
        );
        reset({
          queryType: 'Other Query',
          name: '',
          email: '',
          phone: '',
          childAge: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error(response.data.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-6 sm:p-8 shadow-card-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

        {/* Query Type / Consultation Type Dropdown */}
        <FloatInput
          label="Query Type / Purpose"
          icon={FaVideo}
          error={errors.queryType?.message}
        >
          <select
            className={`form-input pl-10 cursor-pointer bg-white ${selectedQueryType === 'Online Consultation' ? '!border-emerald-500 !ring-2 !ring-emerald-100 bg-emerald-50/20' : ''}`}
            {...register('queryType', {
              required: 'Please select query type',
            })}
          >
            <option value="Other Query">Other Query / General Enquiry</option>
            <option value="Online Consultation">Online Consultation</option>
          </select>
        </FloatInput>

        {selectedQueryType === 'Online Consultation' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-medium"
          >
            <FaInfoCircle className="text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Online Consultation selected:</strong> Dr. Syed will connect with you via video call / phone call after reviewing your details.
            </span>
          </motion.div>
        )}

        {/* Full Name */}
        <FloatInput
          label="Full Name"
          icon={FaUser}
          placeholder="e.g. Sarah Ahmed"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
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
              required: 'Phone number is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' },
            })}
          />
        </div>

        {/* Child's Age */}
        <FloatInput
          label="Child's Age"
          icon={FaBaby}
          placeholder="e.g. 3 years, 6 months"
          error={errors.childAge?.message}
          {...register('childAge', {
            required: "Child's age is required",
          })}
        />

        {/* Subject */}
        <FloatInput
          label="Subject"
          icon={FaPen}
          placeholder="e.g. Query about vaccinations / Consultation request"
          error={errors.subject?.message}
          {...register('subject', {
            required: 'Subject is required',
            minLength: { value: 3, message: 'Subject must be at least 3 characters' },
          })}
        />

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
            Your Message <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaComment className="absolute left-3.5 top-3.5 text-primary-green text-sm pointer-events-none" />
            <textarea
              rows={4}
              placeholder="How can we help you? Describe your query in detail…"
              className={`form-input pl-10 resize-none ${errors.message ? '!border-red-400 !ring-red-100' : ''}`}
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
              })}
            />
          </div>
          {errors.message && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1">
              {errors.message.message}
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
            'Submit Enquiry'
          )}
        </motion.button>

        <p className="text-center text-xs text-neutral-400 mt-3">
          Our team will review your enquiry and get back to you as soon as possible.
        </p>
      </form>
    </div>
  );
};

export default GeneralQueryForm;
