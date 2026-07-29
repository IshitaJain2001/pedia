import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDXyMJJ_L0i-8kw2TpLYJKINsILOsT6cAo",
  authDomain: "pedia-97ed4.firebaseapp.com",
  projectId: "pedia-97ed4",
  storageBucket: "pedia-97ed4.firebasestorage.app",
  messagingSenderId: "1000799971328",
  appId: "1:1000799971328:web:236ef72034b1072a0e10e5",
  measurementId: "G-BH5NXZ3MRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
