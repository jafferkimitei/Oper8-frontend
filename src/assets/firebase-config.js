// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAte_a8lHwYIaubH9JXyBMvzAYn6wxihes",
  authDomain: "oper8-auth.firebaseapp.com",
  projectId: "oper8-auth",
  storageBucket: "oper8-auth.firebasestorage.app",
  messagingSenderId: "740324465209",
  appId: "1:740324465209:web:ddcf515796894498f38be8",
  measurementId: "G-DHVBNEQWG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth service
const auth = getAuth(app);

export { auth };
export default app;
