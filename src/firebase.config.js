import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0hof8xTEaUqwzE-8ZZ6HjN2FvVmRJi84",
  authDomain: "eco-resort-c5e8a.firebaseapp.com",
  projectId: "eco-resort-c5e8a",
  storageBucket: "eco-resort-c5e8a.firebasestorage.app",
  messagingSenderId: "263408484786",
  appId: "1:263408484786:web:fccaac2bf0fda7bf2e24ab",
  measurementId: "G-LLWQ846M5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);