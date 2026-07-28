import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutDoctor from './components/AboutDoctor';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FormsSection from './components/FormsSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingButtons from './components/FloatingButtons';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background-green">
        <ScrollProgress />
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <Hero />
          <AboutDoctor />
          <WhyChooseUs />
          <Services />
          <Statistics />
          <Testimonials />
          <FAQ />
          <FormsSection />
          <Contact />
          <Footer />
        </motion.div>
        <ScrollToTop />
        <FloatingButtons />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
