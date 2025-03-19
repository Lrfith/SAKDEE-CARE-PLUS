import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB4SFGhmMeiot_VoSfw1r8cE4NeHNfqmt0",
  authDomain: "cpe451-db.firebaseapp.com",
  projectId: "cpe451-db",
  storageBucket: "cpe451-db.appspot.com", // Corrected storageBucket format
  messagingSenderId: "372742236026",
  appId: "1:372742236026:web:626ac2c3dc1e0eb1c918c3",
  measurementId: "G-B55218B1V0"
};

// Check if Firebase app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
