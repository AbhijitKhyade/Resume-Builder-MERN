// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-14bb2.firebaseapp.com",
    projectId: "mern-estate-14bb2",
    storageBucket: "mern-estate-14bb2.appspot.com",
    messagingSenderId: "93773660723",
    appId: "1:93773660723:web:47b2a32503a4ce8c3c5946"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);