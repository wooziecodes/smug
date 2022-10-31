import { Vue, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
// import { initializeApp } from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AOS from 'aos';
import 'aos/dist/aos.css'
import 'animate.css';
import wow from 'wowjs';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue3Transitions from 'vue3-transitions'
import VueKinesis from "vue-kinesis";
import { Icon } from '@iconify/vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { faStar, faHeart, faCommentDots, faBookmark, faFilter, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

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
library.add(faStar, faHeart, faCommentDots, faBookmark, faFilter, faChevronUp, faChevronDown)
// const analytics = getAnalytics(app);




createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).use(VueKinesis).use(autoAnimatePlugin).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

