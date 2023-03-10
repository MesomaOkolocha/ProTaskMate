// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGrIhuR4tljso4XOiwTihMi3-jPA3_axI",
  authDomain: "protaskmate.firebaseapp.com",
  projectId: "protaskmate",
  storageBucket: "protaskmate.appspot.com",
  messagingSenderId: "742993071498",
  appId: "1:742993071498:web:bc27f0622c5c13afb14c73",
  measurementId: "G-9221MEC3E9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)
const auth = getAuth(app)

export default app
export {analytics, db, auth}