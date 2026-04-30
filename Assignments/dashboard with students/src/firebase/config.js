// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAPbjtV1aWIffIDG7VZFdUoFsLaX6w23VI",
  authDomain: "studentportal-af16a.firebaseapp.com",
  projectId: "studentportal-af16a",
  storageBucket: "studentportal-af16a.firebasestorage.app",
  messagingSenderId: "622837272006",
  appId: "1:622837272006:web:65af60d7ebeef415a076c7",
  measurementId: "G-MN1WZXGBD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreconfig = getFirestore(app);   
const analytics = getAnalytics(app);
export {firestoreconfig} ;

