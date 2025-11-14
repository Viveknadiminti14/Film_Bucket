// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyBuSEuPRfVTp4Akh-99IjE_nkdlcoxQYyw",
  authDomain: "movie-bucket-e0799.firebaseapp.com",
  projectId: "movie-bucket-e0799",
  storageBucket: "movie-bucket-e0799.appspot.com",
  messagingSenderId: "836229781709",
  appId: "1:836229781709:web:6a660bbd09c27f1a92f184",
  measurementId: "G-V7H7YFF932"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

export default app;
