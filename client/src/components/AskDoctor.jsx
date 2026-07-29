import { motion } from 'framer-motion';
import GeneralQueryForm from './GeneralQueryForm';
import { FaQuestionCircle } from 'react-icons/fa';

const AskDoctor = () => {
  return (
    <section id="ask-doctor" className="py-20 sm:py-24 bg-neutral-50 relative overflow-hidden">

      {/* Decorative top banner */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <FaQuestionCircle className="text-blue-600" />
            Enquiry
          </span>
          <h2 className="section-heading">Ask Your Doctor</h2>
          <div className="section-divider bg-blue-600" style={{ backgroundColor: '#2563EB' }} />
          <p className="section-subheading">
            Have a question or medical query? Send a message to Dr. S. Mashhood Abbas for expert guidance.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <GeneralQueryForm />
        </motion.div>
      </div>
    </section>
  );
};

export default AskDoctor;
