<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">SignUp</router-link>
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
}
</script>



<style lang="scss">
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