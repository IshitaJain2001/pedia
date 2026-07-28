import { motion } from 'framer-motion';
import Card from './Card';

const AboutDoctor = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
            About Dr. Syed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our experienced pediatrician dedicated to your child's health and well-being
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Doctor Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-background-green p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-gray-900 mb-6">
                Dr. Syed
              </h3>
              <p className="text-primary-green font-semibold text-lg mb-6">
                Pediatrician & Neonatologist
              </p>
              
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Dr. Syed has over 15 years of experience in Pediatrics and Neonatology. With a passion for providing compassionate care to children of all ages, Dr. Syed has helped countless families navigate their children's health journeys with expertise and empathy.
              </p>

              <h4 className="text-xl font-poppins font-semibold text-gray-900 mb-4">
                Special Interests
              </h4>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                  <span className="text-gray-700">Child Growth</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                  <span className="text-gray-700">Development</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                  <span className="text-gray-700">General Pediatrics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-emerald rounded-full"></div>
                  <span className="text-gray-700">Behavioural Disorders</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-teal rounded-full"></div>
                  <span className="text-gray-700">Neonatal Care</span>
                </li>
              </ul>

              <motion.button
                className="bg-gradient-to-r from-primary-green to-primary-light text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Read More</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Doctor Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-40 h-40 bg-primary-green/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-light/10 rounded-full blur-2xl"
              />
              
              {/* Image Container with overlap effect */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-gray-200 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Placeholder for doctor image */}
                  <div className="w-full h-80 bg-gradient-to-br from-primary-green/20 to-primary-light/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-20 h-20 text-primary-green mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700 font-medium">Dr. Syed</p>
                      <p className="text-sm text-gray-500">Please upload the doctor image</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;
