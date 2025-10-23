// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBn0JspkkCRqbp1kxK3QAIerybBuR299ss",
    authDomain: "zenlook-ba8d9.firebaseapp.com",
    projectId: "zenlook-ba8d9",
    storageBucket: "zenlook-ba8d9.firebasestorage.app",
    messagingSenderId: "708322548391",
    appId: "1:708322548391:web:569f4c122828751c43d982",
    measurementId: "G-HTR7FDXMH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);