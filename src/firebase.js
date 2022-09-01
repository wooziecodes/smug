import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBfNtrggmhOCX3Z8Db-hZZmd5dvDqzUhSI",
    authDomain: "smug-b36fc.firebaseapp.com",
    projectId: "smug-b36fc",
    storageBucket: "smug-b36fc.appspot.com",
    messagingSenderId: "626641004276",
    appId: "1:626641004276:web:1c03ac6a7a57d269c6e0a1",
    measurementId: "G-0E3G33YKD6"
  };

  export default firebase.initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);