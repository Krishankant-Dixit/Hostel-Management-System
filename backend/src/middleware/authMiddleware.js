// middleware/authMiddleware.js
const admin = require('firebase-admin');

const checkAuth = async (req, res, next) => {
  try {
    // 1. React frontend se incoming Request ke headers se token nikalna
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access Denied: No Token Provided or Invalid Format.' 
      });
    }

    // 2. "Bearer eyJhbGci..." me se sirf Token string ko alag karna
    const token = authHeader.split(' ')[1];

    // 3. Firebase Admin SDK se token ko verify karna
    // Yeh check karta hai ki token real hai, expire to nahi hua, aur tamper to nahi kiya gaya
    const decodedToken = await admin.auth().verifyIdToken(token);

    // 4. Token valid hai, to user details (uid, email, name) request object me attach kar do
    // Isse aage controllers me humein pata chal jayega ki kaun sa user call kar raha hai
    req.user = decodedToken;

    // 5. Agle controller function ya middleware par pass on karo
    next();
    
  } catch (error) {
    console.error('Firebase Auth Middleware Error:', error.message);
    return res.status(403).json({ 
      success: false, 
      message: 'Unauthorized: Invalid or Expired Token.' 
    });
  }
};

module.exports = { checkAuth };