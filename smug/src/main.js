import vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import * as firebase from 'firebase/app';

vue.prototype.$axios = axios;
vue.config.productionTip = false 


const firebaseConfig = {
    apiKey: "AIzaSyBfNtrggmhOCX3Z8Db-hZZmd5dvDqzUhSI",
    authDomain: "smug-b36fc.firebaseapp.com",
    projectId: "smug-b36fc",
    storageBucket: "smug-b36fc.appspot.com",
    messagingSenderId: "626641004276",
    appId: "1:626641004276:web:344dcf15a6b2216ec6e0a1",
    measurementId: "G-4D1CPFLCNZ"
  };
  
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

//   const analytics = getAnalytics(App);
//   import { getAnalytics } from "firebase/analytics";


createApp(App).use(store).use(router).mount('#app')

// new Vue({
//     router,
//     store,
//     render: h =>h(App)
// }).$mount('#app')
