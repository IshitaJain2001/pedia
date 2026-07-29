import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { FaUserShield, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AUTHORIZED_EMAILS = ['drabbas10@gmail.com', 'ishitajain385@gmail.com'];

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setDenied(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      if (!AUTHORIZED_EMAILS.includes(user.email)) {
        setDenied(true);
        // Automatically sign out from Firebase
        await signOut(auth);
        toast.error('Access Denied: Unauthorized account.');
      } else {
        const idToken = await user.getIdToken();
        localStorage.setItem('adminToken', idToken);
        localStorage.setItem('adminEmail', user.email);
        toast.success('Successfully logged in as Admin!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 relative overflow-hidden font-inter">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-card-lg border border-neutral-100 p-8 sm:p-10 relative z-10"
      >
        {!denied ? (
          <div className="text-center">
            {/* Shield Icon */}
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
              <FaUserShield size={32} />
            </div>

            <h1 className="text-2xl font-poppins font-bold text-neutral-900 mb-2">
              Admin Login Portal
            </h1>
            <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
              Secure access for authorized clinical administration only.
            </p>

            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-semibold rounded-2xl shadow-card hover:shadow-card-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin text-neutral-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Connecting…</span>
                </div>
              ) : (
                <>
                  <FcGoogle className="text-2xl" />
                  <span>Continue with Google</span>
                </>
              )}
            </motion.button>

            <button
              onClick={() => navigate('/')}
              className="mt-6 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="text-center">
            {/* Access Denied View */}
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
              <FaExclamationTriangle size={32} />
            </div>

            <h1 className="text-2xl font-poppins font-bold text-red-600 mb-4">
              Access Denied
            </h1>
            <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
              You are not authorized to access the Admin Dashboard.
            </p>

            <motion.button
              onClick={() => setDenied(false)}
              className="w-full py-4 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Another Account
            </motion.button>

            <button
              onClick={() => navigate('/')}
              className="mt-6 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
