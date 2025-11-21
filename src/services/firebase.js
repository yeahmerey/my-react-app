// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV_BpODxu5L-fJjh8oy_Z8jrvBAvHhC74",
  authDomain: "my-react-app-d42e4.firebaseapp.com",
  projectId: "my-react-app-d42e4",
  storageBucket: "my-react-app-d42e4.firebasestorage.app",
  messagingSenderId: "522456908302",
  appId: "1:522456908302:web:92e9aa4cd25602e3eff25f",
  measurementId: "G-8QS6N8NDK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
