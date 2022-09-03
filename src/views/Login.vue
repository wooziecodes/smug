<template>
  <div>
    <h1>Login</h1>
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button @click="login">Login</button>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>

  </div>
</template>


<script>
// import firebase from "firebase";
// src='https://cdn.firebase.com/js/client/2.2.1/firebase.js';
import {ref} from 'vue';
import * as firebase from "firebase/app";

export default {
    setup() {
        const email = ref("");
        const password = ref("");

        const Login = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(data => console.log(data))
            .catch(err => alert(err.message));
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