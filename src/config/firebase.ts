// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9DJ-bJUh6Y4AxnTEV-iVqzynFUEqsTbk",
  authDomain: "soc-media-423a1.firebaseapp.com",
  projectId: "soc-media-423a1",
  storageBucket: "soc-media-423a1.appspot.com",
  messagingSenderId: "826524336352",
  appId: "1:826524336352:web:5c0178f2fb2e0df9531085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)