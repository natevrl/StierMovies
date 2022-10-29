import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7W9stI3s_pcmuObmAyne5_fBuhNmyqX8",
    authDomain: "movie-app-react-62356.firebaseapp.com",
    projectId: "movie-app-react-62356",
    storageBucket: "movie-app-react-62356.appspot.com",
    messagingSenderId: "98044995917",
    appId: "1:98044995917:web:8308acf532b02c544e2f04"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };