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
import { useRouter, useRoute } from 'vue-router'

export default{
  // setup() {
  //   const router = useRouter();
  //   const route = useRoute();

  //   onBeforeMount(() => {
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if(!user) {
  //         router.replace('/login');
  //       } else if (route.path == "/login" || route.path == "/register") {
  //         router.replace('/');
  //       }
  //     });
  //   });
  // },
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