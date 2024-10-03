import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  }
})
/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1-adyfRS_c8xWlHNVwaV3xIwtNQeD4OU",
  authDomain: "tp2-jse.firebaseapp.com",
  projectId: "tp2-jse",
  storageBucket: "tp2-jse.appspot.com",
  messagingSenderId: "967207773612",
  appId: "1:967207773612:web:400c9c0fed89c860d24609",
  measurementId: "G-V241VT8GDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/