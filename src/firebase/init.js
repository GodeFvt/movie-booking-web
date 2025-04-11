// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const API_KEY = import.meta.env.VITE_FIRE_BASE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_FIRE_BASE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_FIRE_BASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_FIRE_BASE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_FIRE_BASE_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_FIRE_BASE_MEASUREMENT_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init auth service
const auth = getAuth(app);

// init firestore service
const db = getFirestore();

export { auth, db };
