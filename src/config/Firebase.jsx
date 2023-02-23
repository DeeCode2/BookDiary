// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMR16rCTyvhijPYw_wNPZ9aVOotGMGilU",
  authDomain: "bookdiary-42532.firebaseapp.com",
  projectId: "bookdiary-42532",
  storageBucket: "bookdiary-42532.appspot.com",
  messagingSenderId: "1042807358126",
  appId: "1:1042807358126:web:ff3b7adda32683c9cba33f",
  measurementId: "G-XXZN9M6VVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const firestore = getFirestore(app);