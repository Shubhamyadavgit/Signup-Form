// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy3Q8ivRnTb9ueoTRH85k9cy2X81pA_pg",
  authDomain: "signup-49439.web.app",
  projectId: "signup-49439",
  storageBucket: "signup-49439.appspot.com",
  messagingSenderId: "785501022006",
  appId: "1:785501022006:web:9d41987563b3a8a2a07597",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };

