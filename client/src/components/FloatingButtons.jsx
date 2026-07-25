import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
      >
        <FaWhatsapp size={28} />
      </a>
      <a
        href="tel:+15551234567"
        className="w-14 h-14 bg-primary-sky text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-mint transition-colors duration-300"
      >
        <FaPhoneAlt size={24} />
      </a>
    </div>
  );
};

export default FloatingButtons;
