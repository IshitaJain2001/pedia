import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutDoctor from './components/AboutDoctor';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import AskDoctor from './components/AskDoctor';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FormsSection from './components/FormsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingButtons from './components/FloatingButtons';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

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
        
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={
            <>
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
                <AskDoctor />
                <Statistics />
                <Testimonials />
                <FAQ />
                <FormsSection />
                <Contact />
                <Footer />
              </motion.div>
              <ScrollToTop />
              <FloatingButtons />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 4px 24px -4px rgba(0,0,0,0.12)',
              background: '#FFFFFF',
              color: '#1F2937',
              border: '1px border border-neutral-100',
              padding: '12px 18px',
            },
            success: {
              iconTheme: {
                primary: '#2563EB',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
