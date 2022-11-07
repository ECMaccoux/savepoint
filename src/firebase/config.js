// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4XYkbdV6V6VdlGLJEDISQXZydEHxD0iw",
  authDomain: "maccoux-savepoint.firebaseapp.com",
  projectId: "maccoux-savepoint",
  storageBucket: "maccoux-savepoint.appspot.com",
  messagingSenderId: "1008604857279",
  appId: "1:1008604857279:web:c13193a198e22167e5970a",
  measurementId: "G-82TSY4J37C"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase;