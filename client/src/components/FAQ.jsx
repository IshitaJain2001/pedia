import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: 'What age groups do you treat?',
    answer: 'We provide comprehensive pediatric care for newborns, infants, toddlers, children, and adolescents from birth to 18 years of age.',
  },
  {
    question: 'Do you accept walk-in appointments?',
    answer: 'While we recommend scheduling appointments in advance, we do accept walk-ins for urgent cases. However, wait times may vary depending on the current patient load.',
  },
  {
    question: "What should I bring for my child's first visit?",
    answer: "Please bring your child's immunization records, any previous medical records, insurance information, and a list of current medications if applicable.",
  },
  {
    question: 'Do you offer vaccination services?',
    answer: 'Yes, we offer comprehensive vaccination services following the recommended immunization schedule. Our team ensures a comfortable experience for children during vaccinations.',
  },
  {
    question: 'What insurance plans do you accept?',
    answer: 'We accept most major insurance plans. Please contact our front desk to verify your specific insurance coverage before your visit.',
  },
  {
    question: 'Do you have emergency services?',
    answer: 'Yes, we provide 24/7 emergency pediatric care. Our emergency department is equipped to handle urgent medical situations with rapid response times.',
  },
  {
    question: 'Can I schedule a consultation with a specific doctor?',
    answer: "Absolutely! You can request a specific pediatrician when booking your appointment. We'll do our best to accommodate your preference based on availability.",
  },
  {
    question: 'How often should my child have checkups?',
    answer: 'We recommend regular checkups according to the standard pediatric schedule: newborn, 1 month, 2 months, 4 months, 6 months, 9 months, 12 months, 15 months, 18 months, 2 years, and annually thereafter.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">

      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary-50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">FAQ</span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Find answers to common questions about our pediatric services and clinic
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-primary-green/30 shadow-card bg-white'
                      : 'border-neutral-200 bg-white hover:border-primary-green/20 hover:shadow-soft'
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-1 rounded-t-2xl"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      {/* Number badge */}
                      <span className={`flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors duration-200 ${
                        isOpen ? 'bg-primary-green text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-sm sm:text-base font-poppins font-semibold transition-colors duration-200 ${
                        isOpen ? 'text-primary-green' : 'text-neutral-800'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        isOpen ? 'bg-primary-green text-white' : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      <FaChevronDown className="text-xs" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-primary-green/10">
                          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pl-10">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
