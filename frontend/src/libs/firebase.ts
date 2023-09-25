// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA7e427wEmrq-g7afcTj_EBQ4MqoXqzGM",
  authDomain: "calendar-app-7087e.firebaseapp.com",
  projectId: "calendar-app-7087e",
  storageBucket: "calendar-app-7087e.appspot.com",
  messagingSenderId: "719382295349",
  appId: "1:719382295349:web:1aaae8fbebea0c064bd27c",
  measurementId: "G-JX21MCT6FR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
