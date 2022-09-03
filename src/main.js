import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBfNtrggmhOCX3Z8Db-hZZmd5dvDqzUhSI",
  authDomain: "smug-b36fc.firebaseapp.com",
  projectId: "smug-b36fc",
  storageBucket: "smug-b36fc.appspot.com",
  messagingSenderId: "626641004276",
  appId: "1:626641004276:web:344dcf15a6b2216ec6e0a1",
  measurementId: "G-4D1CPFLCNZ"
};

firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
createApp(App).use(store).use(router).mount('#app')