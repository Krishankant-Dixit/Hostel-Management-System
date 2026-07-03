// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. Authentication ke liye SDK packages ko import karo
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV5p1tXSGFqfAxJmeMwR8QY8WkNSo83LM",
  authDomain: "hostel-management-system-7ae9c.firebaseapp.com",
  projectId: "hostel-management-system-7ae9c",
  storageBucket: "hostel-management-system-7ae9c.firebasestorage.app",
  messagingSenderId: "937325183737",
  appId: "1:937325183737:web:ca12196e2141bf498bd828",
  measurementId: "G-CTTNM56QPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. 🚨 REAL MAGIC: Auth aur Google Provider ko initialize aur EXPORT karo
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Baaki authentication ke modules ko bhi export kar dete hain future use ke liye
export { signInWithPopup, signOut };