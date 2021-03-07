import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBw2IS1z7tTCFhixckwzQSSLYXSiXtrHRE",
    authDomain: "rentacar-renting.firebaseapp.com",
    projectId: "rentacar-renting",
    storageBucket: "rentacar-renting.appspot.com",
    messagingSenderId: "331620922297",
    appId: "1:331620922297:web:4d0bf18cc070330b56fc68"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();

export { storage, db, auth, firebase }