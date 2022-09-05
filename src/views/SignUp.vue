<template>
    <div>
      <h1>Sign Up</h1>
      <form @submit.prevent="SignUp">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="submit" value="SignUp">
      <p>Have an account? <router-link to="/login">Login Here</router-link></p>
    </form>
    </div>
  </template>
  
  <script>
      import {ref} from 'vue';
    // import firebase from "firebase"
    // src='https://cdn.firebase.com/js/client/2.2.1/firebase.js';
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/firestore';

  export default {
    setup() {
        const email = ref("");
        const password = ref("");

        const SignUp = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(user => {
                    alert(user);
                })
                .catch(err => alert(err.message));
        }

        return {
            SignUp,
            email,
            password
        }
    }
  }
  </script>
  
  <style>
  
  </style>