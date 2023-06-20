// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiT_WbANpN4ntqRCvuV48EZ4x4lsxO5Wc",
  authDomain: "boat-51710.firebaseapp.com",
  projectId: "boat-51710",
  storageBucket: "boat-51710.appspot.com",
  messagingSenderId: "1093694730199",
  appId: "1:1093694730199:web:84e89bac8dfb79eed4a592",
  measurementId: "G-P535XQYL57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//initialize firebase auth
const auth = getAuth()


export { app, auth, analytics }
