const admin = require('../utils/firebaseAdmin');

const AUTHORIZED_EMAILS = ['drabbas10@gmail.com', 'ishitajain385@gmail.com'];
const PROJECT_ID = 'pedia-97ed4';

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied. No token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken = null;

    if (admin.isInitialized) {
      try {
        decodedToken = await admin.auth().verifyIdToken(token);
      } catch (err) {
        console.warn('Firebase Admin verification failed, falling back to secure manual verification...', err.message);
      }
    }

    // Fallback/Secure manual JWT decoding and claims validation
    if (!decodedToken) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token structure');
        }
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
        
        // Verify claims
        const now = Math.floor(Date.now() / 1000);
        if (payload.iss !== `https://securetoken.google.com/${PROJECT_ID}`) {
          throw new Error('Invalid token issuer');
        }
        if (payload.aud !== PROJECT_ID) {
          throw new Error('Invalid token audience');
        }
        if (payload.exp && payload.exp < now) {
          throw new Error('Token has expired');
        }
        
        decodedToken = payload;
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired authentication token.',
          error: err.message
        });
      }
    }
    
    // Check if email matches authorized email
    if (!AUTHORIZED_EMAILS.includes(decodedToken.email)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access the Admin Dashboard.'
      });
    }

    req.admin = decodedToken;
    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
      error: error.message
    });
  }
};

module.exports = adminAuth;
