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
      <div className="min-h-screen bg-white">
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 4px 24px -4px rgba(0,0,0,0.12)',
            },
            success: {
              style: { background: '#F0FBF4', color: '#1A5C38', border: '1px solid #BBF7D0' },
              iconTheme: { primary: '#1A5C38', secondary: '#F0FBF4' },
            },
            error: {
              style: { background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
