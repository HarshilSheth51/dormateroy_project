import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBboTG84VAJVQYHZJAHHjXYGWT7WkPaxFQ",
  authDomain: "dormatery-project.firebaseapp.com",
  databaseURL: "https://dormatery-project-default-rtdb.firebaseio.com",
  projectId: "dormatery-project",
  storageBucket: "dormatery-project.appspot.com",
  messagingSenderId: "721137570487",
  appId: "1:721137570487:web:d15b0dd03d63b72fa0b332",
  measurementId: "G-2FPSPG5F0J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
