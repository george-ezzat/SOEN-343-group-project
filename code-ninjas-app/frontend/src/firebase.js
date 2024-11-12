// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSOvzhQ8WQH0C2mzs4FJx4oBgxQiYPJ4s",
  authDomain: "codeninjas-86894.firebaseapp.com",
  projectId: "codeninjas-86894",
  storageBucket: "codeninjas-86894.firebasestorage.app",
  messagingSenderId: "622748801942",
  appId: "1:622748801942:web:f4b89e0ff6a27e82029bb7",
  measurementId: "G-VFEQB4GSJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
