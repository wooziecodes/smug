<template>
    <div>
      <h1>Sign Up</h1>
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <button @click="signup">Sign Up</button>
  
    </div>
  </template>
  
  <script>
    // import firebase from "firebase"
    // src='https://cdn.firebase.com/js/client/2.2.1/firebase.js';

  export default {
      name: "SignUp",
      data() {
          return {
              email: "",
              password: "",
              initials: "",
          }
      },
      methods: {
          signup() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    console.log(user)
                },
                (err) => {
                    alert(err)
                }
            )
          }
      }
  }
  </script>
  
  <style>
  
  </style>