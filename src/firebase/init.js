import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage"
import { onUnmounted, computed } from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyCIs-jCOTCgMspvCH3C3EKd_rszakumjyY",
    authDomain: "smug-6af00.firebaseapp.com",
    databaseURL: "https://smug-6af00-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smug-6af00",
    storageBucket: "smug-6af00.appspot.com",
    messagingSenderId: "528889510749",
    appId: "1:528889510749:web:f69e557a590d0f9add06b4",
    measurementId: "G-EWRYTVZDC5"
};

initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

export { db, storage, auth }
