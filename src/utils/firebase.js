// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8ErZwsZhltR0xg6bCzy95h6T_g7ireL0",
  authDomain: "netflix-gpt-a8a8b.firebaseapp.com",
  projectId: "netflix-gpt-a8a8b",
  storageBucket: "netflix-gpt-a8a8b.appspot.com",
  messagingSenderId: "184858267844",
  appId: "1:184858267844:web:1f7668f272242a21deb991",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
export const auth = getAuth();
