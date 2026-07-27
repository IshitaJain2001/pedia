import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
      question: 'What should I bring for my child\'s first visit?',
      answer: 'Please bring your child\'s immunization records, any previous medical records, insurance information, and a list of current medications if applicable.',
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
      answer: 'Absolutely! You can request a specific pediatrician when booking your appointment. We\'ll do our best to accommodate your preference based on availability.',
    },
    {
      question: 'How often should my child have checkups?',
      answer: 'We recommend regular checkups according to the standard pediatric schedule: newborn, 1 month, 2 months, 4 months, 6 months, 9 months, 12 months, 15 months, 18 months, 2 years, and annually thereafter.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-orange/10 to-primary-amber/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our pediatric services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="text-lg font-poppins font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-primary-orange" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
