import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
// import { initializeApp } from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

// import { getAnalytics } from "firebase/analytics";

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
  
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
createApp(App).use(store).use(router).mount('#app')

