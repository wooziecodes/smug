<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="Login">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="submit" value="Login">
      <p>Don't have an account? <router-link to="/signup">Register Here</router-link></p>
    </form>
    </div>
  </template>
  
  
  <script>
  // import firebase from "firebase";
  // src='https://cdn.firebase.com/js/client/2.2.1/firebase.js';
  import {ref} from 'vue';
//   import * as firebase from "firebase";
// v9 compat packages are API compatible with v8 code
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/firestore';
  
  export default {
      setup() {
          const email = ref("");
          const password = ref("");
  
          const Login = () => {
          firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value)
              // console.log(data)
              .then(data => this.$router.push('/views/'))
              // .catch(err => alert(err.message));
          }
          return {
              Login,
              email,
              password
          }
      }
  };
  </script>
  
  <style>
  
  </style>