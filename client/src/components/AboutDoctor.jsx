import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
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
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fix React's muted prop bug — must be set directly on DOM element
    video.muted = true;
    video.volume = 0;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked gracefully
      });
    };

    if (video.readyState >= 2) {
      setVideoLoaded(true);
      tryPlay();
    } else {
      const onLoaded = () => {
        setVideoLoaded(true);
        tryPlay();
      };
      video.addEventListener('loadeddata', onLoaded);
      return () => video.removeEventListener('loadeddata', onLoaded);
    }
  }, []);

  return (
    <section
      id="about"
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Video Background Layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Plain <video> — NOT motion.video (avoids muted prop bug) */}
        <video
          ref={videoRef}
          src="/videos/ek_chhoti_si_sec_ki_video_b.mp4"
          autoPlay
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Soft white/blue overlay — content remains perfectly readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, rgba(255,255,255,0.90) 0%, rgba(240,250,255,0.88) 40%, rgba(232,245,255,0.86) 100%)',
            zIndex: 1,
          }}
        />
      </div>

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
          <h2 className="section-heading">About Dr. Syed</h2>
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
            <div className="relative w-full max-w-[380px]">
              {/* Background accent */}
              <div className="absolute inset-4 bg-primary-50 rounded-3xl rotate-3" />

              {/* Card */}
              <div className="relative bg-white rounded-3xl shadow-card-lg border border-neutral-100 p-5 -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-72 sm:h-80 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200/50 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary-green/10 rounded-full" />
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-card flex items-center justify-center">
                    <svg className="w-11 h-11 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-poppins font-semibold text-neutral-800">Dr. Syed</p>
                    <p className="text-xs text-neutral-500">Upload doctor photo here</p>
                  </div>
                </div>

                {/* Credentials chip */}
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-green text-xs font-semibold border border-primary-100 px-3 py-1.5 rounded-full">
                    <FaCheckCircle className="text-xs" /> Certified Pediatrician
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100 px-3 py-1.5 rounded-full">
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
            <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 mb-1">Dr. Syed</h3>
            <p className="text-primary-green font-semibold text-base mb-5">Pediatrician &amp; Neonatologist</p>

            {/* Credential badges */}
            <div className="space-y-3 mb-6">
              {credentials.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <c.icon className="text-primary-green text-sm" />
                  </div>
                  <span className="text-sm text-neutral-700 font-medium">{c.text}</span>
                </div>
              ))}
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-7">
              Dr. Syed has over 15 years of experience in Pediatrics and Neonatology. With a passion for providing compassionate care to children of all ages, he has helped countless families navigate their children's health journeys with expertise and empathy — from routine wellness visits to complex neonatal cases.
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
