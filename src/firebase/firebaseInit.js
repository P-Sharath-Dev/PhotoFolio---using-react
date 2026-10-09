import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9jf0RX3_f2BuDZYKSeieSp3MlqqxPNu4",
  authDomain: "photofolio-f2eb0.firebaseapp.com",
  projectId: "photofolio-f2eb0",
  storageBucket: "photofolio-f2eb0.firebasestorage.app",
  messagingSenderId: "156739815275",
  appId: "1:156739815275:web:702708d3ff8c16138c2e2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
