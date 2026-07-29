import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name:   'Sarah Ahmed',
    child:  'Parent of Aisha, 3 yrs',
    rating: 5,
    text:   'Dr. S. Mashhood Abbas is truly amazing with children! My daughter was terrified of doctors, but he made her feel completely at ease. The clinic environment is so child-friendly and warm.',
    avatar: '👩',
    color:  'from-pink-400 to-rose-500',
  },
  {
    name:   'Mohammed Khan',
    child:  'Parent of Omar, 5 yrs',
    rating: 5,
    text:   'We have been bringing our son since he was born. The personalized care and attention to detail is simply exceptional. He always takes time to answer every single question.',
    avatar: '👨',
    color:  'from-blue-400 to-indigo-500',
  },
  {
    name:   'Fatima Ali',
    child:  'Parent of Zara, 2 yrs',
    rating: 5,
    text:   'The emergency team saved us when my daughter had a severe allergic reaction. The rapid response and professional care was outstanding. Forever grateful to Dr. S. Mashhood Abbas and his team.',
    avatar: '👩',
    color:  'from-violet-400 to-purple-500',
  },
  {
    name:   'Hassan Malik',
    child:  'Parent of Yusuf, 4 yrs',
    rating: 5,
    text:   'Best pediatric clinic in the area! Friendly staff, modern facilities, and my kids actually look forward to their checkups now — that alone says everything!',
    avatar: '👨',
    color:  'from-amber-400 to-orange-500',
  },
  {
    name:   'Ayesha Rahman',
    child:  'Parent of Noor, 1 yr',
    rating: 5,
    text:   "The newborn care program was incredibly helpful for us as first-time parents. Dr. S. Mashhood Abbas's guidance and support during those first few months was truly invaluable.",
    avatar: '👩',
    color:  'from-teal-400 to-emerald-500',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 sm:py-24 bg-neutral-50 relative overflow-hidden">

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="section-heading">What Parents Say</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Hear from families who trust us with their children's health and well-being
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card p-8 sm:p-10 relative">

                {/* Large quote icon */}
                <FaQuoteLeft className="absolute top-6 right-8 text-5xl text-primary-50 text-neutral-100 pointer-events-none" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-accent-amber text-sm" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-8 italic relative">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-soft`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-sm text-neutral-500">{t.child}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-soft hover:bg-primary-green hover:text-white hover:border-primary-green transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous"
            >
              <FaChevronLeft className="text-xs" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2.5 bg-primary-green'
                      : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-soft hover:bg-primary-green hover:text-white hover:border-primary-green transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next"
            >
              <FaChevronRight className="text-xs" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
