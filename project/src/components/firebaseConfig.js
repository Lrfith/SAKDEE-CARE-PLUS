import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// กำหนดค่า Firebase Config ของคุณที่นี่
const firebaseConfig = {
  apiKey: "AIzaSyB4SFGhmMeiot_VoSfw1r8cE4NeHNfqmt0",
  authDomain: "cpe451-db.firebaseapp.com",
  projectId: "cpe451-db",
  storageBucket: "cpe451-db.firebasestorage.app",
  messagingSenderId: "372742236026",
  appId: "1:372742236026:web:626ac2c3dc1e0eb1c918c3",
  measurementId: "G-B55218B1V0"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
