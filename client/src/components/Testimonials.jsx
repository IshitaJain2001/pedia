import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from './Card';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      child: 'Aisha, 3 years old',
      rating: 5,
      text: 'Dr. Syed is amazing with children! My daughter was so scared of doctors, but he made her feel completely comfortable. The clinic environment is so child-friendly and colorful.',
      avatar: '👩',
    },
    {
      name: 'Mohammed Khan',
      child: 'Omar, 5 years old',
      rating: 5,
      text: 'We have been bringing our son to Dr. Syed since he was born. The personalized care and attention to detail is exceptional. He always takes time to answer all our questions.',
      avatar: '👨',
    },
    {
      name: 'Fatima Ali',
      child: 'Zara, 2 years old',
      rating: 5,
      text: 'The emergency care team saved us when my daughter had a severe allergic reaction. Quick response and professional care. Forever grateful to Dr. Syed and his team.',
      avatar: '👩',
    },
    {
      name: 'Hassan Malik',
      child: 'Yusuf, 4 years old',
      rating: 5,
      text: 'Best pediatric clinic in the area! The staff is friendly, the facilities are modern and clean, and most importantly, my kids actually look forward to their checkups now.',
      avatar: '👨',
    },
    {
      name: 'Ayesha Rahman',
      child: 'Noor, 1 year old',
      rating: 5,
      text: 'The newborn care program was incredibly helpful for us as first-time parents. Dr. Syed\'s guidance and support during those first few months was invaluable.',
      avatar: '👩',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    nextTestimonial();
  };

  const handlePrev = () => {
    prevTestimonial();
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Parent Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what families have to say about their experience with Dr. Syed
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 sm:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-orange to-primary-amber rounded-full flex items-center justify-center text-4xl mb-6">
                    {testimonials[currentIndex].avatar}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-primary-orange" />
                    ))}
                  </div>

                  <FaQuoteLeft className="text-primary-orange/30 text-4xl mb-4" />
                  
                  <p className="text-lg text-gray-700 mb-6 italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div className="border-t border-gray-200 pt-6 w-full">
                    <h4 className="text-xl font-poppins font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-primary-orange">
                      {testimonials[currentIndex].child}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary-orange w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
