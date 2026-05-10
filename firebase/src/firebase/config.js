// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBPDRBA_8KswtElTfP1Z4270PwBMIHw90",
  authDomain: "lms-student-management-6a4da.firebaseapp.com",
  projectId: "lms-student-management-6a4da",
  storageBucket: "lms-student-management-6a4da.firebasestorage.app",
  messagingSenderId: "125469855733",
  appId: "1:125469855733:web:cb8cd895fda091566bdabc",
  measurementId: "G-FZKQ4DZ2L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestoreConfig   =  getFirestore(app);

export {firestoreConfig};