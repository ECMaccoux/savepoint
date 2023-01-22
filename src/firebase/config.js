import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4XYkbdV6V6VdlGLJEDISQXZydEHxD0iw",
  authDomain: "maccoux-savepoint.firebaseapp.com",
  projectId: "maccoux-savepoint",
  storageBucket: "maccoux-savepoint.appspot.com",
  messagingSenderId: "1008604857279",
  appId: "1:1008604857279:web:c13193a198e22167e5970a",
  measurementId: "G-82TSY4J37C"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;