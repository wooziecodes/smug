<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">SignUp</router-link>
    <router-link to="/landing">Landing</router-link>
  </nav>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue';
// import { firebase } from 'firebase';
// import * as firebase from "firebase/app"
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import TheNavbar from './views/TheNavbar'
import Landing from './views/Landing'
import 'animate.css';
import 'aos/dist/aos.css'
import wow from 'wowjs';



// import TheBrands from './components/TheBrands'
// import TheFeatures from './components/TheFeatures'
// import TheAbout from './components/TheAbout'
// import TheFacts from './components/TheFacts'
// import TheTestimonials from './components/TheTestimonials'
// import ThePosts from './components/ThePosts'
// import TheFooter from './components/TheFooter'
// import BackToTopButton from './components/BackToTopButton'

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

export default{
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
          router.replace('/login');
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace('/');
        }
      });
    });
  },
  components:{

  }
}
</script>



<style>
body {
  background: #2c3e50;
  color: #FFF;
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
a {
  color: inherit;

}
</style>