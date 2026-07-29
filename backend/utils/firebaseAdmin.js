const admin = require('firebase-admin');

let isInitialized = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    isInitialized = true;
    console.log('Firebase Admin initialized with service account key.');
  } else {
    // Attempt default initialization
    admin.initializeApp();
    isInitialized = true;
    console.log('Firebase Admin initialized with default credentials.');
  }
} catch (error) {
  console.warn('Firebase Admin SDK initialization warning:', error.message);
}

admin.isInitialized = isInitialized;

module.exports = admin;
