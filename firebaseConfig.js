// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBiT_WbANpN4ntqRCvuV48EZ4x4lsxO5Wc",
  authDomain: "boat-51710.firebaseapp.com",
  // databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: "boat-51710",
  storageBucket: "boat-51710.appspot.com",
  messagingSenderId: "1093694730199",
  appId: "1:1093694730199:web:84e89bac8dfb79eed4a592",
  measurementId: "G-P535XQYL57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()


export { app, auth }
