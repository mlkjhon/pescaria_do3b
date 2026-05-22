// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfBKsQAc7ciMEEeIbrOVM-hAY4G-H9el4",
  authDomain: "listacompras-8a06b.firebaseapp.com",
  projectId: "listacompras-8a06b",
  storageBucket: "listacompras-8a06b.firebasestorage.app",
  messagingSenderId: "560101316856",
  appId: "1:560101316856:web:7230511bfd17cd5015030d",
  measurementId: "G-TEJ48HF0ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);