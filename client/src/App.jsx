import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import GeneralQueryForm from './components/GeneralQueryForm';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingButtons from './components/FloatingButtons';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <Services />
        <Doctors />
        <Statistics />
        <Testimonials />
        <FAQ />
        <AppointmentForm />
        <GeneralQueryForm />
        <Contact />
        <Footer />
        <ScrollToTop />
        <FloatingButtons />
        <Chatbot />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
