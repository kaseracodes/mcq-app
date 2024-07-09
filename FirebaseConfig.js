// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4fMEMk3Djyp3jJNAWi869d-4TorZy-F4",
  authDomain: "mcq-app-87907.firebaseapp.com",
  projectId: "mcq-app-87907",
  storageBucket: "mcq-app-87907.appspot.com",
  messagingSenderId: "1075182090171",
  appId: "1:1075182090171:web:5f26c736fed1a5150db69e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };