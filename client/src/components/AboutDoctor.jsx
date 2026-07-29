import { motion } from 'framer-motion';
import { FaCheckCircle, FaAward, FaUserMd } from 'react-icons/fa';
import { MdScience } from 'react-icons/md';

const specialInterests = [
  { label: 'Child Growth & Development',   color: 'bg-primary-50 text-primary-green border-primary-100' },
  { label: 'General Pediatrics',            color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { label: 'Behavioural Disorders',         color: 'bg-teal-50 text-teal-700 border-teal-100' },
  { label: 'Neonatal & Newborn Care',       color: 'bg-green-50 text-green-700 border-green-100' },
  { label: 'Vaccination & Immunization',    color: 'bg-lime-50 text-lime-700 border-lime-100' },
];

const credentials = [
  { icon: FaAward,   text: 'Board-Certified Pediatrician & Neonatologist' },
  { icon: FaUserMd,  text: '15+ Years Clinical Experience' },
  { icon: MdScience, text: 'Expert in Newborn & High-Risk Neonatal Care' },
];

const AboutDoctor = () => {

  return (
    <section
      id="about"
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Static Light Blue/White Gradient Background (replaces video) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #ffffff 0%, #f0faff 40%, #e8f5ff 100%)',
          zIndex: 0,
        }}
      />

      {/* Subtle decorative blob — unchanged, sits above video layer */}
      <div
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '320px', height: '320px',
          background: 'rgba(240,251,244,1)',
          borderRadius: '50%', filter: 'blur(60px)',
          transform: 'translate(33%, -50%)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />

      {/* ── All content — above video and overlay ── */}
      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="section-tag">Meet The Doctor</span>
          <h2 className="section-heading">About Us</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Dedicated to providing exceptional care for children of all ages with compassion and expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Doctor Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Background accent */}
              <div className="absolute inset-4 bg-primary-50 rounded-3xl rotate-3" />

              {/* Card — overflow-hidden clips the image to rounded corners, no top padding */}
              <div className="relative bg-white rounded-3xl shadow-card-lg border border-neutral-100 overflow-hidden transition-transform duration-500">

                {/* Image — flush to top, full width, taller */}
                <div className="w-full h-96 sm:h-[420px] relative bg-neutral-100">
                  <img
                    src="/videos/WhatsApp Image 2026-07-29 at 10.40.56 AM.jpeg"
                    alt="Dr. S. Mashhood Abbas — Pediatrician & Neonatologist"
                    className="w-full h-full object-cover"
                    style={{ display: 'block', objectPosition: 'center 5%' }}
                  />
                  {/* Gradient at bottom for name readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-0 right-0 text-center px-3">
                    <p className="font-poppins font-semibold text-white text-sm drop-shadow-md">Dr. S. Mashhood Abbas</p>
                    <p className="text-[11px] text-white/85 drop-shadow">Pediatrician &amp; Neonatologist</p>
                  </div>
                </div>

                {/* Credentials chip */}
                <div className="flex items-center justify-center gap-2 px-5 py-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100 px-3 py-1.5 rounded-full">
                    <FaCheckCircle className="text-xs" /> Certified Pediatrician
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 px-3 py-1.5 rounded-full">
                    <FaCheckCircle className="text-xs" /> Neonatologist
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 mb-1">Dr. S. Mashhood Abbas</h3>
            <p className="text-primary-green font-semibold text-base mb-5">Pediatrician &amp; Neonatologist</p>

            {/* Credential badges */}
            <div className="space-y-3 mb-6">
              {credentials.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <c.icon className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-sm text-neutral-700 font-medium">{c.text}</span>
                </div>
              ))}
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-7">
              The clinic is dedicated to providing compassionate, evidence-based pediatric and neonatal care for newborns, infants, children, and adolescents. Our mission is to ensure every child receives personalized medical attention in a safe, welcoming, and child-friendly environment while supporting parents at every step of their healthcare journey.
            </p>

            {/* Special Interests */}
            <div className="mb-7">
              <h4 className="text-base font-poppins font-semibold text-neutral-900 mb-3">Special Interests</h4>
              <div className="flex flex-wrap gap-2">
                {specialInterests.map((item, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium border rounded-full px-3 py-1.5 ${item.color}`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => {
                const el = document.querySelector('#forms');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-sm px-6 py-3"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Consultation
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;
